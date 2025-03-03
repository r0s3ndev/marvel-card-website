import React, { useState } from 'react'
function CardPack({updatedData, update_credits_and_data}) {
    const pack = {
        ONE : {id: 1, price: 10, src: "https://www.goblins.net/files/styles/zoom/public/images/game/bgg/marvel-champions-card-game-ant-man-hero-pack.png?itok=XR4CeWFH"},
        TWO : {id: 2, price: 20, src: "https://www.goblins.net/files/styles/zoom/public/images/game/bgg/marvel-champions-card-game-valkyrie-hero-pack.png?itok=C0r6XwQ2"},
        THREE: {id: 3, price: 40, src: "https://www.goblins.net/files/styles/zoom/public/images/game/bgg/marvel-champions-card-game-vision-hero-pack.png?itok=653DPOdL"}
    }

    const buyPack = (pack) => {
        update_credits_and_data(pack, 1);
    };
    
    return (
        <>
            <div>
                <div className='main-container'>
                    <h1>shop</h1>
                    <div>
                        <h2> buys packs</h2>
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
                                <div>
                                    <img alt="booster_1" src= {pack.ONE.src} />
                                    <button onClick={(e) => buyPack(pack.ONE)}> Buy - {pack.ONE.price}c </button>
                                </div>
                                <div>
                                    <img alt="booster_2" src={pack.TWO.src}/>
                                    <button onClick={(e) => buyPack(pack.TWO)}> Buy - {pack.TWO.price}c </button>
                                </div>
                                <div>
                                    <img alt="booster_3" src={pack.THREE.src}/>
                                    <button onClick={(e) => buyPack(pack.THREE)}> Buy - {pack.THREE.price}c </button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPack