import React from 'react'
function CardPack({updatedData, update_credits_and_data}) {
    const pack = {
        ONE : {id: 1, price: 10, src: "https://images.desenio.com/zoom/wb0012-8harrypotter-hogwartscrest50x70-60944-71911.jpg"},
        TWO : {id: 2, price: 20, src: "https://images.desenio.com/zoom/wb0012-8harrypotter-hogwartscrest50x70-60944-71911.jpg"},
        THREE: {id: 3, price: 40, src: "https://images.desenio.com/zoom/wb0012-8harrypotter-hogwartscrest50x70-60944-71911.jpg"}
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

export default CardPack