import style from '../admin.module.css';
import Image from 'next/image';
import test from '../../../assets/teste.jpg';
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

export default function CardSkins({ name, type, value, picture, id, onDelete, }: { name: string, type: string, value: number, picture: string, id: number, onDelete: (id: number) => void }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    return (
        <>
            <div className={style.ContentCard} >
                <Image src={`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${picture}`} alt="Imagem do card" width={155} height={80} className={style.ImageCard} />
                <div className={style.DivDataCard}>
                    <p>{type} | {name}</p>
                    <p>R$: {value.toFixed(2).replace('.', ',')}</p>
                </div>
                <div className={style.DivSettings}>
                <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                animate={{ y: 0 }}
                                initial={{ y: -10 }}
                                exit={{ y: -10 }}
                                transition={{ duration: 0.5, type: "tween" }}
                                className={style.dropdownMenu}
                            >
                                <button className={style.buttonSelect}>Atualizar</button>
                                <button className={style.buttonSelect} onClick={()=>{onDelete(id)}}>Deletar</button>
                                <button className={style.buttonSelect} onClick={()=>{}}>Add na rifa</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <IoSettingsSharp size={20}  onClick={()=> {setIsDropdownOpen(prevState => !prevState)}} />     
                </div>

            </div>
        </>
    );
}


