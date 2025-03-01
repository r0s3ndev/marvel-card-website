import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile({items, userData, randomCharBooster }) {

    const [localItems, setLocalItems] = useState(()=> {
        return items.reduce((total, i)=> total + i.amount, 0);
    });
    
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