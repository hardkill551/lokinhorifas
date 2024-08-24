import { Dispatch, useEffect, useState } from "react";
import { raffleItem, UserInfoType } from "utils/interfaces"
import Link from "next/link";

import RaffleDetails from "./RaffleDetails";
import StepCounter from "./stepCounter";
import RaffleSelect from "./raffleSelect";
import RaffleSelectQuantity from "./raffleSelectQuantity";
import RafflePayment from "./RafflePayment";
import { useUserStateContext } from "contexts/UserContext";
import RaffleConfirmation from "./RaffleConfirmation";

const PopupBuy = ({ props }: { props: {isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>} }) => {

  
  const { isVisible, setIsVisible } = props
  const { userInfo, setUserInfo } = useUserStateContext() as { userInfo: UserInfoType, setUserInfo: Dispatch<React.SetStateAction<UserInfoType>>}
  const [ detailsVisible, setDetailsVisible ] = useState(false)
  const [ raffleDetails, setRaffleDetails ] = useState(0)
  const [ rafflesData, setRaffleData ] = useState<raffleItem[]>([])
  const [ step, setStep ] = useState(1)
  const [ total, setTotal ] = useState(0)

  const raffles = [
    {
      id: 0,
      skins: [ 'neon light', 'neon light', 'neon light', 'neon light', 'neon light', 'neon light' ],
      name: '',
      value: Math.random() * 500,
      quantity: 1,
      isSelected: false
    },
    {
      id: 1,
      skins: [ 'neon light', 'neon light', 'neon light', 'neon light', 'neon light', 'neon light' ],
      name: '',
      value: Math.random() * 500,
      quantity: 1,
      isSelected: false
    },
    {
      id: 2,
      skins: [ 'neon light', 'neon light', 'neon light', 'neon light', 'neon light', 'neon light' ],
      name: '',
      value: Math.random() * 500,
      quantity: 1,
      isSelected: false
    },
    {
      id: 3,
      skins: [ 'neon light', 'neon light', 'neon light', 'neon light', 'neon light', 'neon light' ],
      name: '',
      value: Math.random() * 500,
      quantity: 1,
      isSelected: false
    },
    {
      id: 4,
      skins: [ 'neon light', 'neon light', 'neon light', 'neon light', 'neon light', 'neon light' ],
      name: '',
      value: Math.random() * 500,
      quantity: 1,
      isSelected: false
    },
    {
      id: 5,
      skins: [ 'neon light', 'confirmed kill', 'onyx', 'flyer' ],
      name: '',
      value: Math.random() * 500,
      quantity: 1,
      isSelected: false
    }
  ]
  
  const handleBigNames = (raffles: raffleItem[]) => {
    let tempNamesArray: string[] = []

    let itemsTempArray: {name: string, quantity: number}[] = []

    const newRaffleData = raffles.map(raffle => {
      tempNamesArray = []
      itemsTempArray = []

      raffle.skins.map(raffle => {
        if(tempNamesArray.join('').includes(raffle)) {
          itemsTempArray.filter(item => item.name == raffle)[0].quantity++
        } else {
          tempNamesArray.push(raffle)
          itemsTempArray.push({name: raffle, quantity: 1})
        }
      })

      const finalArray: string[] = []
  
      itemsTempArray.map(item => finalArray.push(`${item.quantity > 1 ? item.quantity + 'x' : ''} ${item.name}${item.quantity > 1 ? 's' : ''}`))
  
      return {...raffle, name: finalArray.join(', ')}
    })

    return newRaffleData

  }

  useEffect(() => {
    setRaffleData(handleBigNames(raffles))
  }, [])

  const addStep = () => {
    setStep(oldValue => oldValue += 1)
  }

  const removeStep = () => {
    setStep(oldValue => oldValue -= 1)
  }

  const toggleSelection = (id:number) => {
    const newRaffles = rafflesData.map(raffle => {
      if(raffle.id == id) return {...raffle, isSelected: !raffle.isSelected}
      return raffle
    })

    setRaffleData(newRaffles)
  }

  const handleChangeQuantity = (id:number, newQuantity: number) => {
    const newRaffles = rafflesData.map(raffle => {
      if(raffle.id == id) return {...raffle, quantity: newQuantity}
      return raffle
    })

    setRaffleData(newRaffles)
  }

  const checkStep = () => {
    return `step-${step}`
  }

  const handleButtonText = () => {
    if(checkStep() == 'step-1') return 'Confirmar seleções'
    else if(checkStep() == 'step-2') return 'Confirmar quantidades'
    else if(checkStep() == 'step-3') return 'Confirmar compra'
    else if(checkStep() == 'step-4') return 'Continuar'
  }

  const handleStepValidation = () => {
    if(step < 3) addStep()
    else if(step == 4) {
      setIsVisible(false)
    }
    else {
      if(userInfo.saldo < total) {
        console.log('falha')
        // TODO!: Lançar um popup na interface para pedir pro usuário comprar mais créditos ou cancelar a compra
      }
      else {
        setUserInfo(oldValue => {return {...oldValue, saldo: oldValue.saldo -= total}})
        addStep()
        // TODO: Enviar para o back a transação
      }
    }
  }

  return (
    <section className={`PopupBuy ${isVisible ? '' : 'not-show'}`}>
      <div className="PopupBuyWrapper">
        <StepCounter steps={{step}}/>

        <div className="PopupBuyContent">
          <div className={`PopupBuyContentWrapper ${checkStep()}`}>

            {/* Abaixo são as etapas para compra de rifa */}

            <RaffleSelect moreDetails={{setDetailsVisible, rafflesData, setRaffleDetails}} />

            {/* Raffle select é a primeira etapa, o usuário precisa ter pelo menos uma rifa selecionada para progredir */}

            <RaffleSelectQuantity setQuantity={{setTotal, rafflesData, handleChangeQuantity}}/>

            {/* Raffle select quantity é a segunda, aqui ele poderá adicionar mais números referentes as rifas selecionadas na etapa anterior */}

            <RafflePayment props={{rafflesData}} />

            {/* Raffle payment lidará com o pagamento através do saldo na conta, essa escolha foi feita pra evitar o possível assincronismo entre a pessoa ter ou não o valor em mãos, algo que à prontifica melhor */}

            <RaffleConfirmation />

            {/* Por último, a tela de confirmação, nela será apenas adiantado que o pagamento foi realizado com sucesso, e que agora ela terá acesso aos números que está participando na rifa */}

          </div>
          <div className={step == 4 ? "bottomSection end" : "bottomSection"}>
            {(step > 1 && step < 3) && <div className="totalValue">
              <h3>Total: R$ {total.toFixed(2).toString().replace('.', ',')}</h3>
            </div>}
            {(step > 1 && step < 4) && <Link href={''} onClick={removeStep}>&lt;- Voltar</Link>}
            <button onClick={handleStepValidation} disabled={rafflesData.filter(raffle => raffle.isSelected).length == 0} className={`${(step == 1 || step == 4) && 'center'}`}>{handleButtonText()}</button>
          </div>
        </div>

        <div onClick={() => setIsVisible(false)} className="background"></div>
        {detailsVisible && <RaffleDetails moreDetails={{setDetailsVisible, rafflesData: rafflesData[raffleDetails], toggleSelection}}/>}
      </div>
    </section>
  );
}
 
export default PopupBuy;