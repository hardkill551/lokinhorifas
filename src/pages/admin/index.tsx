import style from './admin.module.css';
import ProfileInformations from './adminComponents/ProfileInformations';

export default function Admin() {

  return (
    <div className={style.ContainerAdmin}>
    <div className={style.ContentAdmin}>
      <ProfileInformations />
    </div>
    </div>
  )

}

;