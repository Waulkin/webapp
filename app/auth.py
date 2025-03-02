from flask_dance.contrib.google import make_google_blueprint
from flask_login import LoginManager, UserMixin, login_user
from app import app, db

google_blueprint = make_google_blueprint(
    client_id='your-client-id',
    client_secret='your-client-secret',
    redirect_to='auth.google_login'
)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/auth/google')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get('/oauth2/v2/userinfo')
    user_info = resp.json()
    user = User.query.filter_by(email=user_info['email']).first()
    if not user:
        user = User(email=user_info['email'], role='user')
        db.session.add(user)
        db.session.commit()
    login_user(user)
    return redirect(url_for('home'))