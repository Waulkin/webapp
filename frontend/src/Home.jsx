import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
const Home = () => {
    const navigate = useNavigate()
    function handleLogout() {
    googleLogout()
    navigate("/")
    }
     const [inventoryData, setInventoryData] = useState([]); 
      const [chartInstance, setChartInstance] = useState(null); 
    const fetchInventory = async () => {
        try {
          const response = await fetch("https://webapp-ldfa.onrender.com/inventory");
          const data = await response.json();
          setInventoryData(data.inventory); 
        } catch (error) {
          console.error("Error fetching inventory data:", error);
        }
      };
    
      
      useEffect(() => {
    if (chartInstance) {
          
          chartInstance.destroy();
        }
        
    
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
    
        script.onload = () => {
          
          const ctx = document.getElementById('myChart');
          if (ctx) {
            const newChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: inventoryData.map(item => item.item_name), 
                datasets: [{
                  label: 'Inventory Quantity',
                  data: inventoryData.map(item => item.quantity), 
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
        }, [inventoryData]; 
        document.body.appendChild(script);
    
        
        return () => {
          document.body.removeChild(script);
        };
      }, [inventoryData]); 
      
      useEffect(() => {
        fetchInventory();
      }, []);
    return (
        <div>
        <h1>Store 027</h1>
        <p>Current Inventory:</p>
        <canvas id="myChart" width="145" height="35"></canvas>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={handleLogout}>Logout</button>
        </div>   
    );
    }
    export default Home;