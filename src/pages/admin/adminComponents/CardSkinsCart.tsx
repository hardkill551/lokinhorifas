import { InterRegisterRifa } from "utils/interfaces";
import Style from "../admin.module.css";
import Image from 'next/image';

export default function CardSkinsCart({id, name, value, picture}:InterRegisterRifa) {

    return (
        <div className={Style.ContainerCardCart}>
            <div className={Style.DivImage}>
                <Image src={picture} alt="card"/>
            </div>
            <div>
                <p className={Style.NameSkin}>{name}</p>
                <p className={Style.NameSkin}>R$:{value}</p>
                <div className={Style.DivDelite}>
                <p className={Style.ButtonDeleteSkin}>x</p>
                </div>
            </div>
        </div>
    );
}