import React from 'react'
import './Dashboard.css'
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';


const Dashboard = () => {
  ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    BarElement,
    Title, Tooltip, Legend, TimeScale);

  const bardata = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
    datasets: [
      {
        label: 'Employee Count',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#36A2EB',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const baroptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Employee Count',
        },
        min: 0,
        max: 25,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Project Names',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Employee Count',
      },
    },
  };

  const piedata = {
    labels: ['Projects In Progress', 'Projects Completed'],
    datasets: [
      {
        data: [300, 500],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const pieoptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const stackeddata = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tasks in Progress',
        data: [8, 7, 2, 3, 6],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const stackedoptions = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Number of Tasks',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Project Names',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Tasks: Completed vs In Progress',
      },
    },
  };






  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31);

  const tldata = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
    datasets: [
      {
        label: 'Project Timeline',
        data: [
          [new Date(currentYear, 1, 1), new Date(currentYear, 5, 15)],
          [new Date(currentYear, 2, 15), new Date(currentYear, 8, 30)],
          [new Date(currentYear, 4, 16), new Date(currentYear, 11, 31)],
          [new Date(currentYear, 4, 1), new Date(currentYear, 7, 31)],
          [new Date(currentYear, 6, 15), new Date(currentYear, 10, 15)],
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const tloptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM',
          },
        },
        min: startOfYear,
        max: endOfYear,
        title: {
          display: true,
          text: `Timeline (${currentYear})`,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Projects',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const startDate = context.raw[0].toLocaleDateString();
            const endDate = context.raw[1].toLocaleDateString();
            return `${context.dataset.label}: ${startDate} - ${endDate}`;
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Project Timelines',
      },
    },
  };
  return (
    <div className="maincon">
      <div className="dashboard-topcon">
        <p className="heading">Dashboard</p>

      </div>

      <div className=" mb-5 chart">
        <Pie className='chart' data={piedata} options={pieoptions} />
      </div>

      <div className=" chart">
        <Bar className='chart' data={bardata} options={baroptions} />
      </div>

      <div className="chart">
      <Bar className='chart' data={stackeddata} options={stackedoptions} />
    </div>

    <div className="chart">
      <Bar className="chart"  data={tldata} options={tloptions} />
    </div>
    </div>
  )
}

export default Dashboard