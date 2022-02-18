import numpy as np
import cv2
import os
from google_drive_downloader import GoogleDriveDownloader as gdd
from PIL import Image
import base64
import datetime
import logging

prototxt = r'model/layers.prototxt'
model = r'src/model/colorizer_model.caffemodel'
points = r'model/pts_in_hull.npy'
imgCounter = 0
points = os.path.join(os.path.dirname(__file__), points)
prototxt = os.path.join(os.path.dirname(__file__), prototxt)

print(model);
imgPath = os.path.join(os.path.dirname(__file__), r'imgs/')

# if not os.path.isfile(model):
#     logging.warning(
#         "Caffe model not found, downloading it from available resource..")
#     gdd.download_file_from_google_drive(
#         file_id="1Vhv1iuV8QiSBs1OgCxlC9hFfej-QwwOW", dest_path="src/model/colorizer_model.caffemodel")
#     logging.info("Model Downloaded, Engaging reactor now............")
# else:
#     logging.info("Model is available, Engaging reactor now............")
import os
print("checkingdirs")
print(os.listdir("src/model"))

net = cv2.dnn.readNetFromCaffe(prototxt, model)
pts = np.load(points)

class8 = net.getLayerId("class8_ab")
conv8 = net.getLayerId("conv8_313_rh")
pts = pts.transpose().reshape(2, 313, 1, 1)
net.getLayer(class8).blobs = [pts.astype("float32")]
net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype="float32")]


def colorize_image(image):
    startTime = datetime.datetime.now()
    image = Image.open(image).convert('RGB')
    image = np.array(image)
    image = image[:, :, ::-1].copy()
    image = check_and_resize_image(image)

    scaled = image.astype("float32") / 255.0
    lab = cv2.cvtColor(scaled, cv2.COLOR_BGR2LAB)

    resized = cv2.resize(lab, (224, 224))
    L = cv2.split(resized)[0]
    L -= 50

    logging.info("[INFO] colorizing image...")
    net.setInput(cv2.dnn.blobFromImage(L))
    ab = net.forward()[0, :, :, :].transpose((1, 2, 0))

    ab = cv2.resize(ab, (image.shape[1], image.shape[0]))

    data = cv2.imencode('.png', image)[1].tobytes()

    image = convert_to_grayscale(image)

    L = cv2.split(lab)[0]
    colorized = np.concatenate((L[:, :, np.newaxis], ab), axis=2)

    colorized = cv2.cvtColor(colorized, cv2.COLOR_LAB2BGR)
    colorized = np.clip(colorized, 0, 1)

    colorized = (255 * colorized).astype("uint8")

    _, im_arr = cv2.imencode('.jpg', colorized)
    im_bytes = im_arr.tobytes()
    im_b64 = base64.b64encode(im_bytes)
    endTime = datetime.datetime.now()
    totalTimeTaken = endTime - startTime
    response = {
        "image": im_b64.decode(),
        "timeTaken": str(totalTimeTaken.seconds)
    }
    return response


def convert_to_grayscale(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray_3_channels = np.zeros_like(frame)
    gray_3_channels[:, :, 0] = gray
    gray_3_channels[:, :, 1] = gray
    gray_3_channels[:, :, 2] = gray
    return gray_3_channels


def check_and_resize_image(image: np.ndarray):
    height, width, channels = image.shape
    if width > 900:
        height = int((height*900)/width)
        width = 900
        image = cv2.resize(
            image, (width, height), interpolation=cv2.INTER_CUBIC)
        return image
    return image
