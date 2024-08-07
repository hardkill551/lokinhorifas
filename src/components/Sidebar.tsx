import { useEffect } from "react";
import { useSidebarState } from "../contexts/SidebarContext";

import { useRouter } from "next/router";
import { useUserStateContext } from "contexts/UserContext";
import UserContextType  from '../utils/interfaces'
import axios from "axios";
import HeaderProfile from "./HeaderProfile";

const Sidebar = () => {
  const { sidebarView, toggleSidebar } = useSidebarState() as { sidebarView:boolean, toggleSidebar:Function }
  const { userInfo, setUserInfo } = useUserStateContext() as UserContextType

  const router = useRouter()

  useEffect(() => {
    const htmlElement = document.querySelector('html')
    
    htmlElement?.classList.toggle('SidebarOn', sidebarView)

    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth", {}, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }).then((res) => {
          setUserInfo({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            picture: res.data.user.picture,
            token: res.data.user.token,
            isAdmin: res.data.user.isAdmin,
            phoneNumber: res.data.user.phoneNumber,
            tradeLink: res.data.user.tradeLink
          });
        }).catch((err) => {
          localStorage.setItem("token", "");
          setUserInfo({ id: "", name: "", email: "", picture: "", token: "", isAdmin: false, phoneNumber: "", tradeLink: "" });
        });
      }
    }
  }, [sidebarView, setUserInfo, userInfo.picture])
  // * O código acima adiciona e retira scroll da página quando a Sidebar está visível

  const handleRedirectBtn = (route: string) => {
    router.push(`/${route}`)
    toggleSidebar()
  }

  return (
    <section className={sidebarView ? "Sidebar mobile tablet visible" : "Sidebar mobile tablet"}>
      <div className="SidebarWrapper">
        <ul className="MainNavigation">
          <li onClick={() => handleRedirectBtn('/#Home')}>Home</li>
          <li onClick={() => handleRedirectBtn('/roleta')}>Sorteio</li>
          <li onClick={() => handleRedirectBtn('/live')}>Live</li>
          <li onClick={() => handleRedirectBtn('/ultimosganhadores')}>Últimos Ganhadores</li>
          <li onClick={() => handleRedirectBtn('/#SobreNos')}>Sobre Nós</li>
        </ul>
        {userInfo.token == '' ? <button onClick={() => handleRedirectBtn('login')}>Faça Parte!</button> : <div className="mobile">
          <HeaderProfile />
        </div>}
        <ul className="Socials">
          <li><a target="_blank" href="https://api.whatsapp.com/send?phone=5586981088012">Whatsapp</a></li>
          <li><a target="_blank" href="https://instagram.com/lokinhoskins">Instagram</a></li>
        </ul>
      </div>
    </section>
  );
}
 
export default Sidebar;