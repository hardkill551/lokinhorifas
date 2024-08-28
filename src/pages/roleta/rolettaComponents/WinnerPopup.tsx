import style from '../roletta.module.css'
import Image, { StaticImageData } from 'next/image';

import defaultGunPic from '../../../images/Roleta/Prizes/DefaultGunPic.png'
import shine from '../../../images/Roleta/WinnerPopup/shine.png'


import { RouletteContext } from 'utils/interfaces';
import { useEffect, useState } from 'react';
import { useRouletteContext } from 'contexts/RouletteContext';

const RoletaWinner = () => {
  const { rewards = [], winnerPopupVisible, manageCloseResult, winner, participants, isMockWin } = useRouletteContext() as RouletteContext

  const [ localWinner, setLocalWinner ] = useState({
      id: 1,
      isWinner: true,
      nickName: "user123#123",
      prize: {
        itemImageUrl: "",
        itemName: "Skin0",
        itemType: "Skin0",
        itemValue: "61",
        type: "Gold"
      }
    }
  )
  const [ imgSrc, setImgSrc ] = useState<string | StaticImageData>(localWinner.prize.itemImageUrl)

  useEffect(() => {
    setImgSrc(localWinner.prize.itemImageUrl)
  }, [localWinner])
  
  useEffect(() => {
    if(!winner) return
    if(!participants.filter(item => item.number == Number(winner.dataset.number) && item.isWinner == true)[0]) return
    if(!rewards[0]) return
    
    const person = participants.filter(item => item.number == Number(winner.dataset.number) && item.isWinner == true)[0]
    const gun = rewards[0]

    console.log(gun)
    
    const tempObject = {
      id: person.id,
      isWinner: person.isWinner,
      nickName: person.nickName,
      prize: {
        itemImageUrl: gun.itemImageUrl,
        itemName: gun.itemName,
        itemType: gun.itemType,
        itemValue: gun.itemValue,
        type: gun.type
      }
    }
    
    setLocalWinner(tempObject)
  }, [participants])

  return (
    <div className={style.WinnerPopup} style={{display:`${winnerPopupVisible ? 'flex' : 'none'}`}}>
    <div className={style.WinnerPopupWrapper}>
      <div className={style.SkinImageBox}>
      <Image width={775} height={637} src={imgSrc} alt={`Imagem de ${localWinner.prize.itemName}`} onError={() => setImgSrc(defaultGunPic)}/>
        <Image src={shine} alt="Brilho de fundo"/>
      </div>
      <h2>Parabéns!</h2>
      <h3 className={style.userNickname}>@{localWinner.nickName}</h3>
      <p>Ganhador da {localWinner.prize.itemName}</p>

      <button onClick={() => manageCloseResult(isMockWin)}>Próximo Sorteio</button>
    </div>

    <div className={style.glowGroup}>
      <div className={style?.["glow-0"]}>
        <div className={style?.["glow-1"]}></div>
      </div>
    </div>
  </div>
  );
}
 
export default RoletaWinner;