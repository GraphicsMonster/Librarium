import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

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
        console.log(responseJson)
        if (responseJson.length > 0) {
            setUsersExist(true)
            await fetchUsers()
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
        <div className='all-users'>
            <p>{users[0].name}</p>
        </div>
    )
}

export default AllUsers

