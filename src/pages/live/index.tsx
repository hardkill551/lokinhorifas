import style from './live.module.css';
import Image from 'next/image';


const Live = () => {
  return (
    <div className={style.container}>
      <Image
        src={Background}
        alt="Papel de Parede do site"
        className={style.wallpaper}
      />
      <main className={style.conteudo}>
        <Image
          src={logovermelho}
          alt="Logo do Site - LokinhoRifas"
          className={style.LogoTwitch}
        />

        <h1 className={style.tituloLive}>{textInfo.text}</h1>

        {/* Renderiza a live apenas quando o carregamento estiver concluído */}
        {!isLoading && renderLive()}
      </main>
    </div>
  )
}

export default Live