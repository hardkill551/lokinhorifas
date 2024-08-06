import style from './live.module.css';
import Image from 'next/image';



const Live = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>TÍTULO DA LIVE</h1>
        <h2>teste</h2>
        {/* <Image src={} alt=''/> */}
      </div>
    </div>
  )
}

export default Live