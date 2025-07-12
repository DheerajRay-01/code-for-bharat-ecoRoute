import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ScatterChart,
  Scatter
} from 'recharts'
import axiosInstance from '../utils/axios'

function CO2_Analytic() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#A28BD4', '#FF6384', '#36A2EB', '#FFCE56',
    '#4BC0C0', '#9966FF'
  ]

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get("/trip/fetch-trips")
        const data = res?.data?.data?.data || []
        setTrips(data)
      } catch (err) {
        console.error("Error fetching trips:", err)
        setError("Failed to fetch trips. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchTrips()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-300 animate-pulse">Loading trips...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    )
  }

  if (!trips || trips.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-300">No trip data available.</h1>
      </div>
    )
  }

  // Stats Calculation
  let total_distance = 0
  let total_carbon = 0
  const total_trips = trips.length

  trips.forEach(item => {
    const carbon = isNaN(item.carbonData) ? 0 : item.carbonData
    const distanceValue = Number(item.distance?.replace(/ km|km/, '').trim())
    const distance = isNaN(distanceValue) ? 0 : distanceValue

    total_carbon += carbon
    total_distance += distance
  })

  const average_carbon = total_trips > 0 ? total_carbon / total_trips : 0

  // Chart Data
  let cumulativeCarbon = 0
  const lineChartData = trips
    .filter(item => item.createdAt && !isNaN(item.carbonData))
    .map(item => {
      cumulativeCarbon += item.carbonData
      const shortDate = new Date(item.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
      return {
        date: shortDate,
        cumulativeCO2: cumulativeCarbon.toFixed(2)
      }
    })

  const barChartData = trips
    .filter(item => item.createdAt && !isNaN(item.carbonData))
    .map(item => {
      const shortDate = new Date(item.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
      return {
        date: shortDate,
        carbon: (item.carbonData || 0).toFixed(2)
      }
    })

  const top10Trips = [...trips]
    .filter(item => !isNaN(item.carbonData))
    .sort((a, b) => b.carbonData - a.carbonData)
    .slice(0, 10)

  const pieChartData = top10Trips.map(item => ({
    name: `${item.start?.split(',')[0] || 'Unknown'} → ${item.end?.split(',')[0] || 'Unknown'}`,
    value: Number(item.carbonData.toFixed(2))
  }))

  const scatterChartData = trips
    .filter(item => !isNaN(item.carbonData) && item.distance)
    .map(item => {
      const distanceValue = Number(item.distance?.replace(/ km|km/, '').trim())
      const distance = isNaN(distanceValue) ? 0 : distanceValue
      return {
        name: `${item.start?.split(',')[0] || 'Unknown'} → ${item.end?.split(',')[0] || 'Unknown'}`,
        distance,
        carbon: item.carbonData
      }
    })

  return (
     <div className="min-h-screen bg-base-200 dark:bg-gray-900 p-4 md:p-8">
    {/* Page Heading */}
    <div className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
        CO₂ Emissions Analysis
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Your trip data visualized with insights
      </p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center">
        <h3 className="text-gray-500 dark:text-gray-400">Total Carbon</h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          {total_carbon.toFixed(2)} kg CO₂
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center">
        <h3 className="text-gray-500 dark:text-gray-400">Total Distance</h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {total_distance.toFixed(2)} km
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center">
        <h3 className="text-gray-500 dark:text-gray-400">Average Carbon</h3>
        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
          {average_carbon.toFixed(2)} kg CO₂
        </p>
      </div>
    </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 dark:text-gray-200">Cumulative CO₂ Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="date" stroke="currentColor" />
              <YAxis unit=" kg" stroke="currentColor" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Line type="monotone" dataKey="cumulativeCO2" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 dark:text-gray-200">Per Trip CO₂ (by Date)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="date" stroke="currentColor" />
              <YAxis unit=" kg" stroke="currentColor" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Bar dataKey="carbon" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 dark:text-gray-200">Top 10 Trips by CO₂</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  textAlign: "center"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 dark:text-gray-200">CO₂ vs Distance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeOpacity={0.2} />
              <XAxis type="number" dataKey="distance" name="Distance" unit=" km" stroke="currentColor" />
              <YAxis type="number" dataKey="carbon" name="CO₂" unit=" kg" stroke="currentColor" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Scatter name="Trips" data={scatterChartData} fill="#FF8042" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default CO2_Analytic