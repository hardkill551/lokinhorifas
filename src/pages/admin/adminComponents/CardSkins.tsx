import style from '../admin.module.css';
import Image from "next";
import Teste from '../../../assets/gift.svg';
import { SkinType } from 'utils/interfaces';

export default function CardSkins({ name, type, value, picture }: { name: string, type: string, value: number, picture: string }) {

    return (
        <>
            <div className={style.ContentCard}>
                {/* <Image src={Teste} alt="IMagem do card" /> */}
                <p>{name}</p>
                <p>{type}</p>
                <p>{value}</p>
            </div>
        </>
    )
}