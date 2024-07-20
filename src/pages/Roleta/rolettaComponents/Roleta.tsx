import Image from 'next/image';
import style from '../roletta.module.css'
import RewardList from './RewardList';
import Roulette from './Roulette';

import HEROBACK from '../../../images/Roleta/Hero/HEROBACKGROUND.png'
import LINES from '../../../images/Roleta/Hero/Lines.png'
import { usePersonCardState } from 'contexts/PersonCardContext';
import { useRewardState } from 'contexts/RewardContext';
import { Participant, RewardItemType } from 'utils/interfaces';
import { useEffect } from 'react';

const Hero = () => {
  const { manageMockWinner, isButtonActive, manageWinner, participants } = usePersonCardState() as { manageMockWinner: Function, isButtonActive: boolean, manageWinner: Function, participants: Participant[] }
  
  const { rewards } = useRewardState() as { rewards:RewardItemType[] }

  // useEffect(() => {
  //   console.log(participants.filter(item => item.isWinner))
  // }, [participants])


  return (
  <section className={style.Roleta}>
    <div className={style.RoletaWrapper}>
      <div className={style.HeroFrontImage}>
      </div>
      <RewardList />
      <Roulette />

      <div className={style.ButtonGroup}>
        <button disabled={isButtonActive || participants.length == 0} onClick={() => manageMockWinner()} >Giro Teste</button>
        <button disabled={isButtonActive || rewards.length == 0 || participants.length == 0} onClick={() => manageWinner()} >Girar Roleta</button>
      </div>
    </div>

    <div className={style.background}>
      <Image src={HEROBACK} alt='Imagem de fundo'/>
    </div>
    <div className={style.glowGroup}>
      <div className={style.growGroupWrapper}>
        <div className={style?.["glow-0"]}></div>
      </div>
    </div>
    <Image src={LINES} alt='Imagem de fundo'/>
  </section>
  );
}
 
export default Hero;