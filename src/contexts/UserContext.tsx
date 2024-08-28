import axios from "axios";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const UserContext = createContext({});

export const useUserStateContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
    email: "",
    picture: "",
    token: "",
    isAdmin: false,
    phoneNumber: "",
    tradeLink: "",
    saldo: 0,
  });

  const [showBudget, setShowBudget] = useState<boolean>(false);
  const [ showPayment, setShowPayment ] = useState<boolean>(false)
  const [ lastestTransactions, setLatestTransactions ] = useState()

  const getLatestTransactions = () => {
    if(!userInfo.email) return
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/transaction`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const logOut = () => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) localStorage.setItem("token", "");
    }
    setUserInfo({
      id: "",
      name: "",
      email: "",
      picture: "",
      token: "",
      isAdmin: false,
      phoneNumber: "",
      tradeLink: "",
      saldo: 0,
    });

    router.push("/login");
  };

  const value = {
    userInfo,
    logOut,
    setUserInfo,
    showBudget,
    setShowBudget,
    showPayment, 
    setShowPayment
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
