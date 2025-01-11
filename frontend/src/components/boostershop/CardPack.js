import React, { useState } from 'react'
import axios from 'axios'
function CardPack({setCredits, credits, update_user_data}) {
    const [cards, setCards] = useState();
    const [loadingMsg, setLoadingMsg] = useState("");

    //randomize card selection
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const buyPack = () => {
        setCredits(credits - 10);
        console.log("buypack ", credits)
        update_user_data();
        // axios.get("http://localhost:5000/api/characters")
        // .then((res) => {
        //     const characterData = res.data;
        //     // //get only character with descrption and photo
        //     // const filteredCharacter = characterData.filter((data) => data.description !== "" && !data.thumbnail.path.includes("image_not_available"));
            
        //     //5 cards per pack
        //     const randomCharacters = shuffleArray(characterData).slice(0, 5);
        //     setCards(randomCharacters);
        //     setLoadingMsg("");
        //     console.log("pack containg these cards --> ", randomCharacters);
        //     setCredits(credits - 10);
        // })
        // .catch((err) => {
        //     console.error("error: ", err);
        // })
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
                                <button onClick={buyPack}> Buy - 10c </button>
                            </div>
                            <div>
                                <img alt="booster_2" src='https://www.goblins.net/files/styles/zoom/public/images/game/bgg/marvel-champions-card-game-valkyrie-hero-pack.png?itok=C0r6XwQ2'/>
                                <button onClick={buyPack}> Buy - 10c </button>
                            </div>
                            <div>
                                <img alt="booster_3" src='https://www.goblins.net/files/styles/zoom/public/images/game/bgg/marvel-champions-card-game-vision-hero-pack.png?itok=653DPOdL'/>
                                <button onClick={buyPack}> Buy - 10c </button>
                            </div>
                        </div>
                        
                    </div>

                    {cards ? cards.map((card) => (
                        <p key={card.id}>{card.name}</p>
                    )) : 
                    <p> {loadingMsg} </p>}
                </div>
            </div>
        </>
    )
}

export default CardPack