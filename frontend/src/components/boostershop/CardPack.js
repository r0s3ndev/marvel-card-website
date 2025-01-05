import React, { useState } from 'react'
import axios from 'axios'
function CardPack({setUserCredits, userCredits}) {
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
        console.log("loading cards");
        setLoadingMsg("loading...");
        axios.get("http://localhost:5000/api/characters")
        .then((res) => {
            const characterData = res.data;
            // //get only character with descrption and photo
            // const filteredCharacter = characterData.filter((data) => data.description !== "" && !data.thumbnail.path.includes("image_not_available"));
            
            //5 cards per pack
            const randomCharacters = shuffleArray(characterData).slice(0, 5);
            setCards(randomCharacters);
            setLoadingMsg("");
            console.log("pack containg these cards --> ", randomCharacters);
            setUserCredits(userCredits - 10);
        })
        .catch((err) => {
            console.error("error: ", err);
        })
    };
    


    return (
        <>
            <div>
                <a href="/homepage"> Home </a>
                <h1>shop</h1>
                <div>
                    <h2> buys packs</h2>
                    <button onClick={buyPack}> Buy - 10c </button>
                </div>

                {cards ? cards.map((card) => (
                    <p key={card.id}>{card.name}</p>
                )) : 
                <p> {loadingMsg} </p>}
            </div>
        </>
    )
}

export default CardPack