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

    useEffect(()=> {
        if(userData){
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("tradeData", JSON.stringify(tradeData));
            localStorage.setItem("tradeData", JSON.stringify(onCreateTradeData));

        } else {
            console.log("clearing localstorage");
            localStorage.clear();
        }
    }, [userData, tradeData, onCreateTradeData]);

    return (
        <UserContext.Provider value={{userData, setUserData, tradeData, setTradeData, onCreateTradeData, setOnCreateTradeData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider