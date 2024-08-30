import style from "../roletta.module.css";
import Image, { StaticImageData } from "next/image";

import defaultGunPic from "../../../images/Roleta/Prizes/DefaultGunPic.png";
import shine from "../../../images/Roleta/WinnerPopup/shine.png";

import { RouletteContext } from "utils/interfaces";
import { useEffect, useState } from "react";
import { useRouletteContext } from "contexts/RouletteContext";

const RoletaWinner = () => {
  const {
    rewards = [],
    winnerPopupVisible,
    manageCloseResult,
    isMockWin,
    winnerProperties,
  } = useRouletteContext() as RouletteContext;

  const [localWinner, setLocalWinner] = useState({
    id: 1,
    isWinner: true,
    nickName: "user123#123",
    prize: {
      itemImageUrl: "",
      itemName: "Skin0",
      itemType: "Skin0",
      itemValue: "61",
      type: "Gold",
    },
  });
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(defaultGunPic);

  useEffect(() => {
    const checkImageExists = async (url: string) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          setImgSrc(url);
        } else {
          setImgSrc(defaultGunPic);
        }
      } catch (error) {
        setImgSrc(defaultGunPic);
      }
    };

    if (localWinner.prize.itemImageUrl && !localWinner.prize.itemImageUrl.includes('default')) {
      checkImageExists(localWinner.prize.itemImageUrl);
    } else {
      setImgSrc(defaultGunPic);
    }
  }, [localWinner]);

  useEffect(() => {
    if(!winnerProperties) return

    setLocalWinner({
      id: winnerProperties.id,
      isWinner: true,
      nickName: winnerProperties.nickName,
      prize: {
        itemImageUrl: rewards[0].itemImageUrl,
        itemName: rewards[0].itemName,
        itemType: rewards[0].itemType,
        itemValue: rewards[0].itemValue,
        type: Number(rewards[0].itemValue) >= 1000 ? 'Gold' : 'Silver',
      }
    })


  }, [winnerProperties]);

  return (
    <div
      className={style.WinnerPopup}
      style={{ display: `${winnerPopupVisible ? "flex" : "none"}` }}
    >
      <div className={style.WinnerPopupWrapper}>
        <div className={style.SkinImageBox}>
          <Image
            width={775}
            height={637}
            src={imgSrc}
            alt={`Imagem de ${localWinner.prize.itemName}`}
            onError={(e) => {
              e.preventDefault();
              setImgSrc(defaultGunPic);
            }}
          />
          <Image src={shine} alt="Brilho de fundo" />
        </div>
        <h2>Parabéns!</h2>
        <h3 className={style.userNickname}>@{localWinner.nickName}</h3>
        <p>Ganhador da {localWinner.prize.itemName}</p>

        <button onClick={() => manageCloseResult(isMockWin)}>
          Próximo Sorteio
        </button>
      </div>

      <div className={style.glowGroup}>
        <div className={style?.["glow-0"]}>
          <div className={style?.["glow-1"]}></div>
        </div>
      </div>
    </div>
  );
};

export default RoletaWinner;
