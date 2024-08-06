import style from '../admin.module.css';
import Image from 'next/image';
import test from '../../../assets/teste.jpg';
import { FaTrash } from "react-icons/fa";

export default function CardSkins({ name, type, value, picture, id, onDelete }: { name: string, type: string, value: number, picture: string , id: number ,onDelete: (id: number) => void }) {

    function DeliteCard(){
        onDelete(id);
    }
    return (
        <>
            <div className={style.ContentCard}>
                <Image src={test} alt="Imagem do card" width={155} height={80} className={style.ImageCard}/>
                <div className={style.DivDataCard}>
                    <p>{type} | {name}</p>
                    <p>R$:{value}</p>
                </div>
                <div className={style.DivTrash}>
                    <FaTrash color='red' onClick={DeliteCard}/>
                </div>
            </div>
        </>
    );
}
