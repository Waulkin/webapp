{/*import React, { useState, useEffect } from "react";
import InventoryForm from "./InventoryForm";

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        const response = await fetch("https://webapp-ldfa.onrender.com/inventory");
        const data = await response.json();
        setInventory(data);
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleUpdate = () => {
        fetchInventory(); // Re-fetch the inventory list after an item is added or updated
    };

    return (
        <div>
            <h2>Inventory List</h2>
            <InventoryForm updateCallback={handleUpdate} />
            <ul>
                {inventory.map((item) => (
                    <li key={item.item_id}>
                        {item.name}: {item.quantity}
                        <button onClick={() => handleUpdate(item)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;*/}