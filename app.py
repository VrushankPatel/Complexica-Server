from flask import Flask, send_file, request, Response, jsonify
from PIL import Image
from complexica.Complexica import colorize_image, imgPath
import time
import numpy

app = Flask(__name__)


@app.route("/healthcheck", methods=["GET", 'POST'])
def health_check():
    return jsonify({"message": "Server is up and running"}), 200


@app.route("/complexica/upload_image", methods=['POST'])
def uploadImage():
    print(request.remote_addr)
    image = request.files['image']
    extension = image.filename.split(".")[-1]
    image = Image.open(image).convert('RGB')
    image = numpy.array(image)
    image = image[:, :, ::-1].copy()
    colorized_file_name = colorize_image(image, extension)
    return send_file(colorized_file_name, mimetype="image/gif")


if __name__ == "__main__":
    app.run(debug=True)
