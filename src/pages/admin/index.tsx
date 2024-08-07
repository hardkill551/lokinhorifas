import style from './admin.module.css';
import ProfileInformations from './adminComponents/ProfileInformations';
import CardSkins from './adminComponents/CardSkins';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SkinType } from 'utils/interfaces';
import PopUpUpdateSkins from './adminComponents/PopUpUpdateSkins';

export default function Admin() {

  const [skinTeste2, setSkinteste] = useState<SkinType[]>([]);
  const[erroskins , setErrorSkins] = useState([]);
  const [popUpSkins, setPopUpSkins] = useState(false);
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
    const token = localStorage.getItem('token')
     setSkinteste(skinTeste2.filter(data => data.id !== id));
     axios.delete(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/skin/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
     .then(res=>{
      console.log("skin deletada")
     })
     .catch(err=>{
      console.log(err.response.data.message)
      console.log("skin não deletada")
     })
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
            setPopUpSkins={setPopUpSkins}
          />
        )}
      </div>
      {popUpSkins && <PopUpUpdateSkins setPopUpSkins={setPopUpSkins}/>}
    </div>
  )
};