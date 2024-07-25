import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useState } from "react";

export const UserContext = createContext({})

export const useUserStateContext = () => {
    return useContext(UserContext)
  }

export const UserProvider = ({children} : {children: ReactNode}) =>{
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({name:"", id:"", email:"", picture:"", token:"", isAdmin:false, phoneNumber: "", tradeLink:""})

    const logOut = () => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("token");
            if(storedToken) localStorage.setItem('token', '')
        }
        setUserInfo({name:"", id:"", email:"", picture:"", token:"", isAdmin:false, phoneNumber: "", tradeLink:""})

        router.push('/login')
    }

    const value = {
        userInfo,
        logOut,
        setUserInfo
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}