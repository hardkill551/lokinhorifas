
import styles from '../admin.module.css';
import { useState } from "react";
import Lucas from "@/src/image/lucas.png";
import Elisson from "@/src/image/Elisson.png";
import { IoSearch } from "react-icons/io5";


export default function ScreenUsers() {
    const [users, setUsers] = useState([
        { id: 1, image: Elisson, name: "Elisson Victor Costa Gama Siquera", email: "elisson.siqueira@lifecon.com", charge: "Admin" },
        { id: 2, image: Lucas, name: "Lucas Araújo De oliveira", email: "Lucas.Oliveira@lifecon.com", charge: "Admin" },
        { id: 3, image: Elisson, name: "Guilhotina Ferreira de Sousa ", email: "Guilhotina.Sousa@lifecon.com", charge: "Gerente" },
        { id: 4, image: Elisson, name: "Ana Rodrigues", email: "maria.rodrigues@lifecon.com", charge: "Diretor" },
        { id: 5, image: Lucas, name: "Carlos Mendes", email: "carlos.mendes@lifecon.com", charge: "Usuario" },
        { id: 6, image: Elisson, name: "Ana Paula Lima", email: "ana.paula@lifecon.com", charge: "Usuario" },
        { id: 7, image: Elisson, name: "Lucas Silva", email: "roberto.silva@lifecon.com", charge: "Usuario" },
        { id: 8, image: Lucas, name: "Juliana Martins", email: "juliana.martins@lifecon.com", charge: "Gerente" }
    ]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChargeChange = (userId:any, newCharge:any) => {
        setUsers(users.map(user => user.id === userId ? { ...user, charge: newCharge } : user));
    };
    const handleDeleteUser = (userId:any => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const filterUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className={styles.ContainerMember}>
            <div className={styles.ContentMember}>
                <div className={styles.ContainerSearchMember}>
                    <div>
                        <h1 className={styles.TitleMember}>{users.length} Membro(s)</h1>
                        <div className={styles.inputNavBarContainer}>
                            <IoSearch className={styles.searchIconMember} />
                            <input
                                type='text'
                                className={styles.inputNavBarMember}
                                placeholder="Pesquisar por nome"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <div className={styles.ButtonAddMember}>+</div>
                        </div>

                    </div>
                </div>
                <div className={styles.ContentData}>
                    <div className={styles.Data}>
                        <div className={styles.Table}>
                            <p className={styles.TitleName}>Nome</p>
                            <p className={styles.TitleName}>Função</p>
                        </div>
                        <div className={styles.LineMember}></div>
                        <div className={styles.ContentUsersPopUp}>
                            {filterUsers.map(person =>
                                <Users
                                    key={person.id}
                                    id={person.id}
                                    image={person.image}
                                    name={person.name}
                                    email={person.email}
                                    charge={person.charge}
                                    onChargeChange={handleChargeChange}
                                    onDelete={handleDeleteUser}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

