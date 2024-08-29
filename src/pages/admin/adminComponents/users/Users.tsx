import Image from "next/image";
import styles from './users.module.css';
import { UsersProps } from "utils/interfaces";

export default function Users({ id, image, name, tradLink, email, charge, context, onChargeChange, onDeleteUser, onDeleteUserRaffle, onAddUser, onnumberChange }: UsersProps) {
    return (
        <div className={styles.ContainerUser}>
            <Image width={55} height={55} src={image} className={styles.ImageUser} alt='Foto de perfil' />
            <div className={styles.UserDate}>
                <p className={styles.FullNameUser}>{name}</p>
                <p className={styles.EmailUser}>{email}</p>
                <p className={styles.EmailUser}>{tradLink}</p> {/* Exibe o tradeLink do usuário */}
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
                {/* Adicionar ou remover usuário da rifa, conforme contexto */}
                {context === "ParticipantsRafle" && (
                    <div className={styles.deleteUser} onClick={() => onDeleteUserRaffle(id)}>Remover</div>
                )}

                {context === "addParticipantsRaflle" && (
                    <div className={styles.AddUser} onClick={() => onAddUser(id)}>Adicionar</div>
                )}
            </div>
        </div>
    );
}
