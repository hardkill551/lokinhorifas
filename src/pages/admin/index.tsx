import style from './admin.module.css';
import ProfileInformations from './adminComponents/ProfileInformations';
import CardSkins from './adminComponents/CardSkins';
import { useState } from 'react';

export default function Admin() {
  const [skinTeste2, setSkinteste] = useState([
    { id: 1, name: "Red Line", type: "Awp", picture: "imagem", value: 100.00, },
    { id: 2, name: "assimov", type: "Ak", picture: "string", value: 1000.00 },
    { id: 3, name: "meca", type: "m4a4", picture: "string", value: 240.00 },
    { id: 4, name: "start", type: "gallil", picture: "string", value: 300.00 },
    { id: 5, name: "cortex", type: "usp", picture: "string", value: 10.00 },
    { id: 6, name: "cortex", type: "usp", picture: "string", value: 10.00 },
  ]);
  return (
    <div className={style.ContainerAdmin}>
      <div className={style.ContentAdmin}>
        <ProfileInformations />

      </div>
      <div className={style.ContainerCards}>
        {skinTeste2.map((data) => <CardSkins key={data.id} name={data.name} picture ={data.picture} type={data.type} value={data.value} />)}

      </div>

    </div>
  )

};