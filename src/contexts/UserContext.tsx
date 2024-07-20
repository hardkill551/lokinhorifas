import { ReactNode, createContext, useContext, useState } from "react";

export const UserContext = createContext({})

export const useUserStateContext = () => {
    return useContext(UserContext)
  }

export const UserProvider = ({children} : {children: ReactNode}) =>{
    const [userInfo, setUserInfo] = useState({name:"", id:"", email:"", picture:"", token:"", isAdmin:false, phoneNumber: "", tradeLink:""})

    const value = {
        userInfo,
        setUserInfo
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}