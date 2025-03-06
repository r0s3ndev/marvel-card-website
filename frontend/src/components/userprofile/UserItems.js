import React, { useEffect, useState } from 'react'

function UserItems({userData, randomCharBooster, open_pack_and_update_data}) {
    const [localItems, setLocalItems] = useState(userData.items);

    useEffect(()=>{
        setLocalItems(userData.items);
    }, [userData])
    
    const openPack = (pack_id) => {
        open_pack_and_update_data(pack_id, 1);
    }

    return (
        <>
            <div className='main-container'> 
                {/* {randomCharBooster && (
                    <div className='loading-overlay-cardPack'>
                        <div className="loader">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                )} */}
                {localItems.map((i) => (
                    // when hovering must show "OPEN"
                    <div key={i.id} style={{border: "solid"}}>
                        <p>src: {i.src}</p>
                        <p>amount: {i.amount}</p>
                        <button onClick={() => openPack(i.id)}> OPEN </button>
                    </div>
                ))}
             
            </div>
        </>
    )
}

export default UserItems