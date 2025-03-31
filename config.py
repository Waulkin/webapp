from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory

app = Flask(__name__, static_folder='frontend\dist', static_url_path='')
CORS(app)

@app.after_request
@cross_origin()
def set_header(response):
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    return response
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
@app.route('/')
@cross_origin()
def serve(): 
    return send_from_directory(app.static_folder, 'index.html')
db = SQLAlchemy(app)
