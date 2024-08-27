import style from '../roletta.module.css';
import cn from 'classnames';

import GOLDIcon from '../../../assets/GOLD.svg';
import SILVERIcon from '../../../assets/SILVER.svg';

//! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!
import defaultGunPic from '../../../assets/defaultProfilePic.svg'
//! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!

import Image from 'next/image';
import { RewardItemType } from 'utils/interfaces';

const RewardItem = ({ props }: { props: {item: RewardItemType, index:number} }) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const {
    type,
    itemImageUrl,
    itemName,
    itemType,
    itemValue,
  } = props.item;

  return (
    <div className={cn(props.index > 0 && style.desktop, style.Reward, style?.[type])}>
      <div className={style.RewardItemWrapper}>
        <div className={style.RewardType}>
          <Image
            priority={false}
            src={type == 'Gold' ? GOLDIcon : SILVERIcon}
            alt={type == 'Gold' ? 'Icone Gold' : 'Icone Silver'}
          />
          <h3>RIFA {type == 'Gold' ? 'GOLD' : 'SILVER'}</h3>
        </div>
        <div className={style.RewardContent}>
          <Image src={itemImageUrl ? itemImageUrl : defaultGunPic} alt={`Imagem de ${itemName}`} />
          <div className={style.RewardDescription}>
            <h2>{itemName}</h2>
            <p>{itemType}</p>
          </div>
        </div>
        <div className={style.RewardValue}>
          <h3>R$ {itemValue}.00</h3>
        </div>
      </div>
    </div>
  );
};

export default RewardItem;
