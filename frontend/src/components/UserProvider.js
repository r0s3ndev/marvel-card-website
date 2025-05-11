import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();
function UserProvider({children}) {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData")) || null
    );

    useEffect(()=> {
        if(userData){
            localStorage.setItem("userData", JSON.stringify(userData));
        } else {
            localStorage.removeItem(userData);
        }
    }, [userData]);

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider