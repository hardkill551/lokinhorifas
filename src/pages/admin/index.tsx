import style from './admin.module.css';
import ProfileInformations from './adminComponents/ProfileInformations';
import CardSkins from './adminComponents/CardSkins';

export default function Admin() {

  return (
    <div className={style.ContainerAdmin}>
    <div className={style.ContentAdmin}>
      <ProfileInformations />
    
    </div>
      <CardSkins/>
    </div>
  )

};