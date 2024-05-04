import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.serviceName),
        datasets: [{
            label: 'Number of Orders',
            data: data.map(item => item.orderCount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    };

    return <Doughnut style={{ maxHeight: "300px", maxWidth: "300px" }} data={chartData} />;
}

export default PieChart;