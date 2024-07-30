import { useEffect } from 'react';
import style from '../roletta.module.css';
import RouletteItem from './RouletteItem';
import { Participant } from 'utils/interfaces';
import { usePersonCardState } from 'contexts/PersonCardContext';

const RouletteArray = () => {
  const { participants = [], getNewParticipants, loadFillerCards, setWinner } = usePersonCardState() as { participants: Participant[], getNewParticipants: Function, loadFillerCards: Function, setWinner: Function };

  useEffect(() => {
    const winners = Array.from(document.querySelectorAll('#winner')) as HTMLElement[];
    if (winners.length <= 0) return;
    
    setWinner(winners[Math.floor(Math.random() * winners.length)]);
  }, [participants]);

  useEffect(() => {
    getNewParticipants();
  }, []);

  return (
    <div className={style.RouletteArray} id='Roulette'>
      {participants.length > 0 && loadFillerCards(-1)}
      {participants.length > 0 && participants.map(item => <RouletteItem key={item.id + '' + item.number} props={item} />)}
      {participants.length > 0 && loadFillerCards(1)}
    </div>
  );
}

export default RouletteArray;