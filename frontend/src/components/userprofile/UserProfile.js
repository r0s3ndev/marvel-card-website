import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile({items, userData, randomCharBooster }) {
    // const [user, setUser] = useState([]);
    // useEffect(()=>{
    //     axios.post("http://localhost:5000/users/getUser", {username: userData.username} )
    //     .then((res) =>{
    //         setUser(res.data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }, []);

     const [localItems, setLocalItems] = useState(items);
    
    useEffect(()=> {
        setLocalItems(userData.items);
    }, [userData]);


    
  return (
    <>
        <div>
            <div className='user-profile-div'>
                <h1> {userData.username} profile</h1>
                <div>
                    {/* item */}
                    items {localItems}
                </div>
                <div>
                    {/* album section */}
                    album
                </div>
                <div>
                    {/* sell &  trade */}
                    trade & sell
                </div>
                <div>
                    {/* pefile settings */}
                    prfile setting
                </div>
            </div>
        </div>
    </>
  )
}

export default UserProfile