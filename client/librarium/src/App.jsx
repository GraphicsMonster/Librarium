import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLogin from './pages/UserLogin/UserLogin.jsx'
import LibraryLogin from './pages/LibraryManagementLogin/LibraryManagement.jsx';
import AllLibraries from './pages/AllLibraries/AllLibraries.jsx';
import AddBook from './pages/AddBook/AddBook.jsx'
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
      path: '/library/all',
      element: <AllLibraries />,
  },

  {
    path: '/library/:id/addbook',
    element: <AddBook />,
  },

  {
    path: '/library/:id/dashboard',
    element: <LibraryDashboard />,
  },

  {
    path: '/library/:lib_Id/user/:user_Id/dashboard',
    element: <UserDashboard />,
  },

  {
    path: '/library/registration',
    element: <LibraryRegistration />,
  },

  {
    path: 'library/:id/user/registration',
    element: <UserRegistration />,
  }
  
])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
