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
        const [libraryResponse, inventoryResponse] = await Promise.all([
          fetch(`http://localhost:3000/api/library/${id}`),
          fetch(`http://localhost:3000/api/library/${id}/inventorysize`)
        ]);
  
        if (!libraryResponse.ok || !inventoryResponse.ok) {
          throw new Error('Failed to fetch library details');
        }
  
        const [libraryData, inventoryData] = await Promise.all([
          libraryResponse.json(),
          inventoryResponse.json()
        ]);
  
        setLibraryExists(true);
        setLibraryDetails({
          Id: libraryData.libraryId,
          name: libraryData.name,
          email: libraryData.email,
          inventory: inventoryData.totalBooks,
          users: 0
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
          <Sidebar isItLibrary={isItLibrary} />
        </div>
        <div className='dashboard__content'>
          <ProfileCard
            key={LibraryDetails.inventory}
            isItLibrary={true}
            libraryId={LibraryDetails.Id}
            lib_name={LibraryDetails.name}
            email={LibraryDetails.email}
            inventory={LibraryDetails.inventory}
            users={LibraryDetails.users}
          />
          <Inventory />
        </div>
      </div>
    </>
  );
}

export default LibraryDashboard;
