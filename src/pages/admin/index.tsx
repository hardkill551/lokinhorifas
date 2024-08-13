import style from './admin.module.css';
import ProfileInformations from './adminComponents/ProfileInformations';
import CardSkins from './adminComponents/CardSkins';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SkinType } from 'utils/interfaces';
import { IoSearch } from "react-icons/io5";
import Raffle from './adminComponents/Raffle';
import ScreenUsers from './adminComponents/ScreenUsers';


export default function Admin() {
  const [skinTeste2, setSkinteste] = useState<SkinType[]>([]);
  const [erroskins, setErrorSkins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 
  useEffect(() => {
    loadSkins();
  }, []);

  const loadSkins = () => {
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/skin")
      .then((res) => {
        setSkinteste(res.data)
      })
      .catch((err) => {
        setErrorSkins(err.response.data)
      })
  };

  function handleDeleteCard(id: number) {
    const token = localStorage.getItem('token')
    setSkinteste(skinTeste2.filter(data => data.id !== id));
    axios.delete(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/skin/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log("skin deletada")
      })
      .catch(err => {
        console.log("skin não deletada")
      })
  }

  const filterUsers = skinTeste2.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={style.ContainerAdmin}>
      <div className={style.ContentAdmin}>
        <ProfileInformations reloadSkins={loadSkins}/>
      </div>
      <div className={style.inputNavBarContainer}>
        <IoSearch className={style.searchIconMember} />
        <input
          type='text'
          className={style.inputNavBarMember}
          placeholder="Pesquisar Pelo nome da Skin"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={style.ContainerCards}>
        {filterUsers.map((data) =>
          <CardSkins
            key={data.id}
            id={data.id}
            name={data.name}
            value={data.value}
            type={data.type}
            picture={data.picture}
            onDelete={handleDeleteCard}
            reloadSkins={loadSkins}
            
          />
        )}
      </div>
      <Raffle />
      <ScreenUsers/>
    </div>
  )
};
