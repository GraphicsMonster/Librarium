import React from 'react'
import {useState, useEffect} from 'react'

import "./AllLibraries.css"

const AllLibraries = () => {

    const [totalLibs, setTotalLibs] = useState(0);
    const [Lib_details, setLibDetails] = useState([]); // [ {id: 1, name: 'ABC Library', location: 'XYZ', email: 'abc@xyz', phone: '1234567890', maxhold: 5}
    const [LibrariesExist, setLibrariesExist] = useState(false);

    useEffect(() => {
            
            const checkLibrariesExist = async() => {
                const response = await fetch(`http://localhost:3000/api/library/count`)
                const responseJson = await response.json();
                setTotalLibs(responseJson.libraryCount);
                console.log(totalLibs)
                if(totalLibs > 0) {
                    setLibrariesExist(true);
                    await fetchLibDetails();
                }
            };
    
            checkLibrariesExist();
    }, []);

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
            <div key={library.id} className="library">
              <h2>{library.name}</h2>
              <p>{library.location}</p>
              <p>Email: {library.email}</p>
              <p>Contact No. : {library.phone}</p>
              <p>Maximum No. of Holds allowed at a time: {library.maxhold}</p>
            </div>
          ))}
        </div>
      );
}

export default AllLibraries