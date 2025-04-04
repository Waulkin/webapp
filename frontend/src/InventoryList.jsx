import React from "react";


const InventoryList = ({inventory, updateInventory, updateCallback}) => {
    const onDelete = async (item_id) => {
        try{
            const options = {
                method: "DELETE"
            }
        const response = await fetch(`https://webapp-ldfa.onrender.com/delete_inventory/${item_id}`, options);
        if(response.status === 200) {
            updateCallback(); // Refresh the inventory list after deletion
        }else {
            console.error("Failed to delete item");
            alert("Failed to delete item. Please try again.");
        }
    
    } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting the item. Please try again.");
    }

    
}
return (
    <div>
        <h2>Inventory</h2>
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item) => (
                    <tr key={item.item_id}>
                        <td>{item.item_name}</td>
                        <td>{item.quantity}</td>
                        <td>
                            <button onClick={() => updateInventory(item)}>Update</button>
                            <button onClick={() => onDelete(item.item_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};
export default InventoryList;