import Image from 'next/image';
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import { Dispatch } from 'react';
import { raffleItem } from 'utils/interfaces';

const RaffleDetails = ({moreDetails}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>, raffle: raffleItem} }) => {
  const { setDetailsVisible, raffle } = moreDetails

  const handleSelection = () => {
    setDetailsVisible(false)
  }

  const setRaffleName = () => {
    let temparray = raffle.skins

    raffle.skins.map(skin => temparray.filter(item => skin == item))

    return raffle.skins.join(', ')
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
          <h2>Rifa {setRaffleName()}</h2>
            <p>Valor unitário da rifa: R$ {raffle.value.toFixed(2).toString().replace('.', ',')}!</p>
          <div className="included">
            <h3>Nesta rifa são incluídos:</h3>

            <ul>
              {raffle && raffle.skins.map((skin, index) => <li key={index}>{skin}</li>)}
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