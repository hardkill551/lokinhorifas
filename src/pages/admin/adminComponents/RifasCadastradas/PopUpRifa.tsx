import { useEffect, useState } from "react";
import style from "./RifasCadastradas.module.css";
import axios from "axios";
import PopUpUpdateRifa from "./PopUpUpdateRifa";

export default function PopUpRifa({setPopUpRifaRifa, id}:any) {
    const [popUpUpdateRaffle, setPopUpUpdateRaffle] = useState(false)

    function ActiveRaflle(){
        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/raffle/active?id=${id}`,{}, 
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)})
    }

    function DeleteRifa(){
        axios.delete(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/raffle/${id}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)})
    }

    return (
        <div className={style.ContainerPopUpRifa}>
            {popUpUpdateRaffle && <PopUpUpdateRifa setPopUpUpdateRaffle={setPopUpUpdateRaffle}/>}
            <div className={style.ContentPopUpRifa}>
                <div className={style.ButtonExitUpdate}>
                    <button onClick={() => setPopUpRifaRifa(false)} className={style.ButtonExitUpdateStyle}>x</button>
                </div>
                <div>
                    <p className={style.TitleDescriptionPopUpRifa}>Quantidade de Participantes: <span>3</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Limite de Participantes: <span>20</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Estado: <span className={style.EstateRaffle}>Em analise</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Valor Total: <span>R$:500</span> </p>
                   <p className={style.TitleDescriptionPopUpRifa}>Limite de valor por rifa: <span>R$:50</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Criado em: <span>12/08/2024</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Modificada em: <span>12/09/2024</span></p>
                </div>
                <div>
                    <button className={style.ButtonPopUpRifa} onClick={()=> ActiveRaflle()}>Ativar Rifa</button>
                   <button className={style.ButtonPopUpRifa} onClick={()=> DeleteRifa()}>Deletar Rifa</button>
                   <button className={style.ButtonPopUpRifa} onClick={ ()=>setPopUpUpdateRaffle(true) }>Atualizar Rifa</button>
                </div>
            </div>
        </div>
    );
}

