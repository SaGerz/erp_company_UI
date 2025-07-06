import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Navbar from './Components/Navbar/Nabar'
import Dashboard from './Pages/Dashboard'
import TaskManagement from './Pages/TaskManagement'
import WorkingHistory from './Pages/WorkingHistory'
import Absensi from './Pages/Absensi'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar/>
        <div className="flex flex-col flex-1 min-h-screen ">
          <Navbar />
          <main className="ml-64 mt-16 p-6 bg-gray-50 flex-1">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/Absensi' element={<Absensi />} />
              <Route path='/Task-Management' element={<TaskManagement />} />
              <Route path='/Working-History' element={<WorkingHistory />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App;
