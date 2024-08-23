import Image from "next/image";
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import shine from '../images/Roleta/WinnerPopup/shine.png'
import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { raffleItem } from "utils/interfaces";

const RaffleCartItem = ({props}: {props: { 
  item: raffleItem,
  handleChangeQuantity: Function} }) => {
  // Aqui devem ser recebidos:
  // a skin principal para capa
  // a rifa em q estão presentes
  // O valor da rifa

  const { id, quantity, value, name } = props.item
  const { handleChangeQuantity } = props

  const [ defaultValue, setDefaultValue ] = useState(quantity)

  useEffect(() => {
    handleChangeQuantity(id, defaultValue)
  }, [defaultValue])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDefaultValue(Number(e.target.value) == 0 ? 1 : Number(e.target.value))
  }

  return (
    <div className="cartItem">
      <div className="raffleBanner desktop">
        <div className="glowGroup">
          <div className="glow-1"></div>
          <div className="glow-2"></div>
        </div>
        <Image className="skin" src={defaultGunPic} alt="Skin principal"/>
        <Image className="shine" src={shine} alt="Brilho"/>
      </div>

      <div className="raffleMetaData">
        <div className="raffleTitleContent">
          <h3>Rifa {name}</h3>
          <p>{name}</p>
        </div>

        <div className="raffleQuantity">
          <label>
            <p>Qtd:</p> 
            <input min={1} onChange={e => handleInputChange(e)} type="number" name="quantidade"  value={defaultValue} required/>
          </label>

          <h3>x R$ {value.toFixed(2).toString().replace('.', ',')}</h3>
        </div>
      </div>

      
    </div>
  );
}
 
export default RaffleCartItem;