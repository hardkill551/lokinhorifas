import { useEffect, useState } from "react";
import RaffleNumber from "./RaffleNumber";
import { raffleItem, UserInfoType } from "utils/interfaces";
import { useUserStateContext } from "contexts/UserContext";
import Link from "next/link";

import ThanksShield from '../assets/checkmark.shield.svg'
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import Image from "next/image";
import RaffleCard from "./RaffleCard";
import RaffleDetails from "./RaffleDetails";
import StepCounter from "./stepCounter";
import RaffleSelect from "./raffleSelect";
import RaffleSelectQuantity from "./raffleSelectQuantity";
import RafflePayment from "./RafflePayment";

const PopupBuy = ({ props }: { props: {isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>} }) => {

  const { isVisible, setIsVisible } = props
  const [ detailsVisible, setDetailsVisible ] = useState(false)
  const [ raffleDetails, setRaffleDetails ] = useState(0)
  const [ selectedItems, setSelectedItems ] = useState<raffleItem[]>([])
  const [ step, setStep ] = useState(1)
  const [ total, setTotal ] = useState(0)

  const addStep = () => {
    setStep(oldValue => oldValue += 1)
  }

  const removeStep = () => {
    setStep(oldValue => oldValue -= 1)
  }

  const raffles = [
    {
      id: 0,
      skins: [ 'neon light', 'neon light', 'neon light', 'neon light', 'neon light', 'neon light' ],
      value: Math.random() * 500,
      quantity: 1
    },
    {
      id: 1,
      skins: [ 'neon light', 'confirmed kill', 'onyx', 'flyer' ],
      value: Math.random() * 500,
      quantity: 1
    }
  ]

//   const formatarDataHoraAtual = () => {
//     const agora = new Date(Date.now())

//     const dia = String(agora.getDate()).padStart(2, '0')
//     const mes = String(agora.getMonth() + 1).padStart(2, '0')
//     const ano = agora.getFullYear();
//     const horas = String(agora.getHours()).padStart(2, '0')
//     const minutos = String(agora.getMinutes()).padStart(2, '0')

//     return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`
// }

  // const { userInfo } = useUserStateContext() as { userInfo: UserInfoType }


  // function sortObjectsWithZerosAtEnd(arr: RaffleNumberType[]) {
  //   let nonZeroObjects = arr.filter(obj => obj.number !== 0)
  //   let zeroObjects = arr.filter(obj => obj.number === 0)
    
  //   nonZeroObjects.sort((a, b) => a.number - b.number)
    
  //   arr.length = 0
  //   arr.push(...nonZeroObjects, ...zeroObjects)

  //   return arr
  // }

  const checkStep = () => {
    if(step == 2) return 'step-2'
    else if(step == 3) return 'step-3'
    else if(step == 4) return 'step-4'

    return 'step-1'
  }

  const handleButtonText = () => {
    if(checkStep() == 'step-1') return 'Confirmar seleções'
    else if(checkStep() == 'step-2') return 'Confirmar quantidades'
    else if(checkStep() == 'step-3') return 'Confirmar compra'
    else if(checkStep() == 'step-4') return 'Continuar'
  }

  return (
    <section className={`PopupBuy ${isVisible ? '' : 'not-show'}`}>
      <div className="PopupBuyWrapper">
        <StepCounter steps={{step}}/>

        <div className="PopupBuyContent">
          <div className={`PopupBuyContentWrapper ${checkStep()}`}>

            {/* Abaixo são as etapas para compra de rifa */}

            <RaffleSelect moreDetails={{setDetailsVisible, setSelectedItems, raffles, setRaffleDetails}} />

            {/* Raffle select é a primeira etapa, o usuário precisa ter pelo menos uma rifa selecionada para progredir */}

            <RaffleSelectQuantity setQuantity={{setTotal}}/>

            {/* Raffle select quantity é a segunda, aqui ele poderá adicionar mais números referentes as rifas selecionadas na etapa anterior */}

            <RafflePayment />

            {/* Raffle payment lidará com o pagamento através do saldo na conta, essa escolha foi feita pra evitar o possível assincronismo entre a pessoa ter ou não o valor em mãos, algo que à prontifica melhor */}

            {/* <RaffleConfirmation />> */}

            {/* Por último, a tela de confirmação, nela será apenas adiantado que o pagamento foi realizado com sucesso, e que agora ela terá acesso aos números que está participando na rifa */}

          </div>
          <div className="bottomSection">
            {(step > 1 && step < 4) && <div className="totalValue">
              <h3>Total: R$ {total.toFixed(2).toString().replace('.', ',')}</h3>
            </div>}
            {(step > 1 && step < 4) && <Link href={''} onClick={removeStep}>&lt;- Voltar</Link>}
            <button onClick={addStep} className={`${(step == 1 || step == 4) && 'center'}`}>{handleButtonText()}</button>
          </div>
        </div>

        <div onClick={() => setIsVisible(false)} className="background"></div>
        {detailsVisible && <RaffleDetails moreDetails={{setDetailsVisible, raffle: raffles[raffleDetails]}}/>}
      </div>
    </section>
  );
}
 
export default PopupBuy;