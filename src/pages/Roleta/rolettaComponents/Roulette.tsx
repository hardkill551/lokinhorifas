import style from '../roletta.module.css';
import RouletteArray from './RouletteArray';
import Image from 'next/image';
import triangle from '../../../assets/pintriangle.svg';

const Roulette = () => {
  return (
    <div className={style.Roulette}>
      <div className={style.RouletteBox}>
        <RouletteArray />
      </div>
      <div className={style.pin}>
        <Image src={triangle} alt='Pino da roleta' />
      </div>
      <div className={style.background}>
        <div className={style.shadeLeft}></div>
        <div className={style.shadeRight}></div>
      </div>
    </div>
  );
}

export default Roulette;