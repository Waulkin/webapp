import React, { useEffect, useState } from 'react';
import InventoryForm from './InventoryForm';


function Inventory() {
  const [inventoryData, setInventoryData] = useState([]); // State to hold inventory data

  // Fetch inventory data from the backend
  const fetchInventory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/inventory");
      const data = await response.json();
      setInventoryData(data.inventory); // Assuming the response has an 'inventory' field
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  // Create or update the chart when inventoryData changes
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;

    script.onload = () => {
      // Initialize the chart once the script is loaded
      const ctx = document.getElementById('myChart');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: inventoryData.map(item => item.name), // Item names
            datasets: [{
              label: 'Inventory Quantity',
              data: inventoryData.map(item => item.quantity), // Item quantities
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [inventoryData]); // Re-run this effect whenever inventoryData changes

  // Handle editing or updating inventory items
  const handleUpdate = (item) => {
    // Example: You can navigate to an edit page or open a form to update the inventory item
    console.log("Edit item", item);
  };

  // Load inventory data when the component mounts
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Inventory Management</h2>
      <canvas id="myChart" width="600" height="400"></canvas>
      <p>Manage your inventory items below:</p>
      {/* Render the InventoryForm component to add or update inventory items */}
      <InventoryForm updateCallback={fetchInventory} /> {/* Use real callback to refresh the inventory list */}

      <h3>Current Inventory</h3>
      <ul>
        {inventoryData.map(item => (
          <li key={item.item_id}>
            {item.name}: {item.quantity}
            <button onClick={() => handleUpdate(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;