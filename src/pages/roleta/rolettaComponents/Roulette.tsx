import style from '../roletta.module.css';
import RouletteArray from './RouletteArray';
import Image from 'next/image';
import triangle from '../../../assets/pintriangle.svg';
import { RouletteContext } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';
import EmptyRoulette from './EmptyRoulette';
import { useEffect } from 'react';

const Roulette = () => {
  const { availableRaffles = [], selectRaffle, participants = [], isButtonActive, rewards = [] } = useRouletteContext() as RouletteContext

  const tempArray = availableRaffles

  useEffect(() => {
    
    try {
      const activeItem = localStorage.getItem('activeItem')

      if(!activeItem) {
        localStorage.setItem('activeItem', '0')
        selectRaffle(availableRaffles[0].id)
      } else {
        selectRaffle(Number(activeItem))
        tempArray.sort((a, b) => {
          if (a.id === Number(activeItem)) return -1
          if (b.id === Number(activeItem)) return 1
          return 0
        })
      }
    } catch (err) {
      console.log(err)
    }
  }, [availableRaffles])

  return (
    <div className={style.Roulette}>
      <div className={style.RouletteBox}>
        {rewards.length > 0 && participants.length > 0 ? <RouletteArray /> : <EmptyRoulette />}
      </div>
      <div className={style.pin}>
        <Image src={triangle} alt='Pino da roleta' />
      </div>

      {tempArray.length > 0 && <select value={0} disabled={!isButtonActive} className={style.raffleSelector} onChange={(e) => selectRaffle(Number(e.target.value))}>
        {tempArray.map((raffle) => <option key={raffle.id} value={raffle.id}>{raffle.name}</option>)}
      </select>}
      
      <div className={style.background}>
        <div className={style.shadeLeft}></div>
        <div className={style.shadeRight}></div>
      </div>
    </div>
  );
}

export default Roulette;
