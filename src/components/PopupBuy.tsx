import { useEffect, useState } from "react";
import RaffleNumber from "./RaffleNumber";
import { RaffleNumberType, UserInfoType } from "utils/interfaces";
import { useUserStateContext } from "contexts/UserContext";
import Link from "next/link";

import ThanksShield from '../assets/checkmark.shield.svg'
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import Image from "next/image";
import RaffleCard from "./RaffleCard";
import RaffleDetails from "./RaffleDetails";

const PopupBuy = ({ props }: { props: {isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>} }) => {

  const { isVisible, setIsVisible } = props
  const [ detailsVisible, setDetailsVisible ] = useState(false)
  const [ step, setStep ] = useState(0)

  const addStep = () => {
    setStep(oldValue => oldValue += 1)
  }

  const removeStep = () => {
    setStep(oldValue => oldValue -= 1)
  }

//   const formatarDataHoraAtual = () => {
//     const agora = new Date(Date.now())

//     const dia = String(agora.getDate()).padStart(2, '0')
//     const mes = String(agora.getMonth() + 1).padStart(2, '0')
//     const ano = agora.getFullYear();
//     const horas = String(agora.getHours()).padStart(2, '0')
//     const minutos = String(agora.getMinutes()).padStart(2, '0')

//     return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`
// }

  const { userInfo } = useUserStateContext() as { userInfo: UserInfoType }


  function sortObjectsWithZerosAtEnd(arr: RaffleNumberType[]) {
    let nonZeroObjects = arr.filter(obj => obj.number !== 0)
    let zeroObjects = arr.filter(obj => obj.number === 0)
    
    nonZeroObjects.sort((a, b) => a.number - b.number)
    
    arr.length = 0
    arr.push(...nonZeroObjects, ...zeroObjects)

    return arr
  }

  const checkStep = () => {
    if(step == 1) return 'step-2'
    else if(step == 2) return 'step-3'

    return 'step-1'
  }

  return (
    <section className={`PopupBuy ${isVisible ? '' : 'not-show'}`}>
      <div className="PopupBuyWrapper">
        <div className="stepCounter">
          <div className="step-1 selected">
            <div className="bar">
              <div className="ball">1</div>
            </div>
            <h3>Selecionar Rifas</h3>
          </div>
          <div className="step-2">
            <div className="bar">
            <div className="ball">2</div>
            </div>
            <h3>Selecionar Quantidade</h3>
          </div>
          <div className="step-3">
            <div className="bar">
            <div className="ball">3</div>
            </div>
            <h3>Pagamento</h3>
          </div>
        </div>

        <div className="PopupBuyContent">
          <div className="sessionInfo">
            <h2>Compra de Rifa</h2>
            <p>Selecione quais rifas gostaria de participar</p>
          </div>

          <div className="cardGroup">
            <RaffleCard moreDetails={{setDetailsVisible}} />
          </div>
        </div>
        <div onClick={() => setIsVisible(false)} className="background"></div>
        {detailsVisible && <RaffleDetails moreDetails={{setDetailsVisible}}/>}
      </div>
    </section>
  );
}
 
export default PopupBuy;