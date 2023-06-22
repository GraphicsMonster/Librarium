import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const AllUsers = () => {
    const {id} = useParams()
    const [usersExist, setUsersExist] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {

    const checkUsersExist = async () => {
        const response = await fetch(`http://localhost:3000/library/${id}/users`)
        const responseJson = response.json()
        if (responseJson.length > 0) {
            setUsersExist(true)
            await fetchUsers()
        }
    }

    checkUsersExist();

        }, 
    
    []);

    const fetchUsers = async () => {

        const response = await fetch(`http://localhost:3000/library/${id}/users`)
        const responseJson = await response.json()
        const request = []
        for (let i = 0; i < responseJson.length; i++) {
            request.push(fetch(`http://localhost:3000/library/${id}/user/${i+1}`))
        }

        const responses = await Promise.all(request)
        const details = await Promise.all(responses.map((response) => response.json()))
        setUsers(details)

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
            <p>{users}</p>
        </div>
    )
}

export default AllUsers

