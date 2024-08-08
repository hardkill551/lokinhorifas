import { Dispatch } from "react";
import RaffleCard from "./RaffleCard";

const RaffleSelect = ({moreDetails}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>} }) => {

  const { setDetailsVisible } = moreDetails
  
  return (
    <div className="raffleSelect">
    <div className="sessionInfo">
      <h2>Compra de Rifa</h2>
      <p>Selecione quais rifas gostaria de participar</p>
    </div>
    <div className="cardGroup">
      <div className="cardGroupWrapper">
        <RaffleCard moreDetails={{setDetailsVisible}} />
      </div>
    </div>
  </div>
  );
}
 
export default RaffleSelect;