import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './AllUsers.css'

const AllUsers = () => {
    const {id} = useParams()
    const [libraryExists, setLibraryExists] = useState(false)
    const [usersExist, setUsersExist] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {

    const checkLibraryExists = async() => {
        const response = await fetch(`http://localhost:3000/api/library/${id}`)
        if (response.ok) {
            setLibraryExists(true)
        }

    }
    const checkUsersExist = async () => {
        const response = await fetch(`http://localhost:3000/api/library/${id}/users`)
        const responseJson = await response.json()
        if (responseJson.length > 0) {
            setUsersExist(true);
            await fetchUsers();
        }
    }

    checkLibraryExists();
    checkUsersExist();

        }, 
    
    [libraryExists, usersExist, id]);

    const fetchUsers = async () => {

        const response = await fetch(`http://localhost:3000/api/library/${id}/users`)
        const responseJson = await response.json()
        const users = responseJson.map((user) => ({name: user.name, email: user.email, bookbalance: user.bookBalance, borrowedBooks: user.borrowedBooks}))
        setUsers(users)

    }
    
    if(!libraryExists) {
        return (
            <div className='no-library'>
                <h1>There is no library registered on the network with the id: {id}</h1>
            </div>
        )
    }

    if(!usersExist) {
        return (
            <div className='no-users'>
                <h1>There are no users registered on the network yet</h1>
            </div>
        )
    }

    return (
        <div className="all-users">
          <h1>All Users</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Book Balance</th>
                <th>Borrowed Books</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.bookbalance}</td>
                  <td>{user.borrowedBooks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='allusers-footer'>
            <p className='allusers-footer-text'>
              <Link to={`/library/${id}/dashboard`}>Back to Library</Link>
            </p>
          </div>
        </div>
      );
      
}

export default AllUsers

