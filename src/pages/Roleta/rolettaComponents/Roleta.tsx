import Image from 'next/image';
import style from '../roletta.module.css'
import RewardList from './RewardList';
import Roulette from './Roulette';

import HEROBACK from '../../../images/Roleta/Hero/HEROBACKGROUND.png'
import LINES from '../../../images/Roleta/Hero/Lines.png'

const Hero = () => {
  return (
  <section className={style.Roleta}>
    <div className={style.RoletaWrapper}>
      <div className={style.HeroFrontImage}>
      </div>
      <RewardList />
      <Roulette />

      <div className={style.ButtonGroup}>
        <button>Giro Teste</button>
        <button>Girar Roleta</button>
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