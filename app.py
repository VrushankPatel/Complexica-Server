from flask import Flask, request, jsonify
from flask_cors import CORS
from src.Complexica import colorize_image

app = Flask(__name__)

CORS(app)

cors = CORS(app, resources={r"/complexica/*": {"origins": "*"}})


@app.route("/api/healthcheck", methods=["GET", 'POST'])
def health_check():
    return jsonify({"message": "Server is up and running"}), 200


@app.route("/api/upload_image", methods=['POST'])
def uploadImage():
    image = request.files['image']
    colorized_image = colorize_image(image)    
    return jsonify(colorized_image)


if __name__ == "__main__":
    app.run(debug=True)
