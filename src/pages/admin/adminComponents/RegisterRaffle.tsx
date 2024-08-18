import { useState } from 'react';
import style from '../admin.module.css';
import CardSkinsCart from './CardSkinsCart';

const RegisterRaffle = () => {

  const [skinsCard, setSkinsCard] = useState([
    {id:1, imagem: "", name: "RedLine", Valor: 350},
    {id:2, imagem: "", name: "Assimov", Valor: 250},
    {id:3, imagem: "", name: "Fosforo", Valor: 3050},
    {id:4, imagem: "", name: "Fosforo", Valor: 3050},
    {id:5, imagem: "", name: "Fosforo", Valor: 3050},
  ]);

  return (
    <>

      <form className={style.CadastrarRifa}>
        <div className={style.RegisterRifa}>
          <h1>Cadastrar Rifas</h1>
          <div>
            <div>
              <label>Nome Da Rifa:</label>
              <input type='text' />
            </div>
            <div>
              <label>Quantidade de Numeros:</label>
              <input type='number' />
            </div>

          </div>

        </div>
        
        <div className={style.RegisterSkins}>
          <h1 >Cadastre as skins</h1>
          <div className={style.ContainerCardSkinsCart}>
            {skinsCard.map((Skin) => (
              <CardSkinsCart key={Skin.id}  />
            ))}
          </div>
          <div>
            <p>R$: 350</p>
            <button>Cadastrar</button>
          </div>
        </div>

      </form>
    </>
  );
}

export default RegisterRaffle;
