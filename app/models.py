from app import db

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)

class Store(db.Model):
    store_id = db.Column(db.Integer, primary_key=True)
    store_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)

class Inventory(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey('store.store_id'), nullable=False)
    item_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    last_updated = db.Column(db.DateTime, default=db.func.current_timestamp())

# Add more models for Orders and Shipments

class Order(db.Model):
    order_id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('inventory.item_id'), nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey('store.store_id'), nullable=False)
    quantity_ordered = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String(50), nullable=False, default='Pending')

class Shipment(db.Model):
    shipment_id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('inventory.item_id'), nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey('store.store_id'), nullable=False)
    quantity_shipped = db.Column(db.Integer, nullable=False)
    expected_arrival = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='In Transit')