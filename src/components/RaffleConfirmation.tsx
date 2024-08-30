import Image from 'next/image';
import checkMark from '../assets/checkmark.shield.svg'
import { useEffect } from 'react';
import { raffleItem } from 'utils/interfaces';

const RaffleConfirmation = ({props}: {props: {rafflesData: raffleItem[]}}) => {

  useEffect(()=>{
    console.log(props.rafflesData) 
  },[])
  return (
    <div className="raffleConfirmation">
      <Image src={checkMark} width={220} alt='confirmação'/>
      <h2>Obrigado!</h2>
      <p>Pagamento realizado com sucesso, em caso de dúvida, entrar em contato pelo grupo do Whatsapp.</p>
    </div>
  );
}
 
export default RaffleConfirmation;