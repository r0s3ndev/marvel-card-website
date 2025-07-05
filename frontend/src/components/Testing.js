import { useEffect, useState } from 'react'
import axios from 'axios'

function Testing() {
    const [data, setData] = useState();

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect((e) => {
        axios.get("http://localhost:5000/api/characters")
        .then((res) => {
            const characterData = res.data;

            // //get only character with descrption and photo
            // const filteredCharacter = characterData.filter((data) => data.description !== "" && !data.thumbnail.path.includes("image_not_available"));
            const randomCharacters = shuffleArray(characterData).slice(0, 5);

            setData(randomCharacters);
            console.log(randomCharacters);
        })
        .catch((err) => {
            console.error("error: ", err);
        })
    }, []);


    return (
        <>
            <div>test</div>
            {data ? data.map((character) =>
            (
                <div key={character.id}>
                    <div>
                        <p>{character.id}</p>
                        <p>{character.name}</p>
                        <img alt={character.name} src={character.thumbnail.path + "." + character.thumbnail.extension}></img>
                        <p>{character.description === "" ? "No description available" : character.description}</p>
                    </div>
                </div>
            )) : 
            <p> loading... </p>}
        </>
    )
}

export default Testing


