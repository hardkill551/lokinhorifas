import { useState } from "react";
import style from "./RifasCadastradas.module.css";
import CardRifas from "./CardRifas";

export default function RifasCadastradas(){
    const [rifascadastradas, setRifasCadastradas] = useState([
        {id: 1, name:"Rifa 1 aaaaaaaaaaaaaaaaaaaaaaaaaa", type:"Ativa"},
        {id: 2, name:"Rifa 2", type:"desativa"},
        {id: 3, name:"Rifa 3", type:"analise"},
        {id: 4, name:"Rifa 4", type:"analise"},
        {id: 6, name:"Rifa 2", type:"desativa"},
        {id: 7, name:"Rifa 3", type:"analise"},
        {id: 8, name:"Rifa 2", type:"desativa"},
        {id: 9, name:"Rifa 1", type:"Ativa"},
        {id: 10, name:"Rifa 4", type:"analise"},
        {id: 11, name:"Rifa 3", type:"analise"},
        {id: 12, name:"Rifa 4", type:"analise"},
    ])

    return(
        <div className={style.ContainerRifasCadastradas}>
        {rifascadastradas.map((rifa) =>
            <CardRifas key={rifa.id} id={rifa.id} name={rifa.name} type={rifa.type}/>
        )}
        </div>
    );
}