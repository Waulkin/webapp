
"""from flask_dance.contrib.google import make_google_blueprint, google
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from config import app, db
from models import User
import os
from flask import redirect, url_for, jsonify, request
from google.auth.transport import requests
from google.oauth2 import id_token


login_manager = LoginManager()
login_manager.init_app(app)

app.secret_key = os.getenv('FLASK_SECRET_KEY', os.urandom(24))

google_blueprint = make_google_blueprint(
    client_id='21437432952-sp1i8aon5a53reh7e92oh3a1qbb3vm1a.apps.googleusercontent.com',
    client_secret='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',
    redirect_to='google_login'
)
app.register_blueprint(google_blueprint, url_prefix='/google_login')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/auth/google', methods=['POST'])
def google_login():
    token = request.json.get('token')
    if not token:
        return jsonify({"message": "Missing token"}), 400
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), '21437432952-sp1i8aon5a53reh7e92oh3a1qbb3vm1a.apps.googleusercontent.com')
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        email = idinfo['email']
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(email=email, role='user')
            db.session.add(user)
            db.session.commit()
        login_user(user)
        return jsonify({"user":{ "id": user.id, "email": user.email, "role": user.role}})
    except ValueError as e:
        return jsonify({"error": f"Invalid token: {e}"}), 400
"""