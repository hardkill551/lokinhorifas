import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import checkMark from '../assets/checkmark.svg'
import Image from "next/image";
import { Dispatch, useState } from 'react';

const RaffleCard = ({moreDetails}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>} }) => {

  const { setDetailsVisible } = moreDetails
  const [ isSelected, setIsSelected ] = useState(false)

  return (
    <div className="card" onClick={() => setDetailsVisible(true)}>
      <div className="imageGroup">
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
        <div className="imageBox">
          <Image src={defaultGunPic} width={150} alt="banner com skin"/>
        </div>
      </div>

      {isSelected && <div className="selectCheck">
        <Image src={checkMark} alt='check'/>
      </div>}

      <div className="glowGroup">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
      </div>

      <h3>Rifa 6x Neon lights!</h3>
    </div>
  );
}
 
export default RaffleCard;