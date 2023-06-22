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
        <div className="library-list">
          {Lib_details.map((library) => (
            <div key={library.id} className="library-card">
              <h2 className="library-name">{library.name}</h2>
              <div className="library-info">
                <p className="library-location">Location: {library.location}</p>
                <p className="library-email">Email: {library.email}</p>
                <p className="library-phone">Contact No.: {library.phone}</p>
                <p className="library-maxhold">Maximum No. of Holds allowed at a time: {library.maxhold}</p>
              </div>
            </div>
          ))}
        </div>
      );
}

export default AllLibraries