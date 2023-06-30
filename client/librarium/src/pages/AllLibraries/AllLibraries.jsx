import React from 'react'
import {useState, useEffect} from 'react'

import "./AllLibraries.css"

const AllLibraries = () => {

    const [totalLibs, setTotalLibs] = useState(0);
    const [Lib_details, setLibDetails] = useState([]);
    const [LibrariesExist, setLibrariesExist] = useState(false);

    useEffect(() => {
            
            const checkLibrariesExist = async() => {
                const response = await fetch(`http://localhost:3000/api/library/count`)
                const responseJson = await response.json();
                setTotalLibs(responseJson.libraryCount);
                if(totalLibs > 0) {
                    setLibrariesExist(true);
                    await fetchLibDetails();
                }
            };
    
            checkLibrariesExist();
    }, [totalLibs]);

    const fetchLibDetails = async () => {

        if(totalLibs > 0) {

            try {

                const requests = [];

                for(let i = 1; i<=totalLibs; i++){
                    requests.push(fetch(`http://localhost:3000/api/library/${i}`));
                }

                const responses = await Promise.all(requests)
                const details = await Promise.all(responses.map((response) => response.json()));
                setLibDetails(details);

            }
            catch(error) {
                console.log('Library could not be fetched')
            }
        }
        
        else {
            console.log('There are no libraries on the network to fetch');
        }
    }


    if(!LibrariesExist) {
        return (
            <div className='no-libraries'>
                <h1>There are no libraries registered on the network yet</h1>
            </div>
        )
    }

    return (
        <div className="library-table">
          <h2>List of all Libraries on the network</h2>
          <table className="library-list">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Library Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>Max No. of Holds</th>
              </tr>
            </thead>
            <tbody>
              {Lib_details.map((library, index) => (
                <tr key={library.id}>
                  <td>{index + 1}</td>
                  <td>{library.name}</td>
                  <td>{library.location}</td>
                  <td>{library.email}</td>
                  <td>{library.phone}</td>
                  <td>{library.maxhold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default AllLibraries