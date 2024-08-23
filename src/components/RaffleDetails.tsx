import Image from 'next/image';
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import { Dispatch } from 'react';
import { raffleItem } from 'utils/interfaces';

const RaffleDetails = ({moreDetails}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>, rafflesData: raffleItem, toggleSelection: Function} }) => {
  const { setDetailsVisible, rafflesData, toggleSelection } = moreDetails

  const handleSelection = () => {
    toggleSelection(rafflesData.id)
    setDetailsVisible(false)
  }

  return (
    <div className="details">
      <div className="detailsWrapper">
        <div className="contentGroup">
          <h2>Rifa {rafflesData.name}</h2>
            <p>Valor unitário da rifa: R$ {rafflesData.value.toFixed(2).toString().replace('.', ',')}!</p>
          <div className="included">
            <h3>Nesta rifa são incluídos:</h3>

            <ul>
              {rafflesData && rafflesData.skins.map((skin, index) => <li key={index}>{skin}</li>)}
            </ul>
          </div>


          <button onClick={() => handleSelection()}>{rafflesData.isSelected ? "Remover" : "Adicionar"}</button>
        </div>
      </div>
      <div onClick={() => setDetailsVisible(false)} className="background"></div>
    </div>
  );
}
 
export default RaffleDetails;