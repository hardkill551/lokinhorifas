import style from './admin.module.css';
import ProfilePhoto from './adminComponents/ProfilePhoto';
import ProfileInformations from './adminComponents/ProfileInformations';

export default function Admin() {

  return (
    <div className={style.ContainerAdmin}>
    <div className={style.ContentAdmin}>
      <ProfilePhoto />
      <ProfileInformations />
    </div>
    </div>
  )

}

;