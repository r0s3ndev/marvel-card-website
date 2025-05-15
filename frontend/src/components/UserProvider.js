import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();
function UserProvider({children}) {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData")) || []
    );
    const [tradeData, setTradeData] = useState(
        JSON.parse(localStorage.getItem("tradeData")) || []
    );

    useEffect(()=> {
        if(userData){
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("tradeData", JSON.stringify(tradeData));
        } else {
            console.log("clearing localstorage");
            localStorage.clear();
        }
    }, [userData, tradeData]);

    return (
        <UserContext.Provider value={{userData, setUserData, tradeData, setTradeData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider