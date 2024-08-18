import Style from "../admin.module.css";
import Image from 'next/image';

export default function CardSkinsCart() {

    return (
        <div className={Style.ContainerCardCart}>
            <div className={Style.DivImage}>
                <Image src="" alt="card"/>
            </div>
            <div>
                <p>Nome</p>
                <p>R$:40.00</p>
            </div>
        </div>
    );
}