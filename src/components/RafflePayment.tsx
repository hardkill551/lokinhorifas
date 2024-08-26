import { useUserStateContext } from "contexts/UserContext";
import { raffleItem, rafflePayment, UserInfoType } from "utils/interfaces";
import Currency from '../assets/currency.svg'
import Image from "next/image";

const RafflePayment = ({props}: {props: {rafflesData: raffleItem[], setValueDiff: React.Dispatch<React.SetStateAction<number>>}}) => {

  const { userInfo } = useUserStateContext() as { userInfo: UserInfoType }

  const { rafflesData, setValueDiff } = props

  let value = 0
  let selectedItems: rafflePayment[] = []

  rafflesData.map(raffle => {
    if(raffle.isSelected) {
       value = value += (raffle.value * raffle.quantity)

      selectedItems.push({key: selectedItems.length, name: raffle.name, quantity: raffle.quantity, value: raffle.value})
    }
  })

  setValueDiff((userInfo.saldo - value) * -1)


  function formatDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year}, às ${hours}:${minutes}`;
  }

  return (
    <div className="rafflePayment">
      <div className="sessionInfo">
        <h2>Pagamento</h2>
        <p>Confira os dados e confirme a compra para prosseguir</p>
      </div>

      <div className="rafflePaymentWrapper">
        <div className="userPaymentData">
          <div className="value">
            <h3><Image height={24} src={Currency} alt="Imagem de uma moeda"/> <span>BRL</span></h3>
            <h2>R$ {value.toFixed(2).toString().replace('.', ',')}</h2>
          </div>
          <div className="userBudget">
            <h3>Saldo Atual: R$ {userInfo.saldo.toFixed(2).toString().replace('.', ',')} BRL</h3>
            <h3>Saldo Restante: R$ {(userInfo.saldo - value).toFixed(2).toString().replace('.', ',')} BRL</h3>
          </div>
        </div>
        <div className="itemTable">
          <div className="header">
            <h3>Produto x Quantidade</h3>
            <h3>Custo</h3>
          </div>
          {selectedItems && selectedItems.map(item =>
          <div className="item" key={item.key}>
            <h3><span className="name">{item.name}</span> <div className="quantity">x {item.quantity}</div></h3>
            <h3>R$ {(item.value * item.quantity).toFixed(2).toString().replace('.', ',')}</h3>
          </div>)}
        </div>
        <div className="purchaseDetails">
          <div className="account">
            <h3>Conta:</h3>
            <p>{userInfo.email || 'notloggedinindividual'}</p>
          </div>
          <div className="dateOfPurchase">
            <h3>Data da Compra:</h3>
            <p>{formatDate()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default RafflePayment;