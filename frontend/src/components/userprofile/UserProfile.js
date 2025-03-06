import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile({items, userData, randomCharBooster }) {

    const [localItems, setLocalItems] = useState(()=> {
        return items.reduce((total, i)=> total + i.amount, 0);
    });
    
  return (
    <>
        <div>
            <div className='main-container'>
                <h1> {userData.username} profile</h1>
                <div>
                    {/* item */}
                    <a href='/user_items'>
                        items {localItems}
                    </a>
                    
                </div>
                <div>
                    {/* album section */}
                    <a href='/card_album'>
                        album
                    </a>
                </div>
                <div>
                    {/* sell &  trade */}
                    <a href='/trade_section'>
                        trade
                    </a>
                </div>
                <div>
                    {/* pefile settings */}
                    <a href='/user_settings'>
                        prfile setting
                    </a>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserProfile