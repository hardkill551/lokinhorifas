import LastEarnedPrizes from './LastEarnedPrize';
import style from '../roletta.module.css';
import Image from 'next/image';
import GIFTIcon from '../../../assets/gift.svg';
import PRIZESBACKGROUND from '../../../images/Roleta/Prizes/PRIZESBACKGROUND.png';
import axios from 'axios';
import { useEffect } from 'react';
import { useLastEarnedState } from 'contexts/LastEarnedContext';
import { LastEarnFrontEndType } from 'utils/interfaces';

const LastEarnedPrizeGrid = () => {
  const { lastEarnedList, setNewLastEarnedList } = useLastEarnedState() as { lastEarnedList: LastEarnFrontEndType[], setNewLastEarnedList: Function };

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/winners", { params: { page: 1 } })
      .then((res: any) => { 
        console.log(res.data);
        setNewLastEarnedList(res.data);
      })
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <section className={style.LastPrizes}>
      <div className={style.LastPrizesWrapper}>
        <div className={style.title}>
          <Image src={GIFTIcon} alt='Icone de prêmios'/>
          <h2>Últimos Prêmios</h2>
        </div>
        <div className={style.EarnedPrizesGrid}>
          {lastEarnedList && lastEarnedList.map((item, index) => {
            if (index < 8) return <LastEarnedPrizes key={index} props={item} />;
          })}
        </div>
      </div>
      <div className={style.background}>
        <Image src={PRIZESBACKGROUND} alt="Fundo de tela"/>
      </div>
      <div className={style.glowGroup}>
        <div className={style.growGroupWrapper}>
          <div className={style?.["glow-0"]}></div>
        </div>
      </div>
    </section>
  );
}

export default LastEarnedPrizeGrid;
