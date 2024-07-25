import Image from 'next/image';
import xmark from '../assets/xmark.svg'
import editPencil from '../assets/editPencil.svg'
import { UserSettingsType } from 'utils/interfaces';
import { useRef, useState } from 'react';
import { useUserStateContext } from 'contexts/UserContext';
import UserContextType  from '../utils/interfaces'
import axios from 'axios';

const Settings = ({ props }: { props: UserSettingsType }) => {
  const { profile, setShowSettings, image, setImage } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const { userInfo, setUserInfo } = useUserStateContext() as UserContextType

  const [userData, setUserData] = useState<any>({
    tradeLink: profile.tradeLink,
    newTradeLink: "",
    phoneNumber: profile.phoneNumber,
    newPhoneNumber: "",
    oldPassword: "",
    newPassword: "",
    picture: null
});

  // const changeProfilePic = () => {
  //   if(!inputRef.current) return
  // TODO Não sei o que essa função faz, então comentei
  //   inputRef.current.click()
  // }
  

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if (name === "picture") {
        if(!inputRef.current) return
        if(!inputRef.current.files) return
        const file = inputRef.current.files[0]
    
        setImage(file)
        setUserData((prevState:any) => ({
            ...prevState,
            picture: e.target.files[0]
        }));
    } else {
        setUserData((prevState:any) => ({
            ...prevState,
            [name]: value
        }));
    }
};

  const updateUser = async (object:string) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    let signUpData:any = {}
    if(userData.newTradeLink !== ""){
      signUpData.tradeLink = userData.newTradeLink
    }
    if(userData.newPhoneNumber !== ""){
      signUpData.phoneNumber = userData.newPhoneNumber
    }
    console.log(object)
    
    if(userData.newPassword && userData.oldPassword){
        signUpData.newPassword = userData.newPassword;
        signUpData.oldPassword = userData.oldPassword
    }


    formData.append('signUpData', JSON.stringify(signUpData));

    if (userData.picture) {
        formData.append('picture', userData.picture);
    } else {
        formData.append('picture', "Default");
    }
    
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users/update/${userInfo.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            // TODO setSuccess(true);
            if(object === "newTradeLink"){
              setUserData({tradeLink: userData.newTradeLink, newTradeLink:""})
            } else if(object === "password"){
              setUserData({oldPassword: "", newPassword: ""})
            } else if(object === "Image"){
              setUserData({picture: null})
            } else if (object === "phoneNumber"){
              setUserData({phoneNumber: userData.newPhoneNumber, newPhoneNumber: ""})
            }
            
        } else {
            throw new Error('Erro ao atualizar os dados');
        }
    } catch (err: any) {
        // TODO setError(true);
        console.log(err.response.data);
    }
};

  return (
    <div className="config">
      <div className="configWrapper">
        <div className="configWrapperContent">
          <button onClick={() => setShowSettings(false)}><Image src={xmark} alt="Fechar menu"/></button>
          <h2>Configurações de usuário</h2>
          <div className="accountInfo">
            <div className="imageBox">
              <Image width={200} height={200} src={image ? URL.createObjectURL(image) : profile.picture} alt="Imagem de perfil"/>
              <button type="button" onClick={() => updateUser("Image")}>
                <Image width={18} height={18} src={editPencil} alt={'Editar foto de perfil'}/>
                <input type="file" onChange={(e) => handleChange(e)} name="profilePic" id="profilePic" ref={inputRef} />
              </button>
            </div>
            <div className="accountContent">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
              <p>Conta criada: 01/08/2024</p>
            </div>
          </div>
          <div className="boxGroup">
            <div className="box">
              <h3>Alterar Trade Link</h3>
              <label>
                Trade Link Atual:
                <input  disabled={true} name="tradeLink" id="2" value={userData.tradeLink} onChange={e => handleChange(e)} />
              </label>
              <label>
                Novo Trade Link:
                <input  name="newTradeLink" id="3" value={userData.newTradeLink}  onChange={e => handleChange(e)}/>
              </label>
              <button onClick={() => updateUser("newTradeLink")}>Enviar código</button>
            </div>
            <div className="box">
              <h3>Alterar telefone</h3>
              <label>
                Número de celular antigo:
                <input type="text" disabled={true} name="phoneNumber" id="" value={userData.phoneNumber} onChange={(e=> handleChange(e))}/>
              </label>
              <label>
                Novo número:
                <input type="text" name="newPhoneNumber" id="" value={userData.newPhoneNumber} onChange={(e=> handleChange(e))} />
              </label>
              <button onClick={() => updateUser("phoneNumber")}>Alterar</button>
            </div>
            <div className="box">
              <h3>Alterar senha</h3>
              <label>
                Senha antiga:
                <input type="password" name="oldPassword" id="1" value={userData.oldPassword} onChange={(e=> handleChange(e))} />
              </label>
              <label>
                Nova senha:
                <input type="password" name="newPassword" id="" value={userData.newPassword} onChange={(e=> handleChange(e))} />
              </label>
              <button onClick={() => updateUser("password")}>Enviar código</button>
            </div>
            <div className="box">
              <h3><span className="highlight">Deletar</span> minha conta</h3>
              <p>
                Esta operação é <span className="highlight">irreversível</span>. Por favor, certifique-se de que deseja prosseguir antes de confirmar.<br /><br />
                Para sua segurança, haverá <span className="highlight">etapas de confirmação</span>.<br /><br />
                A equipe do Lokinho não se <span className="highlight">responsabilizará</span> por arrependimentos ou mudanças de opinião após a confirmação.
              </p>
              <button>Deletar conta</button>
            </div>
          </div>
        </div>
      </div>

      <div className="configBackground" onClick={() => setShowSettings(false)}></div>
    </div>
  );
}
 
export default Settings;