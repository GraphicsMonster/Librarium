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
    const checkLibraryExists = async () => {
      const response = await fetch(`http://localhost:3000/api/library/${id}`);
      const inventory = await fetch(`http://localhost:3000/api/library/${id}/inventorysize`);
      setLibraryExists(response.ok);

      const inventoryjson = await inventory.json();
      const responseJson = await response.json();
      setLibraryDetails({
        Id: responseJson.libraryId,
        name: responseJson.name,
        email: responseJson.email,
        inventory: inventoryjson.totalBooks,
        users: 0
      });
      console.log(LibraryDetails.inventory);
      console.log(LibraryDetails.name)
    };

    checkLibraryExists();
  }, [id, LibraryDetails.inventory, LibraryDetails.name]);

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
