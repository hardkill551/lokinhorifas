import { useUserStateContext } from "contexts/UserContext";
import { UserInfoType } from "utils/interfaces";

const RafflePayment = () => {

  const { userInfo } = useUserStateContext() as { userInfo: UserInfoType }

  return (
    <div className="rafflePayment">
      <div className="sessionInfo">
        <h2>Pagamento</h2>
        <p>Confira os dados e confirme a compra para prosseguir</p>
      </div>
    </div>
  );
}
 
export default RafflePayment;