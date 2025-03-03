import React from 'react'

function UserItems({userData, open_pack_and_update_data}) {
    const items = userData.items;

    const openPack = (pack_id) => {
        open_pack_and_update_data(pack_id, 1);
    }

    return (
        <>
            <div className='main-container'> 
                {items.map((i) => (
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