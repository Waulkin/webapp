from flask import jsonify, request
from app import app, db
from app.models import Inventory, Store
from app import routes, models, auth

@app.route('/inventory', methods=['GET'])
def get_inventory():
    inventory = Inventory.query.all()
    return jsonify([{
        'item_id': item.item_id,
        'store_id': item.store_id,
        'item_name': item.item_name,
        'quantity': item.quantity
    } for item in inventory])

@app.route('/inventory', methods=['POST'])
def add_inventory():
    data = request.get_json()
    new_item = Inventory(
        store_id=data['store_id'],
        item_name=data['item_name'],
        quantity=data['quantity']
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Item added successfully!'}), 201