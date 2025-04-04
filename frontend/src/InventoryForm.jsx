import React, { useState } from "react";

const InventoryForm = ({ existingItem = {}, updateCallback }) => {
    const [item_name, setName] = useState(existingItem.item_name || "");
    const [quantity, setQuantity] = useState(existingItem.quantity || "");

    const updating = Object.entries(existingItem).length !== 0;

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            item_name,
            quantity: parseInt(quantity, 10) // Ensure quantity is a number
        };

        const url = "https://webapp-ldfa.onrender.com/" + (updating ? `update_inventory/${existingItem.item_id}` : "create_inventory")

        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);

        if (response.status !== 201 && response.status !== 200) {
            const responseData = await response.json();
            alert(responseData.message);
        } else {
            updateCallback(); // This will trigger the parent component to re-fetch or update the data
            setName(""); // Clear the item name input
            setQuantity(""); // Clear the quantity input
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="item_name">Item Name:</label>
                <input
                    type="text"
                    id="item_name"
                    value={item_name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"} Item</button>
        </form>
    );
};

export default InventoryForm;