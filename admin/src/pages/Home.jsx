
import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const priceRanges = [
  { label: "₹0-₹999", min: 0, max: 999 },
  { label: "₹1000-₹1999", min: 1000, max: 1999 },
  { label: "₹2000-₹2999", min: 2000, max: 2999 },
  { label: "₹3000+", min: 3000, max: Infinity },
];

const Home = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const [orders, setOrders] = useState([]);
  const [stateData, setStateData] = useState({});
  const [countryData, setCountryData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [priceData, setPriceData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.post(
          `${serverUrl}/api/order/list`,
          {},
          { withCredentials: true }
        );
        setOrders(result.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [serverUrl]);

  useEffect(() => {
    // Orders by state
    const stateCount = {};
    const countryCount = {};
    orders.forEach((order) => {
      const state = order.address?.state || "Unknown";
      stateCount[state] = (stateCount[state] || 0) + 1;
      const country = order.address?.country || "Unknown";
      countryCount[country] = (countryCount[country] || 0) + 1;
    });

    // Orders by category (men, women, kids)
    const allItems = orders.flatMap((order) => order.items);
    const categoryCount = { Men: 0, Women: 0, Kids: 0 };
    allItems.forEach((item) => {
      if (item.category === "Men") categoryCount.Men += 1;
      else if (item.category === "Women") categoryCount.Women += 1;
      else if (item.category === "Kids") categoryCount.Kids += 1;
    });

    // Orders by price range
    const priceCount = {};
    priceRanges.forEach((range) => {
      priceCount[range.label] = 0;
    });
    allItems.forEach((item) => {
      for (let range of priceRanges) {
        if (item.price >= range.min && item.price <= range.max) {
          priceCount[range.label]++;
          break;
        }
      }
    });

    setStateData(stateCount);
    setCountryData(countryCount);
    setCategoryData(categoryCount);
    setPriceData(priceCount);
  }, [orders]);

  // Chart Data
  const barData = {
    labels: Object.keys(stateData),
    datasets: [
      {
        label: "Orders by State",
        data: Object.values(stateData),
        backgroundColor: [
          "#3b82f6", "#f59e42", "#10b981", "#ef4444", "#6366f1", "#f472b6", "#facc15", "#14b8a6"
        ],
        borderRadius: 4,
      },
    ],
  };
  const countryChartData = {
    labels: Object.keys(countryData),
    datasets: [
      {
        label: "Orders by Country",
        data: Object.values(countryData),
        backgroundColor: [
          "#6366f1", "#f59e42", "#10b981", "#ef4444", "#3b82f6", "#f472b6", "#facc15", "#14b8a6"
        ],
        borderRadius: 4,
      },
    ],
  };
  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Orders by Category",
        data: Object.values(categoryData),
        backgroundColor: [
          "#3b82f6", // Men
          "#ef4444", // Women
          "#10b981"  // Kids
        ],
        borderRadius: 4,
      }
    ]
  };
  const priceChartData = {
    labels: priceRanges.map(r => r.label),
    datasets: [
      {
        label: "Orders by Price Range",
        data: priceRanges.map(r => priceData[r.label]),
        backgroundColor: [
          "#f59e42", "#3b82f6", "#ef4444", "#10b981"
        ],
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
      <Sidebar />
      <main className="flex-1 pt-24 px-2 sm:pl-[300px]">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-500 text-center mb-8 sm:mb-10 tracking-wide drop-shadow-lg font-sans">
          Dashboard
        </h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div className="bg-gray-950 rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col items-center w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4 sm:mb-6 text-center">
              Orders by State
            </h2>
            <div className="w-full h-[250px] sm:h-[300px]">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { color: "#93c5fd" } },
                    y: { ticks: { color: "#93c5fd" } },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-gray-950 rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col items-center w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4 sm:mb-6 text-center">
              Orders by Country
            </h2>
            <div className="w-full h-[250px] sm:h-[300px] flex items-center justify-center">
              <Doughnut
                data={countryChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { labels: { color: "#93c5fd", font: { size: 14 } } },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-gray-950 rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col items-center w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4 sm:mb-6 text-center">
              Orders by Category
            </h2>
            <div className="w-full h-[250px] sm:h-[300px] flex items-center justify-center">
              <Doughnut
                data={categoryChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { labels: { color: "#93c5fd", font: { size: 14 } } },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-gray-950 rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col items-center w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4 sm:mb-6 text-center">
              Orders by Price Range
            </h2>
            <div className="w-full h-[250px] sm:h-[300px]">
              <Bar
                data={priceChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { color: "#93c5fd" } },
                    y: { ticks: { color: "#93c5fd" } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;