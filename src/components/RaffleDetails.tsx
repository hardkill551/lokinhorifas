import Image from 'next/image';
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import { Dispatch } from 'react';

const RaffleDetails = ({moreDetails}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>} }) => {
  const { setDetailsVisible } = moreDetails

  const handleSelection = () => {

    setDetailsVisible(false)
  }
  return (
    <div className="details">
      <div className="detailsWrapper">
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
        <div className="contentGroup">
          <h2>Rifa 6x Neon lights!</h2>
            <p>Valor total dos prêmios de R$ 1000,00!</p>
          <div className="included">
            <h3>Nesta rifa são incluídos:</h3>
            
            <p>Números individuais para os seguintes itens</p>

            <ul>
              <li>6x Neon Light</li>
            </ul>
          </div>


          <button onClick={() => handleSelection()}>Adicionar</button>
        </div>
      </div>
      <div onClick={() => setDetailsVisible(false)} className="background"></div>
    </div>
  );
}
 
export default RaffleDetails;