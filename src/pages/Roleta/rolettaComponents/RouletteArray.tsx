import { useEffect } from 'react';
import style from '../roletta.module.css'
import RouletteItem from './RouletteItem';
import axios from 'axios';
import { Participant } from 'utils/interfaces';
import { usePersonCardState } from 'contexts/PersonCardContext';

const RouletteArray = () => {
  const { participants, setNewParticipants } = usePersonCardState() as { participants: Participant[], setNewParticipants: Function }

  useEffect(() => {
    const winners = Array.from(document.querySelectorAll('#winner')) as HTMLElement[]

    if(winners.length <= 0) return

    console.log(winners[0].dataset.number)
  }, [participants])


  useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/roulette/participants", {}).then((res: any) => { 
          setNewParticipants(res.data)
        }).catch((err: any) => {
          console.error(err.response)
        })
      }, [])

  return (
    <div className={style.RouletteArray}>
      {participants && participants.map(item => <RouletteItem key={item.id} props={item}/>)}
    </div>
  );
}
 
export default RouletteArray;