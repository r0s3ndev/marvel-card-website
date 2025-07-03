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

    useEffect(()=> {
        if(userData){
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("tradeData", JSON.stringify(tradeData));
            localStorage.setItem("onCreateTradeData", JSON.stringify(onCreateTradeData));
            localStorage.setItem("shopData", JSON.stringify(shopData));

        } else {
            console.log("clearing localstorage");
            localStorage.clear();
        }
    }, [userData, tradeData, onCreateTradeData, shopData]);

    return (
        <UserContext.Provider value={{userData, setUserData, tradeData, setTradeData, onCreateTradeData, setOnCreateTradeData, shopData, setShopData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider