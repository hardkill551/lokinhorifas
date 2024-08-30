import { useEffect, useState } from "react";
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
    getWinner,
    winnerProperties,
  } = useRouletteContext() as RouletteContext;

  useEffect(() => {
    if (!raffle) return;

    setTimeout(() => {
      const winner = document.getElementById('winner')
      if(!winner) return
  
      getWinner(winner)
    }, 400);

    // TODO!: Debug slower computers delay
  }, [raffle]);
  

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
