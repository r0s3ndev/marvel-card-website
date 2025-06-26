import { useState } from 'react';
import axios from 'axios';

function UserItems({userData, setUserData, fetchCard}) {
    const localItems = userData.items;
    const sortedItems = localItems.sort((a, b) => a.id - b.id);
    
    const openPack = async (pack_id) => {
        try{
            const fetchedCard = await fetchCard("user_item");
            if(fetchedCard) {
                const res = await axios.post("http://localhost:5000/users/open_pack", {username: userData.username, pack_id: pack_id, amount: 1, cards: fetchedCard});
                if(res.status ===  200){
                    setUserData(prev => ({ ...prev, ...res.data.updatedData}));
                    setTimeout(()=>{
                        console.log(res.data.message);
                    }, 1000);
                }
            }
        } catch (error) {
            console.error("Error while opening packs; Exception: " + error);
        }
    }

    return (
        <>
            <div>
                <div className='homepage-container'> 
                    <div className='album-text'>
                        <h1>Your items ({sortedItems.length}):</h1>
                        <a href='/shop'> Buy Packs &rarr;</a>
                    </div>
                    <div className='user-item-div'>
                        {localItems.length === 0 ?  
                            (
                                <h1> No item available. <a href='/shop'>BUY</a> some packs</h1>
                            ): 
                            (
                                <>
                                    {sortedItems.map((i) => (
                                        // when hovering must show "OPEN"
                                        <div key={i.id} className='item-box'>
                                            <img className={i.id === 1 ? "booter-pack-img one" : i.id === 2 ?  "booter-pack-img two" : i.id === 3 ?  "booter-pack-img three" :  "booter-pack-img one" } alt={"booster_" + i.id} src= {i.src} />

                                            <p>amount: {i.amount}</p>
                                            <button className='button button4' onClick={() => openPack(i.id)}> OPEN </button>
                                        </div>
                                    ))}
                                </>
                            ) 
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserItems