# backend/app.py
from dotenv import load_dotenv
load_dotenv()                    # <-- ensure .env is loaded before anything else

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from db import query_team_stats, query_player_stats

app = Flask(__name__)
CORS(app)

@app.route("/api/teams")
def teams():
    args = {
        "view": request.args.get("view", "weekly"),
        "conference": request.args.get("conference"),
        "division": request.args.get("division"),
        "name": request.args.get("searchName"),
        "stat": request.args.get("stat"),
        "order": request.args.get("sortOrder", "asc")
    }
    return jsonify(query_team_stats(**args))

@app.route("/api/players")
def players():
    args = {
        "view": request.args.get("view", "weekly"),
        "position": request.args.get("position"),
        "conference": request.args.get("conference"),
        "division": request.args.get("division"),
        "name": request.args.get("searchName"),
        "stat": request.args.get("stat"),
        "order": request.args.get("sortOrder", "asc")
    }
    return jsonify(query_player_stats(**args))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
