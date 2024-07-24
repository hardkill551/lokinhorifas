import { useUserStateContext } from "contexts/UserContext";
import UserContextType  from '../utils/interfaces'
import Image from "next/image";

import defaultProfilePicture from '../assets/defaultProfilePic.svg'
import { useEffect, useState } from "react";
import Settings from "./Settings";

const HeaderProfile = () => {
  const { userInfo, logOut } = useUserStateContext() as UserContextType
  const [ budget, setBudget ] = useState<number>(0)
  const [ budgetString, setBudgetString ] = useState<string>()
  const [ showDropdown, setShowDropdow ] = useState<boolean>(false)
  const [ showSettings, setShowSettings ] = useState<boolean>(false)
  const [ image, setImage ] = useState<File | null>(null)
  
  const randomValue = Math.floor(Math.random() * 5000)

  useEffect(() => {
    const html = document.querySelector('html')

    
    html?.classList.toggle('scrollOff', showSettings)
  }, [showSettings])
  
  useEffect(() => {
    setBudget(randomValue)
    setBudgetString(budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ",00")
  }, [])

  const { name, email, picture } = userInfo

  const profile = {
    name: name != '' ? name : 'notloggedinuser',
    email: email != '' ? email : 'notloggedinuser@gmail.com',
    picture: picture === "default" ? defaultProfilePicture :
    (picture).startsWith('https://static-cdn.jtvnw.net') ?
    picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${picture}`,
    budget: budgetString
  }

  const props = {
    profile,
    showSettings,
    setShowSettings,
    image,
    setImage
  }

  const toggleOnDropdownVisibility = () => {
    if(showDropdown) return
    setShowDropdow(oldValue => !oldValue)

    const dropdown = document.getElementById('headerDropdownInput')

    dropdown?.focus()
  }

  const toggleOffDropdownVisibility = () => {
    if(!showDropdown) return

    setTimeout(() => {
      setShowDropdow(oldValue => !oldValue)
    }, 100);
  }

  const openConfig = () => {
    setShowSettings(true)
  }

  const handleLogout = () => {
    logOut()
  }

  return (
    <div className="Profile desktop">
      <div className="ProfileWrapper">
        <div className="ProfileContent" onClick={() => toggleOnDropdownVisibility()}>
          <div className="ProfilePicture">
            <Image width={20} height={20} src={image ? URL.createObjectURL(image) : profile.picture} alt="Imagem de perfil"/>
          </div>
          <div className="ProfileText">
            <h2>{profile.name}</h2>
            <h3>{profile.email}</h3>
          </div>
        </div>

      </div>

      <div className="Dropdown" style={{height: showDropdown ? 'fit-content' : '0'}}>
        <input type="text" id="headerDropdownInput" onBlur={() => toggleOffDropdownVisibility()}/>
        <ul>
          <li onClick={() => openConfig()}>Configurações</li>
          <li onClick={() => handleLogout()}>Sair</li>
          <button>Saldo: R$<span className="Value">{profile.budget}</span></button>
        </ul>
      </div>

      {showSettings && <Settings props={props}/>}
    </div>
  );
}
 
export default HeaderProfile;