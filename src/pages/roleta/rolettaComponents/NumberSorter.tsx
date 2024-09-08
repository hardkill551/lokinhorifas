import { useRouletteContext } from 'contexts/RouletteContext';
import style from '../roletta.module.css'
import { Participant, RouletteContext } from 'utils/interfaces';
import { useEffect, useState } from 'react';
import RouletteItem from './RouletteItem';

type SimplifiedParticipants = {
  name: string,
  number: string
}

const NumberSorter = () => {
  const { participants = [] } = useRouletteContext() as RouletteContext

  const [ cleanedParticipants, setCleanedParticipants ] = useState<SimplifiedParticipants[]>([])
  const [ focusedParticipant, setFocusedParticipant ] = useState<SimplifiedParticipants>({name: 'Carlos', number: '0'})

  const [ zeroAmount, setZeroAmount ] = useState(4)

  const handleRolling = () => {
    if(!cleanedParticipants) return
    if(cleanedParticipants.length == 0) return

    const interval = setInterval(() => {
      setFocusedParticipant(cleanedParticipants[Math.floor(Math.random() * (cleanedParticipants.length - 1))])
    }, 100);
    setTimeout(() => {
      clearInterval(interval)
      setFocusedParticipant(cleanedParticipants[cleanedParticipants.length - 1])
    }, 30000);
  }

  useEffect(() => {
    if(!participants) return
    if(participants.length == 0) return

    setZeroAmount(participants.reduce((max, current) => {
      if(max.number > current.number) return max
      else if(max.number < current.number) return current
      else return max
    }).number.toString().length)

    const simplifiedArray = participants.map(item => ({ name:item.personName, number: item.number.toString()}))

    setCleanedParticipants(simplifiedArray)
    setFocusedParticipant(simplifiedArray[Math.floor(Math.random() * simplifiedArray.length - 1)])
  }, [participants.length])

  // 3 Mostrar "card" com número vencedor

  // 4 Mostrar popup de vencedor

  // 5 Remover número vencedor
  

  return (
    <div className={style.NumberSorter}>
      <div className={style.NumberSorterWrapper}>
        <h2>{focusedParticipant.number.padStart(zeroAmount, '0')}</h2>
        <p>{focusedParticipant.name}</p>
        {participants[participants.length - 1] != undefined && <RouletteItem props={participants[participants.length - 1]}/>}
      </div>
      <button disabled={cleanedParticipants.length == 0} onClick={handleRolling}>Rodar</button>
    </div>
  );
}
 
export default NumberSorter;