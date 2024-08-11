import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import shine from '../images/Roleta/WinnerPopup/shine.png'
import checkMark from '../assets/checkmark.svg'
import Image from "next/image";
import { Dispatch } from 'react';
import { raffleItem } from 'utils/interfaces';

const RaffleCard = ({moreDetails, props}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>, setRaffleDetails: Dispatch<React.SetStateAction<number>>}, props: { raffle: raffleItem } }) => {

  const { setDetailsVisible, setRaffleDetails } = moreDetails
  const { raffle } = props

  const handleCardClick = () => {
    setDetailsVisible(true)
    setRaffleDetails(raffle.id)
  }

  return (
    <div className="card" onClick={() => handleCardClick()}>
      <Image className='skin' src={defaultGunPic} alt='Skin principal'/>
      <Image className='shine' src={shine} alt='Skin principal'/>

      {raffle.isSelected && <div className="selectCheck">
        <Image src={checkMark} alt='check'/>
      </div>}

      <div className="glowGroup">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
      </div>

      <h3>Rifa {raffle.name}</h3>
    </div>
  );
}
 
export default RaffleCard;