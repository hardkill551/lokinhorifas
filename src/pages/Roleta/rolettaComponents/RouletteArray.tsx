import { useEffect } from 'react';
import style from '../roletta.module.css'
import RouletteItem from './RouletteItem';
import axios from 'axios';
import { usePersonCardState } from 'contexts/PersonCardContext';
import { Participant } from 'utils/interfaces';

const RouletteArray = () => {
  const { participants, setNewParticipants } = usePersonCardState() as { participants: Participant[], setNewParticipants: Function }

  useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/roulette/participants", {}).then((res: any) => { 
          setNewParticipants(res.data)
        }).catch((err: any) => {
          console.log(err.response)
        })
      }, [])

  return (
    <div className={style.RouletteArray}>
      {participants && participants.map(item => <RouletteItem key={item.id} props={item}/>)}
    </div>
  );
}
 
export default RouletteArray;