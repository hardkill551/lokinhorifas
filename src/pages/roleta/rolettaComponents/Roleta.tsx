import Image from 'next/image';
import style from '../roletta.module.css';
import RewardList from './RewardList';
import Roulette from './Roulette';

import HEROBACK from '../../../images/Roleta/Hero/HEROBACKGROUND.png';
import LINES from '../../../images/Roleta/Hero/Lines.png';
import { RouletteContext } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';


const Hero = () => {
  const { 
    manageWinner, 
    manageMockWinner, 
    isButtonActive, 
    participants = [], 
    rewards = [] 
  } = useRouletteContext() as RouletteContext

  return (
    <section className={style.Roleta}>
      <div className={style.RoletaWrapper}>
        <div className={style.HeroFrontImage}>
        </div>
        <RewardList />
        <Roulette />

        <div className={style.ButtonGroup}>
          <button disabled={isButtonActive || participants.length === 0} onClick={() => manageMockWinner()} >Giro Teste</button>
          <button disabled={isButtonActive || rewards.length === 0 || participants.length === 0} onClick={() => manageWinner()} >Girar Roleta</button>
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
