import style from '../roletta.module.css';
import RouletteArray from './RouletteArray';
import Image from 'next/image';
import triangle from '../../../assets/pintriangle.svg';
import { RouletteContext, UserInfoType } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';
import EmptyRoulette from './EmptyRoulette';
import { useUserStateContext } from 'contexts/UserContext';

const Roulette = () => {
  const { availableRaffles, selectRaffle, participants = [] } = useRouletteContext() as RouletteContext

  const { userInfo } = useUserStateContext() as { userInfo: UserInfoType }

  return (
    <div className={style.Roulette}>
      <div className={style.RouletteBox}>
        {participants.length > 0 ? <RouletteArray /> : <EmptyRoulette />}
      </div>
      <div className={style.pin}>
        <Image src={triangle} alt='Pino da roleta' />
      </div>

      {userInfo.isAdmin && <select className={style.raffleSelector} onChange={(e) => selectRaffle(Number(e.target.value))}>
        {availableRaffles.map(raffle => <option key={raffle.id} value={raffle.id}>{raffle.name}</option>)}
      </select>}
      
      <div className={style.background}>
        <div className={style.shadeLeft}></div>
        <div className={style.shadeRight}></div>
      </div>
    </div>
  );
}

export default Roulette;
