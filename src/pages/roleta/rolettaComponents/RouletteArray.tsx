import { useEffect } from 'react';
import style from '../roletta.module.css';
import RouletteItem from './RouletteItem';
import { RouletteContext } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';

const RouletteArray = () => {
  const {
    raffle,
    participants = [], 
    loadFillerCards, 
    setWinner 
  } = useRouletteContext() as RouletteContext


  useEffect(() => {
    if(!raffle) return
    
    const winners = Array.from(document.querySelectorAll('#winner')) as HTMLElement[];
    if (winners.length <= 0) return;
    
    setWinner(winners[Math.floor(Math.random() * winners.length)]);
  }, [raffle]);

  return (
    <div className={style.RouletteArray} id='Roulette'>
      {loadFillerCards(-1)}
      {participants.map(item => <RouletteItem key={item.id + '' + item.number} props={item} />)}
      {loadFillerCards(1)}
    </div>
  );
}

export default RouletteArray;
