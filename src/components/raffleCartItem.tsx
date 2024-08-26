import Image from "next/image";
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import shine from '../images/Roleta/WinnerPopup/shine.png'
import { ChangeEvent, useEffect, useState } from "react";
import { raffleItem } from "utils/interfaces";

const RaffleCartItem = ({props}: {props: { 
  item: raffleItem,
  handleChangeQuantity: Function} }) => {

  const { id, quantity, value, name, maxQuantity, skins, bannerSkin, bundleValue } = props.item
  const { handleChangeQuantity } = props

  const [ defaultValue, setDefaultValue ] = useState(quantity)

  useEffect(() => {
    handleChangeQuantity(id, defaultValue)
  }, [defaultValue])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(maxQuantity < Number(e.target.value)) return
    setDefaultValue(Number(e.target.value) == 0 ? 1 : Number(e.target.value))
  }

  const newValue = value.toString().includes('.') ? `${value.toString().split('.')[0]},${value.toString().split('.')[1][0]}${value.toString().split('.')[1][1] ? value.toString().split('.')[1][1] : '0'}` : `${value.toString()},00`

  return (
    <div className="cartItem">
      <div className="raffleBanner desktop">
        <div className="glowGroup">
        <div className={`glow-1 ${bundleValue > 1000 ? 'Gold' : 'Silver'}`}></div>
        <div className={`glow-2 ${bundleValue > 1000 ? 'Gold' : 'Silver'}`}></div>
        </div>
        {typeof bannerSkin === 'string' ? 
        <Image className='skin' src={defaultGunPic} alt='Skin principal padrão'/> 
        : <Image className='skin' src={bannerSkin} alt='Skin principal'/>
        }
        <Image className="shine" src={shine} alt="Brilho"/>
      </div>

      <div className="raffleMetaData">
        <div className="raffleTitleContent">
          <h3>{name}</h3>
          <p>{skins.join(', ')}</p>
        </div>

        <div className="raffleQuantity">
          <label>
            <p>Qtd:</p> 
            <input min={1} onChange={e => handleInputChange(e)} type="number" name="quantidade"  value={defaultValue} required/>
          </label>

          <h3>x R$ {newValue}</h3>
        </div>
      </div>

      
    </div>
  );
}
 
export default RaffleCartItem;