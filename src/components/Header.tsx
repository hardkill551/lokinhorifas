import Image from 'next/image';
import { useRouter } from "next/router";
import { useSidebarState } from '../contexts/SidebarContext';
import logo from '../images/Logo.png';
import Xmark from '../assets/xmark.svg';
import { useEffect } from 'react';
import { useUserStateContext } from 'contexts/UserContext';
import UserContextType  from '../utils/interfaces'
import HeaderProfile from './HeaderProfile';

const Header = () => {
  const { sidebarView, toggleSidebar }:any = useSidebarState()
  const { userInfo } = useUserStateContext() as UserContextType

  const { token } = userInfo

  useEffect(() => {
    const htmlElement = document.querySelector('html')
  
    htmlElement?.classList.toggle('SidebarOn', sidebarView)
  }, [sidebarView])
  // * O código acima adiciona e retira scroll da página quando a Sidebar está visível

  const router = useRouter()

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
        {token == '' ? <button onClick={() => router.push('/login')} className='desktop'>Faça Parte!</button> : <HeaderProfile />}
        <button onClick={() => toggleSidebar()} className='mobile tablet'>{sidebarView ? <Image src={Xmark} alt="Fechar sidebar" /> : '|||'}</button>
      </div>
    </header>
  );
}
 
export default Header;