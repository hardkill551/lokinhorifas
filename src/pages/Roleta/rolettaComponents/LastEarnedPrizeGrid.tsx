import LastEarnedPrizes from './LastEarnedPrize';
import style from '../roletta.module.css'
import Image from 'next/image';

import GIFTIcon from '../../../assets/gift.svg'

import PRIZESBACKGROUND from '../../../images/Roleta/Prizes/PRIZESBACKGROUND.png'

const LastEarnedPrizeGrid = () => {

  //! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!

  const items = [
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      itemImageUrl: '',
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
  ]

  return (
    <section className={style.LastPrizes}>
      <div className={style.LastPrizesWrapper}>
        <div className={style.title}>
          <Image src={GIFTIcon} alt='Icone de prêmios'/>
          <h2>Últimos Prêmios</h2>
        </div>
        <div className={style.EarnedPrizesGrid}>
            {items.map((item, index) => {
              if(index < 8) return <LastEarnedPrizes key={index} props={item}/>
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