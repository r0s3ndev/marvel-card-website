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
            <div>
                <div className='main-container'> 
                    <div>
                        <h2> Your items </h2>
                        <div className='booster-selection-div'>
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
                            {localItems.length === 0 ?  
                                (
                                    <div> No item available. <a href='/shop'>BUY</a> some packs</div>
                                ): 
                                (
                                    <>
                                        {sortedItems.map((i) => (
                                            // when hovering must show "OPEN"
                                            <div key={i.id} className='booster-pack-div'>
                                                <img className={i.id === 1 ? "booter-pack-img one" : i.id === 2 ?  "booter-pack-img two" : i.id === 3 ?  "booter-pack-img three" :  "booter-pack-img one" } alt={"booster_" + i.id} src= {i.src} />

                                                {/* <p>src: {i.src}</p> */}
                                                <p>amount: {i.amount}</p>
                                                <button onClick={() => openPack(i.id)}> OPEN </button>
                                            </div>
                                        ))}
                                    </>
                                ) 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserItems