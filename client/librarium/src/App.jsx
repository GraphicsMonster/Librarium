import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLogin from './pages/UserLogin/UserLogin.jsx'
import LibraryLogin from './pages/LibraryManagementLogin/LibraryManagement.jsx';
import LibraryDashboard from './pages/LibraryDashboard/LibraryDashboard.jsx';
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx';
import UserRegistration from './pages/UserRegistration/UserRegistration.jsx';
import LibraryRegistration from './pages/LibraryRegistration/LibraryRegistration.jsx';
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
  },

  {
    path: '/library/registration',
    element: <LibraryRegistration />,
  },

  {
    path: 'user/registration',
    element: <UserRegistration />,
  }
  
])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
