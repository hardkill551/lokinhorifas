import Image from "next/image";
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import { ChangeEvent, Dispatch, useEffect, useState } from "react";

const RaffleCartItem = ({props}: {props: { 
  item: {
    id: number,
    skins: string[],
    value: number,
    quantity: number
  },
  handleChangeQuantity: Function} }) => {
  // Aqui devem ser recebidos:
  // todas as skins das armas
  // a rifa em q estão presentes
  // O valor da rifa

  const { id, quantity, skins, value } = props.item
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
      <div className="raffleBanner">
        <div className="imageGroup">
          <div className="imageBox">
            <Image src={defaultGunPic} width={95} alt="banner com skin"/>
          </div>
          <div className="imageBox">
            <Image src={defaultGunPic} width={95} alt="banner com skin"/>
          </div>
          <div className="imageBox">
            <Image src={defaultGunPic} width={95} alt="banner com skin"/>
          </div>
          <div className="imageBox">
            <Image src={defaultGunPic} width={95} alt="banner com skin"/>
          </div>
          <div className="imageBox">
            <Image src={defaultGunPic} width={95} alt="banner com skin"/>
          </div>
          <div className="imageBox">
            <Image src={defaultGunPic} width={95} alt="banner com skin"/>
          </div>
          <div className="imageBox">
            <Image src={defaultGunPic} width={95} alt="banner com skin"/>
          </div>
        </div>
        <div className="glowGroup">
          <div className="glow-1"></div>
          <div className="glow-2"></div>
        </div>
      </div>

      <div className="raffleMetaData">
        <div className="raffleTitleContent">
          <h3>Rifa 6x Neon lights!</h3>
          <p>6x Neon lights</p>
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