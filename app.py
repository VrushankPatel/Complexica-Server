from flask import Flask, send_file, request, Response, jsonify, make_response
from flask_cors import CORS
from PIL import Image
from src.Complexica import colorize_image, imgPath
import time
import numpy
import base64

app = Flask(__name__)

CORS(app)

cors = CORS(app, resources={r"/complexica/*": {"origins": "*"}})


@app.route("/healthcheck", methods=["GET", 'POST'])
def health_check():
    return jsonify({"message": "Server is up and running"}), 200


@app.route("/complexica/upload_image", methods=['POST'])
def uploadImage():

    print(request.remote_addr)
    image = request.files['image']
    extension = image.filename.split(".")[-1]
    colorized_file_name = colorize_image(image, extension)
    response = make_response(
        send_file(colorized_file_name, mimetype="image/jpeg"))
    response.headers['Access-Control-Allow-Origin'] = '*'

    # with open(colorized_file_name, "rb") as image_file:
    #     encoded_image = base64.b64encode(image_file.read())
    # return encoded_image, 200
    # return send_file(colorized_file_name, mimetype="image/gif")
    return colorized_file_name


if __name__ == "__main__":
    app.run(debug=True)
