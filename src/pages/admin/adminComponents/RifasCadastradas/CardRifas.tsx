import { useState } from "react";
import style from "./RifasCadastradas.module.css";
import PopUpRifa from "./PopUpRifa";
import Image from 'next/image';
import imagem from "../../../../images/Logo.png"
export default function CardRifas({ name, type, id }: any) {
    const [popUpRifa, setPopUpRifaRifa] = useState(false)

    return (
        <>
            {popUpRifa && <PopUpRifa setPopUpRifaRifa={setPopUpRifaRifa}/>}
            <div className={style.ContainerCardRifa} onClick={() => setPopUpRifaRifa(true)}>
                <Image src={imagem} width={180} height={100} alt="Card rifa" />
                <div className={style.NomeRifa}>
                    <p>{name}</p>
                </div>
                <div className={style.DivType}>
                    <p>{type}</p>
                </div>

            </div>
        </>
    );
}