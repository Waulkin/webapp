from config import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'user'  # Explicitly set the table name for clarity
    user_id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self):
        return {"user_id": self.user_id, "role": self.role, "email": self.email}
    

class Inventory(db.Model):
    __tablename__ = 'inventory'  # Explicitly set the table name for clarity
    __table_args__ = {'extend_existing': True}  # Allow table to be redefined if it already exists
    store_id = db.Column(db.Integer, nullable=False, default=1)  # Assuming store_id is the primary key for the inventory table
    item_id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    def to_json(self):
        return {"item_id": self.item_id, "item_name": self.item_name, "quantity": self.quantity}
