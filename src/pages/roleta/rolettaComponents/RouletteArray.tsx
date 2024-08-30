import { useEffect } from "react";
import style from "../roletta.module.css";
import RouletteItem from "./RouletteItem";
import { RouletteContext } from "utils/interfaces";
import { useRouletteContext } from "contexts/RouletteContext";
import { v4 as uuidv4 } from 'uuid';


const RouletteArray = () => {
  const {
    raffle,
    participants = [],
    fillerParticipants,
    setWinner,
  } = useRouletteContext() as RouletteContext;

  useEffect(() => {
    if (!raffle) return;

    setTimeout(() => {
      const winner = document.getElementById('winner')
      if(!winner) return
      
      console.log((Math.round(winner.getBoundingClientRect().right) -
        Math.round(winner.getBoundingClientRect().left)) /
        2 +
      Math.round(winner.getBoundingClientRect().left) -
      window.innerWidth / 2)
  
      setWinner(winner);
    }, 5000);

  }, [raffle]);

  // TODO!: Fix display of users showing wrong and random users

  return (
    <div className={style.RouletteArray} id="Roulette">
      {fillerParticipants && fillerParticipants.map((item) => (
        <RouletteItem key={uuidv4()} props={item} />
      ))}
      {participants &&
        participants.map((item) => (
          <RouletteItem key={uuidv4()} props={item} />
        ))}
        {fillerParticipants && fillerParticipants.map((item) => (
          <RouletteItem key={uuidv4()} props={item} />
        ))}
    </div>
  );
};

export default RouletteArray;
