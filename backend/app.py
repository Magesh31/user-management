
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flask API is running!"
    })

@app.route("/api/users", methods=["GET"])
def get_users():
    users = [
        {"id": 1, "name": "Magesh"},
        {"id": 2, "name": "John"},
        {"id": 3, "name": "David"}
    ]
    return jsonify(users)

@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()

    if not data or not data.get("name"):
        return jsonify({"error": "Name is required"}), 400

    user = {
        "id": 4,
        "name": data["name"]
    }

    return jsonify(user), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)
