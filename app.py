from flask import Flask, send_file, request, Response, jsonify, make_response
from flask_cors import CORS
from PIL import Image
from src.Complexica import colorize_image, imgPath
from multiprocessing import Process, Value
import time
import numpy
import base64
import requests
from datetime import datetime

url1 = "https://complexica.herokuapp.com/healthcheck"
url2 = "https://complexica2.herokuapp.com/healthcheck"
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
    colorized_file_name = colorize_image(image)
    return colorized_file_name


def record_loop():
    day = int(time.gmtime().tm_mday)
    while True:
        print(day)
        if day < 16:
            requests.get(url1)
            print("Sent request to URL")
        else:
            requests.get(url2)
            print("Sent request to URL2")
        time.sleep(30)


if __name__ == "__main__":
    p = Process(target=record_loop)
    p.start()
    app.run(debug=True)
    p.join()
