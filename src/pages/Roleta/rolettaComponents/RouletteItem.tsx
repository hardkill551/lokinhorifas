import style from '../roletta.module.css'
import Image from 'next/image';
import cn from 'classnames';
import { CardItemType } from 'utils/interfaces';

import defaultPicture from '../../../assets/defaultProfilePic.svg'

const RouletteItem = ({ props }: { props: CardItemType }) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const { color = 'Blue', profilePicture = '/default.png', personName = 'Anonymous', nickName = 'User' } = props;

  return (
    <div className={cn(style.PersonCard, style?.[color])}>
      <div className={style.PersonCardWrapper}>
        <div className={style.ProfilePicture}>
          <Image src={profilePicture ? profilePicture : defaultPicture} alt={`Foto de perfil de ${personName}`} />
        </div>
        <div className={style.ProfileInfo}>
          <h3>{personName}</h3>
          <p>{nickName}</p>
        </div>
      </div>
    </div>
  );
};

export default RouletteItem;
