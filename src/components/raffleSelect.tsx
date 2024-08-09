import { Dispatch } from "react";
import RaffleCard from "./RaffleCard";
import { raffleItem } from "utils/interfaces";

const RaffleSelect = ({moreDetails}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>, setSelectedItems: Dispatch<React.SetStateAction<raffleItem[]>>, raffles: raffleItem[], setRaffleDetails: Dispatch<React.SetStateAction<number>>} }) => {

  const { setDetailsVisible, raffles, setRaffleDetails } = moreDetails
  
  return (
    <div className="raffleSelect">
    <div className="sessionInfo">
      <h2>Compra de Rifa</h2>
      <p>Selecione quais rifas gostaria de participar</p>
    </div>
    <div className="cardGroup">
      <div className="cardGroupWrapper">
        {raffles && raffles.map(raffle => <RaffleCard key={raffle.id} props={{raffle}} moreDetails={{setDetailsVisible, setRaffleDetails}} />)}
        {/* <RaffleCard moreDetails={{setDetailsVisible, setRaffleDetails}} /> */}
      </div>
    </div>
  </div>
  );
}
 
export default RaffleSelect;