import axios from 'axios';
import { useState } from 'react';

const pack = {
    ONE : {id: 1, price: 100, src: "https://img.icons8.com/?size=100&id=FFIT0V3dxY2k&format=png&color=FFFFFF"},
    TWO : {id: 2, price: 300, src: "https://img.icons8.com/?size=100&id=FFIT0V3dxY2k&format=png&color=ACFFF8"},
    THREE: {id: 3, price: 500, src: "https://img.icons8.com/?size=100&id=FFIT0V3dxY2k&format=png&color=F2FF00"}
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

    const buyCredit = async(c)=> {
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:5000/users/buy_credit", {username: userData.username, amount: c});
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
                <div className='shop-container'>
                    <div className='shop-banner'>
                        <h1>SHOP MARKET</h1>
                        <p>Purchase credits and card packs to enhance your collection</p>
                    </div>
                    <h1>CREDITS</h1>
                    <div className='homepage'>
                        <div className='shop-box'>
                            <img src="https://img.icons8.com/?size=100&id=45859&format=png&color=000000" alt="logo"></img>
                             <h3>Buy 250 Credit</h3>
                            <button className='button button5' onClick={() => buyCredit("250")}> for 1.99$ </button>
                        </div>

                        <div className='shop-box'>
                            <img src="https://img.icons8.com/?size=100&id=45859&format=png&color=000000" alt="logo"></img>
                            <h3>Buy 500 Credit</h3>
                            <button className='button button5' onClick={() => buyCredit("500")}> for 2.99$ </button>
                        </div>

                        <div className='shop-box'>
                            <img src="https://img.icons8.com/?size=100&id=45859&format=png&color=000000" alt="logo"></img>
                             <h3>Buy 1000 Credit</h3>
                            <button className='button button5' onClick={() => buyCredit("1000")}> for 5.59$ </button>
                        </div>
                    </div>
                    
                    <h1>CARD PACKS</h1>
                    <div className='homepage'>
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
                        <div className='shop-box'>
                            <img className='pack-img' src={pack.ONE.src} alt="logo"></img>
                            <h3>Standard</h3>
                            <p> 5 cards </p>
                            <button className='button button5' onClick={(e) => buyPack(pack.ONE)}> {pack.ONE.price} Credit </button>
                        </div>
                        <div className='shop-box'>
                            <img className='pack-img' src={pack.TWO.src} alt="logo"></img>
                            <h3>Premium</h3>
                            <p> 8 cards </p>
                            <button className='button button5' onClick={(e) => buyPack(pack.TWO)}> {pack.TWO.price} Credit </button>
                        </div>
                        <div className='shop-box'>
                            <img className='pack-img ' src={pack.THREE.src} alt="logo"></img>
                            <h3>GOLD</h3>
                            <p> 15 cards </p>
                            <button className='button button5' onClick={(e) => buyPack(pack.THREE)}> {pack.THREE.price} Credit </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsShop