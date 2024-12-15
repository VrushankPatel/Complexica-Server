from flask import Flask, request, jsonify, send_from_directory, redirect, url_for
from flask_cors import CORS
import os
from src.Complexica import colorize_image

app = Flask(__name__, static_folder="web", static_url_path="/")
CORS(app)

cors = CORS(app, resources={r"/complexica/*": {"origins": "*"}})

@app.route("/api/healthcheck", methods=['GET'])
def health_check():
    return jsonify({"message": "Server is up and running"}), 200

@app.route("/api/upload_image", methods=['POST'])
def upload_image():
    image = request.files['image']
    colorized_image = colorize_image(image)    
    return jsonify(colorized_image)

@app.route("/", methods=["GET"])
def redirect_to_ui():
    return redirect(url_for('serve_react', path=""))

@app.route("/ui/<path:path>")
@app.route("/ui", defaults={"path": ""}) 
@app.route("/ui/", defaults={"path": ""})
def serve_react(path):

    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)

    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9090, debug=True)
