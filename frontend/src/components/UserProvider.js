import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();
function UserProvider({children}) {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData")) || []
    );

    useEffect(()=> {
        if(userData){
            localStorage.setItem("userData", JSON.stringify(userData));
        } else {
            console.log("clearing localstorage");
            localStorage.clear();
        }
    }, [userData]);

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider