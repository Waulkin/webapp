import React, { useEffect, useState } from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';


function Inventory() {
  const [inventoryData, setInventoryData] = useState([]); // State to hold inventory data
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [chartInstance, setChartInstance] = useState(null); // State to hold the Chart.js instance
  const [currentItem, setCurrentItem] = useState({}); // State to hold the current item being edited
  // Fetch inventory data from the backend
  const fetchInventory = async () => {
    try {
      const response = await fetch("https://webapp-ldfa.onrender.com/inventory");
      const data = await response.json();
      setInventoryData(data.inventory); // Assuming the response has an 'inventory' field
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  // Create or update the chart when inventoryData changes
  useEffect(() => {
if (chartInstance) {
      // If chartInstance exists, destroy it before creating a new one
      chartInstance.destroy();
    }
    

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;

    script.onload = () => {
      // Initialize the chart once the script is loaded
      const ctx = document.getElementById('myChart');
      if (ctx) {
        const newChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: inventoryData.map(item => item.item_name), // Item names
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
        setChartInstance(newChart);
      }
    }, [inventoryData]; // Re-run this effect whenever inventoryData changes

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [inventoryData]); // Re-run this effect whenever inventoryData changes

  // Load inventory data when the component mounts
  useEffect(() => {
    fetchInventory();
  }, []);



  const openEditModal = (item) => {
    if (isModalOpen) return
    setCurrentItem(item)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentItem({})
  }
  const onUpdate = () => {
    closeModal();
    fetchInventory(); // Refresh the inventory list after update
  }
  return (
    <div>
      <h2>Inventory Management</h2>
      <canvas id="myChart" width="145" height="35"></canvas>
      <p>Manage your inventory items below:</p>
      {/* Render the InventoryForm component to add or update inventory items */}
      <InventoryForm updateCallback={fetchInventory} /> {/* Use real callback to refresh the inventory list */}

      <h3>Current Inventory</h3>
     <InventoryList
        inventory={inventoryData} 
        updateInventory={openEditModal} // Pass the function to open the edit modal
      updateCallback={onUpdate}/>

      {/* Modal for editing inventory item */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <InventoryForm existingItem={currentItem} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;