async function getCharacters(){
    
    try{
        //add loading element
        const loader_div = document.getElementById("main_container");
        const loading = document.createElement("p");
        loading.textContent = "loading...";
        loader_div.appendChild(loading);

        const res = await fetch("/api/characters");
        const data = await res.json();

        //remove loading element
        loader_div.innerHTML = "";

        //clear characters_list from previous element
        const characters_list = document.getElementById("characters_list");
        characters_list.innerHTML = "";
        
        data.forEach(items => {
            if(items.description !== "" && !items.thumbnail.path.includes("image_not_available")){
                const item_div = document.createElement("div");
                const item_id = document.createElement("div");
                const item_name = document.createElement("p");
                const item_desc = document.createElement("p");
                const item_img = document.createElement("img");

                //style
                item_div.classList.add("character-item");
                item_div.onclick = function() {getCharacterById(items.id)};
                item_name.classList.add("character-name");
                item_img.classList.add("character-img");
                item_desc.classList.add("character-desc");

                //content
                item_id.textContent = items.id;
                item_img.src = items.thumbnail.path + "." + items.thumbnail.extension;
                item_name.textContent = items.name;
                item_desc.textContent = items.description == "" ? "No description available!" : items.description;

                item_div.appendChild(item_id);
                item_div.appendChild(item_name);
                item_div.appendChild(item_img);
                item_div.appendChild(item_desc);

                characters_list.appendChild(item_div);

                // //event lisntener
                // item_div.addEventListener("click", () => {
                //     getCharacterById(items.id);
                // });
            }
        });
        
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
    
}

async function getCharacterById(id){
    try{
        console.log("moving to card_info");
        window.location.href = `/view/card_info?id=${id}`;

    } catch (error) {
        console.error(`Error fetching characters with id: ${id}`, error);
    }
}

//Event listener
// document.getElementById('getCharaters').addEventListener('click', fetchCharacters);


