import React, { useEffect } from 'react';

function Inventory() {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.async = true; // Optional, depending on your script's needs
      script.onload = () => {
        // Create the chart once the script is loaded
        const ctx = document.getElementById('myChart');
  
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 30, 3, 5, 2, 3],
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
      };
  
      document.body.appendChild(script);
  
      // Cleanup function to remove the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }, []); // Empty dependency array ensures this runs only once after the initial render
  
    return (
      <div>
        <canvas id="myChart" width="600" height="150"></canvas>
      </div>
    );
  }
  
  export default Inventory;