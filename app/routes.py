from flask import jsonify, request
from app import app, db
from app.models import Inventory, Store, Order, Shipment
from app import routes, models, auth


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

@app.route('/inventory', methods=['GET'])
def get_inventory():
    inventory = Inventory.query.all()
    return jsonify([{
        'item_id': item.item_id,
        'store_id': item.store_id,
        'item_name': item.item_name,
        'quantity': item.quantity
    } for item in inventory])


# Update: Modify an existing inventory item
@app.route('/inventory/<int:item_id>', methods=['PUT'])
def update_inventory(item_id):
    data = request.get_json()
    item = Inventory.query.get_or_404(item_id)
    item.item_name = data.get('item_name', item.item_name)
    item.quantity = data.get('quantity', item.quantity)
    db.session.commit()
    return jsonify({'message': 'Item updated successfully!'})

# Delete: Remove an inventory item
@app.route('/inventory/<int:item_id>', methods=['DELETE'])
def delete_inventory(item_id):
    item = Inventory.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted successfully!'})

# Create: Place a new order for inventory
@app.route('/order', methods=['POST'])
def place_order():
    data = request.get_json()
    new_order = Order(
        item_id=data['item_id'],
        store_id=data['store_id'],
        quantity_ordered=data['quantity_ordered'],
        status='Pending'
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order placed successfully!'}), 201

# Read: Fetch order details
@app.route('/order/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify({
        'order_id': order.order_id,
        'item_id': order.item_id,
        'store_id': order.store_id,
        'quantity_ordered': order.quantity_ordered,
        'order_date': order.order_date,
        'status': order.status
    })

# Create: Add a new shipment
@app.route('/shipment', methods=['POST'])
def add_shipment():
    data = request.get_json()
    new_shipment = Shipment(
        item_id=data['item_id'],
        store_id=data['store_id'],
        quantity_shipped=data['quantity_shipped'],
        expected_arrival=data['expected_arrival'],
        status='In Transit'
    )
    db.session.add(new_shipment)
    db.session.commit()
    return jsonify({'message': 'Shipment added successfully!'}), 201

# Read: Fetch shipment details
@app.route('/shipment/<int:shipment_id>', methods=['GET'])
def get_shipment(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    return jsonify({
        'shipment_id': shipment.shipment_id,
        'item_id': shipment.item_id,
        'store_id': shipment.store_id,
        'quantity_shipped': shipment.quantity_shipped,
        'expected_arrival': shipment.expected_arrival,
        'status': shipment.status
    })

@app.route('/inventory/low-stock', methods=['GET'])
def check_low_stock():
    threshold = request.args.get('threshold', default=10, type=int)
    low_stock_items = Inventory.query.filter(Inventory.quantity < threshold).all()
    return jsonify([{
        'item_id': item.item_id,
        'store_id': item.store_id,
        'item_name': item.item_name,
        'quantity': item.quantity
    } for item in low_stock_items])