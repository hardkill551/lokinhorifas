import style from '../roletta.module.css';
import cn from 'classnames';

import GOLDIcon from '../../../assets/GOLD.svg';
import SILVERIcon from '../../../assets/SILVER.svg';
//! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!
import defaultGunPic from '../../../images/Roleta/Prizes/defaultGunPic.png'
//! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!

import Image from 'next/image';
import { LastEarnedPrizeType } from 'utils/interfaces';

const LastEarnedPrizes = ({ props }: { props: LastEarnedPrizeType }) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const {
    itemImageUrl = "",
    TimeOfEarning = 'há pouco', // Default value for TimeOfEarning
    ChanceOfEarning = '0%', // Default value for ChanceOfEarning
    PoolType = 'Silver', // Default to 'Silver' if PoolType is not provided
    ItemName = 'Item Desconhecido', // Default item name
    ItemType = 'Tipo Desconhecido', // Default item type
    ItemValue = '0.00' // Default item value
  } = props;

  return (
    <div className={cn(style.EarnedPrizeItem, style?.[PoolType])}>
      <div className={style.EarnedPrizeItemWrapper}>
        <div className={style.ItemMetaInfo}>
          <p>Foi sorteado há<br />{TimeOfEarning}</p>
          <p>Chance<br />{ChanceOfEarning}</p>
        </div>
        <div className={style.ImageWrapperBox}>
          <Image src={itemImageUrl ? itemImageUrl : defaultGunPic} alt={`Imagem de ${ItemName}`} />
        </div>
        <div className={style.ItemDescription}>
          <div className={style.PrizePoolType}>
            <Image
              src={PoolType === 'Gold' ? GOLDIcon : SILVERIcon}
              alt={`Ícone da Rifa ${PoolType === 'Gold' ? 'Gold' : 'Silver'}`}
            />
            <h3>RIFA {PoolType}</h3>
          </div>
          <div className={style.ItemContent}>
            <h2>{ItemName}</h2>
            <p>{ItemType}</p>
          </div>
          <div className={style.ItemValue}>
            <h3>R$ {ItemValue}.00</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastEarnedPrizes;
