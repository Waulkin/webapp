from config import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self):
        return {"user_id": self.user_id, "role": self.role, "email": self.email}
    
class Store(db.Model):
    store_id = db.Column(db.Integer, primary_key=True)
    store_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    def to_json(self):
        return {"store_id": self.store_id, "store_name": self.store_name, "location": self.location}

class Inventory(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey('store.store_id'), nullable=False)
    item_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    last_updated = db.Column(db.DateTime, default=db.func.current_timestamp())
    def to_json(self):
        return {"item_id": self.item_id, "store_id": self.store_id, "item_name": self.item_name, "quantity": self.quantity, "last_updated": self.last_updated}
