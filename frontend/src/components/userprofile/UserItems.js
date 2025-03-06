import React, { useEffect, useState } from 'react'

function UserItems({updatedData, userData, open_pack_and_update_data}) {
    const [localItems, setLocalItems] = useState(userData.items);
    const sortedItems = localItems.sort((a, b) => a.id - b.id);
    
    useEffect(()=>{
        setLocalItems(userData.items);
    }, [userData])
    
    const openPack = async (pack_id) => {
        await open_pack_and_update_data(pack_id, 1);
    }

    return (
        <>
            <div className='main-container'> 
                {updatedData && (
                    <div className='loading-overlay-cardPack'>
                        <div className="loader">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                )}
                {sortedItems.map((i) => (
                    // when hovering must show "OPEN"
                    <div key={i.id} style={{border: "solid"}}>
                        <p>{i.id}</p>
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