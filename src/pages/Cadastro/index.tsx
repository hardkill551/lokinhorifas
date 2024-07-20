import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import cn from 'classnames'

import axios from "axios";

import style from './cadastro.module.css'

import SingUpBG from '../../images/Cadastro/CADASTROBG.png'
import Lines from '../../images/Cadastro/Lines.png'
import defaultProfilePic from '../../assets/defaultProfilePic.svg'
import editPencil from '../../assets/editPencil.svg'


const SignUp = () => {
  const { push } = useRouter()

  const [ formDataValue, setFormDataValue ] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    tradeLink: '',
    phoneNumber: '',
    name: '',
    profilePicture: null
  })
  
  const [ step, setStep ] = useState(3)
  const [ error, setError ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  
  const addStep = () => setStep(oldValue => oldValue += 1)
  const removeStep = () => setStep(oldValue => oldValue -= 1)
  
  const checkEmail = async () => {
    let tempBool = await axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/verify", { name: formDataValue.name, email: formDataValue.email }).then((res) => {
      if(step == 0) addStep()
        
        return true
      })
      .catch((error) => {
        console.log(error)
        if(error.response.data.name = "DuplicatedEmailError" && step == 0) return push(`./Login?email=${formDataValue.email}`)
          return false
      })
      
      return tempBool
  }
  
  const validateForm = async () => {
    const { name, email, password, confirmPassword, tradeLink, phoneNumber, profilePicture } = formDataValue
    
    if(step == 0) {
      if (!email || !name) {
        return setError("Todos os campos são obrigatórios!");
      }
      
      else if (name.length < 3) {
        return setError("O nome de usuário deve ter pelo menos 3 caracteres!");
      }
      
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        return setError("Por favor, insira um endereço de e-mail válido.");
      }
      
      return checkEmail()
    }
    
    else if(step == 1) {
      if (!email || !name || !password || !confirmPassword) {
        return setError("Todos os campos são obrigatórios!");
      }
      
      else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        return setError("Por favor, insira um endereço de e-mail válido.");
      }
      
      else if(await checkEmail() == false) {
        return setError("Este e-mail já está sendo usado.");
      }
      
      else if (name.length < 3) {
        return setError("O nome de usuário deve ter pelo menos 3 caracteres!");
      }
      
      else if (password !== confirmPassword) {
        return setError("As senhas não coincidem!");
      }
      else if (password.length < 6) {
        return setError("A senha tem que ter no minimo 6 caracteres");
      }
      
      addStep()
    }
    
    else if(step == 2) {
      if (!name || !email || !password || !confirmPassword || !tradeLink || !phoneNumber) {
        return setError("Todos os campos são obrigatórios!");
      }
      
      else if(await checkEmail() == false) {
        return setError("Este e-mail já está sendo usado.");
      }
      
      else if (!/^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=\w+$/.test(tradeLink)) {
        return setError("Por favor, insira um trade link da Steam válido.");
      }
    }
    
    else if(step == 3) {
      if (!name || !email || !password || !confirmPassword || !tradeLink || !phoneNumber) {
        return setError("Todos os campos são obrigatórios!");
      }
      
      else if(await checkEmail() == false) {
        return setError("Este e-mail já está sendo usado.");
      }
      
      if(profilePicture != null) {
        // console.log(profilePicture)
      }
    }
    
    
    return true
  }
  
  const sendForm = () => {
    setError('')
    if(!validateForm()) return
    
    // axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/", { name: formDataValue.name, email: formDataValue.email }).then((res) => addStep)
    // .catch((error) => setError(error.response.data.message))
  }
  
  const checkStep = () => {
    if(step == 2) return 'steps-3'
    else if(step == 3) return 'steps-4'
    
    return ''
  }
  
  const changeProfilePic = () => {
    if(!inputRef.current) return
    
    inputRef.current.click()
  }
  
  const handleImageChange = (e:any) => {
    const file = e.target.files[0]
    setFormDataValue(oldValue => {return {...oldValue, profilePicture: file}})
  }
  
  const twitchAuth = () => {
    const TWITCH_URL = "https://id.twitch.tv/oauth2/authorize"
    const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI
    
    if (CLIENT_ID && REDIRECT_URI) {
      const params = new URLSearchParams({
        response_type: 'code',
        scope: 'user:read:email',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI
      })
      const authURL = `${TWITCH_URL}?${params.toString()}`
      window.location.href = authURL
    }
  }
    
  // useEffect(() => {
  //   if(formDataValue.profilePicture == null) return
  //   console.log(formDataValue.profilePicture)
  // }, [formDataValue])
    
  // TODO Enviar cadastros novos para o back
  // TODO Salvar dados importantes no front usando userContext

  return (
    <>
      <div className={style.SignUp}>
        <div className={style.SignUpWrapper}>
          <div className={style.col1}></div>
          <div className={style.col2}>
            <form onSubmit={e => e.preventDefault()}>
              <h2>Seja bem-vindo!</h2>

              { error && <div className={style.errorBox}>{error}</div> }

              <div className={style.LinkGroup}>
                {step > 0 && <Link href={''} onClick={() => removeStep()}>&lt;- Voltar</Link>}
                <Link className={style.LastAnchor} href={''}>Já tem uma conta?</Link>
              </div>

              <div className={style.steps}>
                <div className={cn(style.stepsWrapper, style?.[checkStep()])}>
                  <div className={cn(style?.['step-1'], step == 1 ? style?.['step-2'] : '')}>
                    <div className={style.stepWrapper}>
                      <label>
                        E-mail:
                        <input type="email" onChange={e => setFormDataValue(oldValue => {return {...oldValue, email: String(e.target.value)}})} name="email" id="email" value={formDataValue.email} />
                      </label>
                      <label>
                        Apelido:
                        <input type="text" onChange={e => setFormDataValue(oldValue => {return {...oldValue, name: String(e.target.value)}})} value={formDataValue.name}/>
                      </label>
                      <label>
                        Senha:
                        <input type="password" onChange={e => setFormDataValue(oldValue => {return {...oldValue, password: String(e.target.value)}})} name="password" id="password" value={formDataValue.password} />
                      </label>
                      <label>
                        Confirmar Senha:
                        <input type="password" onChange={e => setFormDataValue(oldValue => {return {...oldValue, confirmPassword: String(e.target.value)}})} name="passwordConfirm" id="passwordConfirm" value={formDataValue.confirmPassword}/>
                      </label>
                    </div>
                  </div>
                  <div className={style?.["step-3"]}>
                    <div className={style.stepWrapper}>
                      <label>
                        Tradelink da Steam: ?
                        <input type="text" onChange={e => setFormDataValue(oldValue => {return {...oldValue, tradeLink: String(e.target.value)}})} value={formDataValue.tradeLink}/>
                      </label>
                      <label>
                        Celular:
                        <input type="tel" onChange={e => setFormDataValue(oldValue => {return {...oldValue, phoneNumber: String(e.target.value)}})} value={formDataValue.phoneNumber}/>
                      </label>
                    </div>
                  </div>
                  <div className={style?.["step-4"]}>
                    <div className={style.stepWrapper}>

                      <div className={style.ImageBox}>
                        <Image 
                        src={formDataValue.profilePicture != null ? URL.createObjectURL(formDataValue.profilePicture) : defaultProfilePic} 
                        alt="Definir imagem de perfil"
                        width={300}
                        height={300}
                        />
                        <button type="button" onClick={() => changeProfilePic()}>
                          <Image src={editPencil} alt={'Editar foto de perfil'}/>
                          <input type="file" onChange={e => handleImageChange(e)} name="profilePic" id="profilePic" ref={inputRef} />
                        </button>
                      </div>

                      {step == 3 && <label className={style.checkboxLabel}>
                        <input type="checkbox" name="tos" id="tos" required/>
                        <p>Declaro que li e aceito os <Link href={'/'}>termos de serviço</Link></p>
                      </label>}

                      {step == 3 && <label className={style.checkboxLabel}>
                        <input type="checkbox" name="privacy" id="privacy" required/>
                        <p>Declaro que li e aceito os <Link href={'/'}>termos de privacidade</Link></p>
                      </label>}
                    </div>
                  </div>
                </div>
              </div>




              <button onClick={() => sendForm()}>{step > 2 ? 'Enviar' : 'Próximo'}</button>

              <hr />

              <button className={style.TwitchButton} onClick={() => twitchAuth()}>Entrar com Twitch</button>
            </form>
          </div>
        </div>

        <div className={style.background}>
          <Image className={style?.['background-0']} src={SingUpBG} alt="Imagem de fundo"/>
          <Image className={style?.['background-1']} src={Lines} alt="Linhas de fundo"/>
        </div>
        <div className={style.glowGroup}>
          <div className={style?.["glow-0"]}>
            <div className={style?.["glow-1"]}></div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default SignUp;