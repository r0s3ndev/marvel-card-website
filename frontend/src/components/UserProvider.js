import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();
function UserProvider({children}) {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData")) || []
    );
    const [tradeData, setTradeData] = useState(
        JSON.parse(localStorage.getItem("tradeData")) || []
    );
    const [onCreateTradeData , setOnCreateTradeData] = useState(
        JSON.parse(localStorage.getItem("onCreateTradeData")) || []
    );
    const [shopData , setShopData] = useState(
        JSON.parse(localStorage.getItem("shopData")) || []
    );
    const [specialOffer , setSpecialOffer] = useState(
        JSON.parse(localStorage.getItem("specialOffer")) || []
    );


    useEffect(()=> {
        if(userData){
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("tradeData", JSON.stringify(tradeData));
            localStorage.setItem("onCreateTradeData", JSON.stringify(onCreateTradeData));
            localStorage.setItem("shopData", JSON.stringify(shopData));
            localStorage.setItem("specialOffer", JSON.stringify(specialOffer));

        } else {
            console.log("clearing localstorage");
            localStorage.clear();
        }
    }, [userData, tradeData, onCreateTradeData, shopData, specialOffer]);

    return (
        <UserContext.Provider value={{userData, setUserData, tradeData, setTradeData, onCreateTradeData, setOnCreateTradeData, shopData, setShopData, specialOffer, setSpecialOffer}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider