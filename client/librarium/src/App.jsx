import { useState } from 'react'
import AddBook from './components/addBook/addBook.jsx'
import LoginForm from './pages/UserLogin/UserLogin.jsx'
import LibraryLogin from './pages/LibraryManagementLogin/LibraryManagement.jsx';
import LibraryDashboard from './pages/LibraryDashboard/LibraryDashboard.jsx';
import './App.css'

const App = () => 
{

  return (
    <>
      {/* <AddBook />
      <LoginForm />
      <LibraryLogin /> */}

      <LibraryDashboard />
    </>
  )
}

export default App
