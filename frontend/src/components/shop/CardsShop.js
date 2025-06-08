import axios from 'axios';
import { useState } from 'react';

const pack = {
    ONE : {id: 1, price: 10, src: "https://images.desenio.com/zoom/wb0012-8harrypotter-hogwartscrest50x70-60944-71911.jpg"},
    TWO : {id: 2, price: 20, src: "https://images.desenio.com/zoom/wb0012-8harrypotter-hogwartscrest50x70-60944-71911.jpg"},
    THREE: {id: 3, price: 40, src: "https://images.desenio.com/zoom/wb0012-8harrypotter-hogwartscrest50x70-60944-71911.jpg"}
}

function CardsShop({userData, setUserData}) {
    const [loading, setLoading] = useState(false);

    const buyPack = async (pack) => {
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:5000/users/single_pack_purchase", {username: userData.username, pack: pack, amount: 1});
            if(res.status === 200){
                setUserData(prev => ({ ...prev, ...res.data.user}));
                setTimeout(()=>{
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            console.error("Error while buying packs; Exception: " + error);
        }
    };

    const buyCredit = async()=> {
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:5000/users/buy_credit", {username: userData.username});
            if(res.status === 200){
                setUserData(prev => ({ ...prev, ...res.data.user}));
                setTimeout(()=>{
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            console.error("Error while buying packs; Exception: " + error);
        }
    }
    
    return (
        <>
            <div>
                <div className='main-container'>
                    <button onClick={() => buyCredit()}> Buy 250 Credit </button>
                    <h1>shop</h1>
                    <div>
                        <h2> buys packs</h2>
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
                            <div className='booster-pack-div'>
                                <img className='booter-pack-img one' alt="booster_1" src= {pack.ONE.src} />
                                <button onClick={(e) => buyPack(pack.ONE)}> Buy - {pack.ONE.price}c </button>
                            </div>
                            <div className='booster-pack-div'>
                                <img className='booter-pack-img two' alt="booster_2" src={pack.TWO.src}/>
                                <button onClick={(e) => buyPack(pack.TWO)}> Buy - {pack.TWO.price}c </button>
                            </div>
                            <div className='booster-pack-div'>
                                <img className='booter-pack-img three' alt="booster_3" src={pack.THREE.src}/>
                                <button onClick={(e) => buyPack(pack.THREE)}> Buy - {pack.THREE.price}c </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsShop