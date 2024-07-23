import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"

import { useUserStateContext } from "contexts/UserContext"
import UserContextType  from '../../utils/interfaces'
import style from './login.module.css'

import SingUpBG from '../../images/Cadastro/CADASTROBG.png'
import Lines from '../../images/Cadastro/Lines.png'
import Image from "next/image"

const Login = () => {
  const { setUserInfo } = useUserStateContext() as UserContextType
  const { query, push } = useRouter()
  const { email } = query
  const [ token, setToken ] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const value = localStorage.getItem('token');

      if(!value) return
      setToken(value);

      if(token) push('/')
      else localStorage.setItem('token', '')
    }
  }, []);

  
  const [ formDataValue, setFormDataValue ] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if(!email) return
  
      setFormDataValue(oldValue => {return {...oldValue, email: String(email)}})
  }, [email])

  const [ error, setError ] = useState('')

  const validateLogIn = () => {
    setError('')
    const { email, password } = formDataValue

    if (!email || !password) {
      return setError("Todos os campos são obrigatórios!");
    }
    
    else if (password.length < 6) {
      return setError("A senha deve ter pelo menos 6 caracteres!");
    }
    
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      return setError("Por favor, insira um endereço de e-mail válido.");
    }

    // TODO conectar ao banco para verificar se o email existe
    // axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/", { name: formDataValue.password, email: formDataValue.email }).then((res) => console.log('ok'))
    // .catch((error) => setError(error.response.data.message))

  }

  return (
    <>
      <div className={style.LogIn}>
        <div className={style.LogInWrapper}>
          <div className={style.col1}></div>
          <div className={style.col2}>
            <form onSubmit={e => e.preventDefault()}>
              <h2>Seja bem-vindo!</h2>

              { error && <div className={style.errorBox}>{error}</div> }

              <label>
                E-mail:
                <input type="email" name="email" id="email" value={formDataValue.email} onChange={e => setFormDataValue(oldValue => {return {...oldValue, email: e.target.value}})} required/>
              </label>
              <label>
                Senha:
                <input type="password" name="password" id="password" value={formDataValue.password} onChange={e => setFormDataValue(oldValue => {return {...oldValue, password: e.target.value}})} required/>
              </label>
              <Link href={'/RecuperacaoDeSenha'}>Esqueceu a senha?</Link>

              <button type="button" onClick={() => validateLogIn()}>Entrar</button>
              <Link href={'/Cadastro'}>Não tem uma conta? Crie sua conta!</Link>
            </form>
          </div>
        </div>
        <div className={style.background}>
          <div className={style?.['background-0Wrapper']}>
            <Image className={style?.['background-0']} src={SingUpBG} alt="Imagem de fundo"/>
          </div>
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
 
export default Login;