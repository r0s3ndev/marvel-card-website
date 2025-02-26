import React from 'react'
function CardPack({update_user_data}) {

    const buyPack = (e, price) => {
        update_user_data(price, 1);        
    };
    
    return (
        <>
            <div>
                <div className='shop-container'>
                    <h1>shop</h1>
                    <div>
                        <h2> buys packs</h2>
                        <div className='booster-selection-div'>
                            <div>
                                <img alt="booster_1" src='https://www.goblins.net/files/styles/zoom/public/images/game/bgg/marvel-champions-card-game-ant-man-hero-pack.png?itok=XR4CeWFH'/>
                                <button onClick={(e) => buyPack(e, 10)}> Buy - 10c </button>
                            </div>
                            <div>
                                <img alt="booster_2" src='https://www.goblins.net/files/styles/zoom/public/images/game/bgg/marvel-champions-card-game-valkyrie-hero-pack.png?itok=C0r6XwQ2'/>
                                <button onClick={(e) => buyPack(e, 20)}> Buy - 20c </button>
                            </div>
                            <div>
                                <img alt="booster_3" src='https://www.goblins.net/files/styles/zoom/public/images/game/bgg/marvel-champions-card-game-vision-hero-pack.png?itok=653DPOdL'/>
                                <button onClick={(e) => buyPack(e, 40)}> Buy - 40c </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPack