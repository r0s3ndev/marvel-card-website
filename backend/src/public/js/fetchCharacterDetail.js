async function getCharacterById(id){
    console.log("id clicked ", id);

    try{
        const response = await fetch(`/api/characters/${id}`);
        const characterDetails = await response.json();
        const data = characterDetails.data.results[0];
        console.log(data);
        

        const card_detail_div = document.getElementById("card_detail");
        const card_name = document.getElementById("card_name");
        const card_img = document.getElementById("card_img");
        const card_desc = document.getElementById("card_desc");
        
        if (card_name && card_img && card_desc) {
            card_name.textContent = data.name;
            card_img.src = data.thumbnail.path + "." + data.thumbnail.extension;
            card_desc.textContent = data.description === "" ? "No description available!" : data.description;
        } else {
            console.error("Card elements not found!");
        }

    } catch (error) {
        console.error(`Error fetching characters with id: ${id}`, error);
    }

}