
from flask import request, jsonify, send_from_directory
from config import app, db
from models import User, Inventory
from flask_cors import cross_origin


@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users})


@app.route("/create_user", methods=["POST"])
def create_user():
    role = request.json.get("role")
    email = request.json.get("email")

    if not role or not email:
        return (
            jsonify({"message": "You must include a role and email"}),
            400,
        )

    new_user = User(role=role, email=email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201


@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    user.role = data.get("role", user.role)
    user.email = data.get("email", user.email)

    db.session.commit()

    return jsonify({"message": "Usr updated."}), 200


@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

@app.route("/inventory", methods=["GET"])
def get_inventory():
    # Fetch all inventory items
    inventory_items = Inventory.query.all()
    json_inventory = [item.to_json() for item in inventory_items]
    return jsonify({"inventory": json_inventory})


@app.route("/create_inventory", methods=["POST"])
def create_inventory():
    # Create a new inventory item
    name = request.json.get("item_name")
    quantity = request.json.get("quantity")

    if not name: 
        return jsonify({"message": "Name is required"}), 400
    if quantity is None:
        return jsonify({"message": "Quantity is required"}), 400

    new_item = Inventory(name=name, quantity=quantity)
    try:
        db.session.add(new_item)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Inventory item created!"}), 201


@app.route("/update_inventory/<int:item_id>", methods=["PATCH"])
def update_inventory(item_id):
    # Update an existing inventory item
    item = Inventory.query.get(item_id)

    if not item:
        return jsonify({"message": "Item not found"}), 404

    data = request.json
    item.item_name = data.get("item_name", item.item_name)
    item.quantity = data.get("quantity", item.quantity)

    db.session.commit()

    return jsonify({"message": "Inventory item updated."}), 200


@app.route("/delete_inventory/<int:item_id>", methods=["DELETE"])
def delete_inventory(item_id):
    # Delete an inventory item
    item = Inventory.query.get(item_id)

    if not item:
        return jsonify({"message": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Inventory item deleted!"}), 200

@app.route('/')
@cross_origin()
def serve(): 
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()

    app.run()