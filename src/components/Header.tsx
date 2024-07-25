import Image from 'next/image';
import { useRouter } from "next/router";
import { useSidebarState } from '../contexts/SidebarContext';
import logo from '../images/Logo.png';
import Xmark from '../assets/xmark.svg';
import { useEffect } from 'react';
import { useUserStateContext } from 'contexts/UserContext';
import UserContextType  from '../utils/interfaces'
import HeaderProfile from './HeaderProfile';
import axios from 'axios';

const Header = () => {
  const { sidebarView, toggleSidebar }:any = useSidebarState()
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

  return (
    <header className={sidebarView ? 'no-background' : ''}>
      <div className="HeaderWrapper">
        <div className="MainHeader">
          <div className="LogoBox" onClick={() => router.push('/')} >
            <Image className={sidebarView ? 'Logo SidebarOn' : 'Logo'} src={logo} alt="Logo de Lokinho Rifas" />
          </div>
          <nav className='desktop'>
            <ul>
            <li onClick={() => router.push('/#Home')}>Home</li>
            <li onClick={() => router.push('/#Vantagens')}>Vantagens</li>
            <li onClick={() => router.push('/#Grupos')}>Grupos</li>
            <li onClick={() => router.push('/#SobreNos')}>Sobre Nós</li>
            </ul>
          </nav>
        </div>
        {userInfo.token == '' ? <button onClick={() => router.push('/login')} className='desktop'>Faça Parte!</button> : <HeaderProfile />}
        <button onClick={() => toggleSidebar()} className='mobile tablet'>{sidebarView ? <Image src={Xmark} alt="Fechar sidebar" /> : '|||'}</button>
      </div>
    </header>
  );
}
 
export default Header;