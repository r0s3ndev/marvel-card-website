import { useState } from 'react';
import axios from 'axios';

function UserItems({userData, setUserData, fetchCard}) {
    const [loading, setLoading] = useState(false);
    const localItems = userData.items;
    const sortedItems = localItems.sort((a, b) => a.id - b.id);
    
    const openPack = async (pack_id) => {
        setLoading(true);
        try{
            const fetchedCard = await fetchCard("user_item");
            if(fetchedCard) {
                const res = await axios.post("http://localhost:5000/users/open_pack", {username: userData.username, pack_id: pack_id, amount: 1, cards: fetchedCard});
                if(res.status ===  200){
                    setUserData(prev => ({ ...prev, ...res.data.updatedData}));
                    setTimeout(()=>{
                        setLoading(false);
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
                <div className='main-container'> 
                    <div>
                        <h2> Your items </h2>
                        <div className='booster-selection-div'>
                           {loading && (
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