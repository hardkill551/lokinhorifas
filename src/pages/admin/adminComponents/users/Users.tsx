import Image from "next/image";
import styles from './users.module.css';
import { UsersProps } from "utils/interfaces";

export default function Users({ id, image, name, tradLink, charge, context, onChargeChange, onDeleteUser, onDeleteUserRaffle, onAddUser }: UsersProps) {
    return (
        <div className={styles.ContainerUser}>
            <Image width={55} height={55} src={image} className={styles.ImageUser} alt='Foto de perfil' />
            <div className={styles.UserDate}>
                <p className={styles.FullNameUser}>{name}</p>
                <p className={styles.EmailUser}>{tradLink}</p>
            </div>
            <div className={styles.management}>
                
                {context === "Users" && (
                    <select className={styles.DropDownUser} value={charge} onChange={(e) => onChargeChange(id, e.target.value)}>
                        <option value="Ativo">Ativo</option>
                        <option value="Desativo">Desativo</option>
                        <option value="Gerente">Teste</option>
                    </select>
                )}
                {/* Deletar o usuario do site */}
                {context == "Users" && (
                    <div className={styles.deleteUser} onClick={() => onDeleteUser(id)}>x</div>
                )}
                {/* Deletar o usuario de uma rifa em específico*/}
                {context == "ParticipantsRafle" && (
                    <div className={styles.deleteUser} onClick={() => onDeleteUserRaffle(id)}>x</div>
                )}

                {context == "addParticipantsRaflle" && (
                    <div className={styles.AddUser} onClick={() => onAddUser(id)}>Adicionar</div>
                )}  
            </div>
        </div>
    );
}
