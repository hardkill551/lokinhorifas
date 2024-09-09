import Image from 'next/image';
import style from '../roletta.module.css';
import RewardList from './RewardList';

import HEROBACK from '../../../images/Roleta/Hero/HEROBACKGROUND.png';
import LINES from '../../../images/Roleta/Hero/Lines.png';
import { RouletteContext, UserContextType } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';
import { useUserStateContext } from 'contexts/UserContext';
import NumberSorter from './NumberSorter';
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react';


const Hero = () => {
  const { 
    manageWinner, 
    manageMockWinner, 
    isButtonActive, 
    participants = [], 
    rewards = [],
    availableRaffles = [],
    selectRaffle,
    isConfettiActive
  } = useRouletteContext() as RouletteContext

  const {
    userInfo
  } = useUserStateContext() as UserContextType

  const [ windowParams, setWindowParams ] = useState({width: 3840, height: 3840})

  const handleResize = (e: Event) => {
    const target = e.target as Window
    
    setWindowParams({
      width: target.innerWidth,
      height: target.innerHeight
    })
  }

  
  useEffect(() => {
    window.addEventListener('resize', e => handleResize(e))

    return () => {
      window.removeEventListener('resize', e => handleResize(e))
    }
  }, [])



  return (
    <section className={style.Roleta}>
      <div className={style.RoletaWrapper}>
        {isConfettiActive && <Confetti width={windowParams.width} height={windowParams.height}/>}
        <div className={style.HeroFrontImage}>
        </div>
        <RewardList />
        {/* <Roulette /> */}
        <NumberSorter />

        <div className={style.ButtonGroup}>
          <button disabled={!isButtonActive || participants.length === 0 || rewards.length === 0} onClick={() => manageMockWinner()} >Giro Teste</button>
          {availableRaffles.length > 0 && <select disabled={!isButtonActive} className={style.raffleSelector} onChange={(e) => selectRaffle(Number(e.target.value))}>
            {availableRaffles.filter(raffle => raffle.raffleSkins.length > 0).map((raffle) => <option key={raffle.id} value={raffle.id}>{raffle.name}</option>)}
          </select>}
          <button disabled={!isButtonActive || !userInfo.isAdmin || rewards.length === 0 || participants.length === 0} onClick={() => manageWinner()} >Girar Roleta</button>
        </div>
      </div>

      <div className={style.background}>
        <Image priority={false} src={HEROBACK} alt='Imagem de fundo'/>
      </div>
      <div className={style.glowGroup}>
        <div className={style.growGroupWrapper}>
          <div className={style?.["glow-0"]}></div>
        </div>
      </div>
      <Image src={LINES} priority={false} alt='Imagem de fundo'/>
    </section>
  );
}

export default Hero;
