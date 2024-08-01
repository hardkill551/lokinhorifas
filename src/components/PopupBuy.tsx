import { useEffect, useState } from "react";
import RaffleNumber from "./RaffleNumber";
import { RaffleNumberType, UserInfoType } from "utils/interfaces";
import { useUserStateContext } from "contexts/UserContext";
import Link from "next/link";

import ThanksShield from '../assets/checkmark.shield.svg'
import Image from "next/image";

const PopupBuy = ({ props }: { props: {isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>} }) => {

  const { isVisible, setIsVisible } = props
  const [ numbers, setNumbers ] = useState<RaffleNumberType[]>([])
  const [ raffleCost, setRaffleCost ] = useState<number>(100)
  const [ saldo, setSaldo ] = useState<number>(645)
  const [ step, setStep ] = useState(0)

  const addStep = () => {
    setStep(oldValue => oldValue += 1)
  }

  const removeStep = () => {
    setStep(oldValue => oldValue -= 1)
  }

  const formatarDataHoraAtual = () => {
    const agora = new Date(Date.now())

    const dia = String(agora.getDate()).padStart(2, '0')
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0')
    const minutos = String(agora.getMinutes()).padStart(2, '0')

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`
}

  const { userInfo } = useUserStateContext() as { userInfo: UserInfoType }

  // useEffect(() => {
  //   console.log(numbers.filter(item => !item.isSelected))
  // }, [numbers])

  useEffect(() => {
    const tempArray = []

    const AvailableNumbers = 20

    const shownNumbers = AvailableNumbers + 1 > 101 ? AvailableNumbers : 101
  
    for(let i = 1; i < shownNumbers; i++) {
      if(i <= AvailableNumbers) {
        const tempObject = {
          key: i,
          number: i,
          isSelected: false,
          isAvailable: Math.floor(Math.random() * 2) == 0 ? true : false
        }
        tempArray.push(tempObject)
      } else {
        const tempObject = {
          key: i,
          number: 0,
          isSelected: false,
          isAvailable: false
        }
        tempArray.push(tempObject)
      }
    }
    setNumbers(tempArray)
  }, [])


  const toggleSelectNumber = (number: number) => {
    const isSelected = numbers.filter(item => item.number == number)[0].isSelected
    const isAvailable = numbers.filter(item => item.number == number)[0].isAvailable

    const unselectedArray = numbers.filter(item => item.number != number)

    // console.log(isSelected ? true : false)

    let tempObject = numbers.filter(item => item.number == number)[0]
    
    if(isSelected) {
      if(isAvailable) tempObject = {...tempObject, isSelected: false}
    } else {
      if(isAvailable) tempObject = {...tempObject, isSelected: true}
    }

    unselectedArray.push(tempObject)

    setNumbers(sortObjectsWithZerosAtEnd(unselectedArray))
  }

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

  const proceedNextStep = () => {
    if(numbers.filter(item => item.isSelected).length < 1) return

    if(step != 2) return addStep()

    setIsVisible(false)
  }

  const value = {
    toggleSelectNumber
  }

  return (
    <section className={`PopupBuy ${isVisible ? '' : 'not-show'}`}>
      <div className="PopupBuyWrapper">
        <h2>Compre seus pontos</h2>
        <h3>Selecione seus números</h3>
        <div className="PopupBuyContent">
          <div className={`PopupBuyContentWrapper ${checkStep()}`}>
            <div className="RaffleNumbers">
              <div className="NumberGroupWrapper">
                {numbers.map(number => <RaffleNumber key={number.key} props={{data: number, value}}/>)}
              </div>
            
          </div>
          <div className="PopupBuyRequest">
            <div className="header">
              <h2>Pagamento</h2>
              <p>Confira os dados e confirme a compra para prosseguir</p>
            </div>

            {false && <div className="error">
              <p>Motivo</p>

              <button>Comprar mais saldo</button>
            </div>}

            <div className="SaldoDiff">
              <div className="col1">
                <h4>Saldo:</h4>
                <div className="saldo">
                  R$ 645,00
                </div>
              </div>
              <div className="col2">
                --&gt;
              </div>
              <div className="col3">
                <h4>Saldo Resultante:</h4>
                <div className="saldo">
                  R$ {saldo - raffleCost * numbers.filter(item => item.isSelected).length},00
                </div>
              </div>
            </div>

            <div className="ProdutosTable">
              <h3>Produto x quantidade</h3>
              <div className="spacer"></div>
              <h3>Custo</h3>
              <p>Números x {numbers.filter(item => item.isSelected).length}</p>
              <div className="spacer"></div>
              <p>R$ {raffleCost * numbers.filter(item => item.isSelected).length},00</p>
            </div>

            <div className="ContaDetails">
              <h4>Conta:</h4>
              <p>{userInfo.email} - {userInfo.name} <br /> {userInfo.phoneNumber}</p>

              <div className="spacer"></div>

              <h4>Data da Compra:</h4>
              <p>{formatarDataHoraAtual()}</p>
            </div>
          </div>
          <div className="PopupThanksScreen">
            <Image src={ThanksShield} width={256} height={309} alt="Agradecimento pela compra"/>
            <h2>Obrigado</h2>
            <p>Caso tenha alguma dúvida, entrar em contato no grupo</p>
          </div>
          </div>
          <div className="bottomSection">
            {step == 1 && <Link href={""} onClick={() => removeStep()}>
              &lt;- Voltar
            </Link>}
            <button disabled={step == 1 && saldo < raffleCost * numbers.filter(item => item.isSelected).length ? true : false} onClick={() => proceedNextStep()} className={step == 1 ? 'step-2' : step == 2 ? 'step-3' : ''}>{step == 2 ? 'Continuar' : `Confirmar ${step == 0 ? 'Números' : 'Compra' }!`}</button>
          </div>
        </div>
        <div onClick={() => setIsVisible(false)} className="background"></div>
      </div>
    </section>
  );
}
 
export default PopupBuy;