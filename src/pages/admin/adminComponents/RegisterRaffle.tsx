import { useState } from 'react';
import style from '../admin.module.css';
import CardSkinsCart from './CardSkinsCart';
import { RegisterRifa } from 'utils/interfaces';

const RegisterRaffle = () => {

  const [skinsCard, setSkinsCard] = useState<RegisterRifa[]>([
    {id:1, picture: "", name: "RedLine", value: 350},
    {id:2, picture: "", name: "Assimov", value: 250},
    {id:3, picture: "", name: "Fosforo", value: 3050},
    {id:4, picture: "", name: "Fosforo", value: 3050},
    {id:5, picture: "", name: "Fosforo", value: 3050},
    {id:6, picture: "", name: "Fosforo", value: 3050},
    {id:7, picture: "", name: "Fosforo", value: 3050},
  ]);

  return (
    <>
      <form className={style.CadastrarRifa}>
        <div className={style.RegisterRifa}>
          <h1 className={style.TitleRegisterRifa}>Cadastrar Rifas</h1>
          <div>
            <div className={style.DivInputRegisterRifa}>
              <label>Nome Da Rifa:</label>
              <input type='text' />
            </div>
            <div className={style.DivInputRegisterRifa}>
              <label>Quantidade de Numeros:</label>
              <input type='number' />
            </div>
          </div>

        </div>
        
        <div className={style.RegisterSkins}>
          <h1 className={style.TitleRegisterRifa}>Cadastre as skins</h1>
          <div className={style.ContainerCardSkinsCart}>
            {skinsCard.map((Skin) => (
              <CardSkinsCart key={Skin.id} id={Skin.id}name={Skin.name} value={Skin.value} picture={Skin.picture}/>
            ))}
          </div>
          <div className={style.ButtonPrice}>
            <p className={style.Price}>R$: 350</p>
            <button className={style.ButtonRigisterRifa} type='submit'>Cadastrar</button>
          </div>
        </div>

      </form>
    </>
  );
}

export default RegisterRaffle;
