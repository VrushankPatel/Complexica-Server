import numpy as np
import cv2
import os
import os.path
from google_drive_downloader import GoogleDriveDownloader as gdd
import time

prototxt = r'model/layers.prototxt'
model = r'model/colorizer_model.caffemodel'
points = r'model/pts_in_hull.npy'
imgCounter = 0
points = os.path.join(os.path.dirname(__file__), points)
prototxt = os.path.join(os.path.dirname(__file__), prototxt)
model = os.path.join(os.path.dirname(__file__), model)

imgPath = os.path.join(os.path.dirname(__file__), r'imgs/')

if not os.path.isfile(model):
    print("Caffe model not found, downloading it from drive..")
    gdd.download_file_from_google_drive(
        file_id="1Vhv1iuV8QiSBs1OgCxlC9hFfej-QwwOW", dest_path="complexica/model/colorizer_model.caffemodel")

print("Model Downloaded, executing program now............")

net = cv2.dnn.readNetFromCaffe(prototxt, model)
pts = np.load(points)

class8 = net.getLayerId("class8_ab")
conv8 = net.getLayerId("conv8_313_rh")
pts = pts.transpose().reshape(2, 313, 1, 1)
net.getLayer(class8).blobs = [pts.astype("float32")]
net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype="float32")]


def colorize_image(image, extension):
    image = check_and_resize_image(image)

    scaled = image.astype("float32") / 255.0
    lab = cv2.cvtColor(scaled, cv2.COLOR_BGR2LAB)

    resized = cv2.resize(lab, (224, 224))
    L = cv2.split(resized)[0]
    L -= 50

    # print("[INFO] colorizing image...")
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
    # fileName = str(int(time.time())) + f".{extension}"
    fileName = getImgName() + f".{extension}"
    cv2.imwrite(fileName, colorized)
    return fileName


def convert_to_grayscale(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray_3_channels = np.zeros_like(frame)
    gray_3_channels[:, :, 0] = gray
    gray_3_channels[:, :, 1] = gray
    gray_3_channels[:, :, 2] = gray
    return gray_3_channels

# if image is too large, we'll reduce the size to medium


def check_and_resize_image(image: np.ndarray):
    height, width, channels = image.shape
    if width > 900:
        height = int((height*900)/width)
        width = 900
        image = cv2.resize(
            image, (width, height), interpolation=cv2.INTER_CUBIC)
        return image
    return image

# only 5 images will be stored in storage, then it'll start overwriting them


def getImgName():
    global imgCounter
    if imgCounter == 4:
        imgCounter = 0
        return str(imgCounter)
    imgCounter += 1
    return str(imgCounter)
