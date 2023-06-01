import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLogin from './pages/UserLogin/UserLogin.jsx'
import LibraryLogin from './pages/LibraryManagementLogin/LibraryManagement.jsx';
import LibraryDashboard from './pages/LibraryDashboard/LibraryDashboard.jsx';
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx';
import './App.css'

const App = () => 
{

  const router = createBrowserRouter([{
    path: '/',
    element: <UserLogin />,
  },

  {
    path: '/library',
    element: <LibraryLogin />,
  },

  {
    path: '/library/dashboard',
    element: <LibraryDashboard />,
  },

  {
    path: '/user/dashboard',
    element: <UserDashboard />,
  }
])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
