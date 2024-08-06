import style from './admin.module.css';
import ProfileInformations from './adminComponents/ProfileInformations';
import CardSkins from './adminComponents/CardSkins';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SkinType } from 'utils/interfaces';

export default function Admin() {

  const [skinTeste2, setSkinteste] = useState<SkinType[]>([]);
  const[erroskins , setErrorSkins] = useState([]);

  useEffect(() => {
    const promise = axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/skin");
    promise.then((res) => {
       setSkinteste(res.data)
    })
    promise.catch((err) => {
      setErrorSkins(err.reponse.data)
      console.log(err.reponse.data)
    })

  }, []);

  function handleDeleteCard(id: number) {
     setSkinteste(skinTeste2.filter(data => data.id !== id));
  }

  return (
    <div className={style.ContainerAdmin}>
      <div className={style.ContentAdmin}>
        <ProfileInformations />

      </div>
      <div className={style.ContainerCards}>
        {skinTeste2.map((data) =>
          <CardSkins
            key={data.id}
            id={data.id}
            name={data.name}
            value={data.value}
            type={data.type}
            picture={data.picture}
            onDelete={handleDeleteCard}
          />
        )}
      </div>
      
    </div>
  )
};