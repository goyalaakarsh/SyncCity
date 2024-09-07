import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';


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


  const [doughdata, setData] = useState({ inProgress: 0, completed: 0 });

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/dashboard/project-stats');
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              console.log(response);
              const data = await response.json(); 
              console.log(data);
              setData({
                  inProgress: data.inProgress,
                  completed: data.completed
              });
          } catch (error) {
              console.error('Error fetching project stats:', error);
          }
      };

      fetchData();
  }, []);

  const doughnutData = {
      labels: ['Projects In Progress', 'Projects Completed'],
      datasets: [
          {
              data: [doughdata.inProgress, doughdata.completed],
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB'],
          },
      ],
  };

  const doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              position: 'right',
          },
          tooltip: {
              callbacks: {
                  label: function(context) {
                      let label = context.label || '';

                      if (context.parsed !== null) {
                          label += `: ${context.parsed}`;
                      }

                      return label;
                  }
              }
          }
      }
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


//Timeline

const [timelineData, setTimelineData] = useState([]);

useEffect(() => {
    const fetchTimelineData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/dashboard/project-timeline');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setTimelineData(data);
        } catch (error) {
            console.error('Error fetching project timeline:', error);
        }
    };

    fetchTimelineData();
}, []);



  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31);

  const tldata = {
    labels: timelineData.map(project => project.name),
        datasets: [
            {
                label: 'Project Timeline',
                data: timelineData.map(project => [
                    new Date(project.startDate),
                    new Date(project.endDate)
                ]),
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

     <div className="charts">
     <div className=" mb-5 chart">
      <Doughnut className='chart' data={doughnutData} options={doughnutOptions} />
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
    </div>
  )
}

export default Dashboard