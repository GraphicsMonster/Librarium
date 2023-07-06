import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./LibraryDashboard.css";
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import Inventory from './../../components/Inventory/Inventory.jsx';
import Sidebar from '../../components/sidebar/sidebar.jsx';

function LibraryDashboard() {
  const isItLibrary = true;
  const { id } = useParams();
  const [libraryExists, setLibraryExists] = useState(false);
  const [LibraryDetails, setLibraryDetails] = useState({});

  useEffect(() => {
    const fetchLibraryDetails = async () => {
      try {
        const [libraryResponse, inventoryResponse, userCountData] = await Promise.all([
          fetch(`http://localhost:3000/api/library/${id}`),
          fetch(`http://localhost:3000/api/library/${id}/inventorysize`),
          fetch(`http://localhost:3000/api/library/${id}/users/count`)
        ]);
  
        if (!libraryResponse.ok || !inventoryResponse.ok || !userCountData.ok) {
          throw new Error('Failed to fetch library details');
        }
  
        const [libraryData, inventoryData, userCount] = await Promise.all([
          libraryResponse.json(),
          inventoryResponse.json(),
          userCountData.json()
        ]);
  
        setLibraryExists(true);
        setLibraryDetails({
          Id: libraryData.libraryId,
          name: libraryData.name,
          email: libraryData.email,
          inventory: inventoryData.totalBooks,
          totalUsers: userCount.totalUsers
        });

      } 
      
      catch (error) {
        console.error('An error occurred while fetching library details:', error);
        setLibraryExists(false);
      }

    };
  
    fetchLibraryDetails();
  }, [id]);
  

  if (!libraryExists) {
    return (
      <div className='library-dashboard-error'>
        <h1>Library does not exist</h1>
      </div>
    );
  }

  return (
    <>
      <div className='dashboard__container'>
        <div className='dashboard__sidebar'>
          <Sidebar isItLibrary={isItLibrary} id={id} />
        </div>
        <div className='dashboard__content'>
          <ProfileCard
            key={LibraryDetails.inventory}
            isItLibrary={true}
            libraryId={LibraryDetails.Id}
            lib_name={LibraryDetails.name}
            email={LibraryDetails.email}
            inventory={LibraryDetails.inventory}
            totalUsers={LibraryDetails.totalUsers}
          />
          <Inventory />
        </div>
      </div>
    </>
  );
}

export default LibraryDashboard;
