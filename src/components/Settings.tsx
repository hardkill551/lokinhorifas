import Image from 'next/image';
import xmark from '../assets/xmark.svg'
import editPencil from '../assets/editPencil.svg'
import { UserSettingsType } from 'utils/interfaces';
import { useRef, useState } from 'react';

const Settings = ({ props }: { props: UserSettingsType }) => {
  const { profile, setShowSettings, image, setImage } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const [ Email, setEmail ] = useState({
    email: '',
    confirmEmail: ''
  })
  const [ Password, setPassword ] = useState({
    password: '',
    confirmPassword: ''
  })
  const [ Nickname, setNickname ] = useState({
    nickname: '',
    confirmNickname: ''
  })

  const changeProfilePic = () => {
    if(!inputRef.current) return
    
    inputRef.current.click()
  }
  
  const handleImageChange = () => {
    if(!inputRef.current) return
    if(!inputRef.current.files) return
    const file = inputRef.current.files[0]

    setImage(file)
    
    // caminho axios para alterar imagem de perfil
  }

  const handleEmailChange = () => {
    const { email, confirmEmail } = Email

    if(email != confirmEmail) return console.log('wrong')

    // Caminho Axios para alterar Email
  }

  const handlePasswordChange = () => {
    const { password, confirmPassword } = Password

    if(password != confirmPassword) return console.log('wrong')

    // Caminho Axios para alterar senha
  }

  const handleNicknameChange = () => {
    const { nickname, confirmNickname } = Nickname
    
    if(nickname != confirmNickname) return console.log('wrong')

      // Caminho Axios para alterar Apelido
  }

  return (
    <div className="config">
      <div className="configWrapper">
        <div className="configWrapperContent">
          <button onClick={() => setShowSettings(false)}><Image src={xmark} alt="Fechar menu"/></button>
          <h2>Configurações de usuário</h2>
          <div className="accountInfo">
            <div className="imageBox">
              <Image width={200} height={200} src={image ? URL.createObjectURL(image) : profile.picture} alt="Imagem de perfil"/>
              <button type="button" onClick={() => changeProfilePic()}>
                <Image width={18} height={18} src={editPencil} alt={'Editar foto de perfil'}/>
                <input type="file" onChange={() => handleImageChange()} name="profilePic" id="profilePic" ref={inputRef} />
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
              <h3>Alterar e-mail</h3>
              <label>
                Novo e-mail:
                <input type="email" name="" id="" value={Email.email} onChange={e => setEmail(oldValue => {return {...oldValue, email: e.target.value}})} />
              </label>
              <label>
                Confirmar novo e-mail:
                <input type="email" name="" id="" value={Email.confirmEmail}  onChange={e => setEmail(oldValue => {return {...oldValue, confirmEmail: e.target.value}})}/>
              </label>
              <button onClick={() => handleEmailChange()}>Enviar código</button>
            </div>
            <div className="box">
              <h3>Alterar apelido</h3>
              <label>
                Novo apelido:
                <input type="text" name="" id="" value={Nickname.nickname} onChange={e => setNickname(oldValue => {return {...oldValue, nickname: e.target.value}})}/>
              </label>
              <label>
                Confirmar novo apelido:
                <input type="text" name="" id="" value={Nickname.confirmNickname} onChange={e => setNickname(oldValue => {return {...oldValue, confirmNickname: e.target.value}})} />
              </label>
              <button onClick={() => handleNicknameChange()}>Alterar</button>
            </div>
            <div className="box">
              <h3>Alterar senha</h3>
              <label>
                Nova senha:
                <input type="password" name="" id="" value={Password.password} onChange={e => setPassword(oldValue => {return {...oldValue, password: e.target.value}})} />
              </label>
              <label>
                Confirmar nova senha:
                <input type="password" name="" id="" value={Password.confirmPassword} onChange={e => setPassword(oldValue => {return {...oldValue, confirmPassword: e.target.value}})} />
              </label>
              <button onClick={() => handlePasswordChange()}>Enviar código</button>
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