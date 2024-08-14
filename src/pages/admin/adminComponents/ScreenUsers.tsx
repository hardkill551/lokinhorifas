import styles from '../admin.module.css';
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Users from './users/Users';
import { User } from 'utils/interfaces';


export default function ScreenUsers() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, image: "", name: "Elisson Victor Costa Gama Siquera", tradLink: "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=abcdeFGH1", charge: "Admin" },
        { id: 2, image: "", name: "Lucas Araújo De oliveira", tradLink: "https://steamcommunity.com/tradeoffer/new/?partner=987654321&token=ijkLMNOP2", charge: "Admin" },
        { id: 3, image: "", name: "Guilhotina Ferreira de Sousa ", tradLink: "https://steamcommunity.com/tradeoffer/new/?partner=1122334455&token=qrstUVWX3", charge: "Gerente" },
        { id: 4, image: "", name: "Ana Rodrigues", tradLink: "https://steamcommunity.com/tradeoffer/new/?partner=9988776655&token=yzaBCDEF4", charge: "Diretor" },
        { id: 5, image: "", name: "Carlos Mendes", tradLink: "https://steamcommunity.com/tradeoffer/new/?partner=5566778899&token=ghijKLmn5", charge: "Usuario" },
        { id: 6, image: "", name: "Ana Paula Lima", tradLink: "https://steamcommunity.com/tradeoffer/new/?partner=5566778899&token=ghijKLmn5", charge: "Usuario" },
        { id: 7, image: "", name: "Lucas Silva", tradLink: "https://steamcommunity.com/tradeoffer/new/?partner=5566778899&token=ghijKLmn5", charge: "Usuario" },
        { id: 8, image: "", name: "Juliana Martins", tradLink: "https://steamcommunity.com/tradeoffer/new/?partner=5566778899&token=ghijKLmn5", charge: "Gerente" }
    ]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChargeChange = (userId: number, newCharge: string) => {
        setUsers(users.map(user => user.id === userId ? { ...user, charge: newCharge } : user));
    };

    const handleDeleteUser = (userId: number) => {
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
                        </div>
                    </div>
                </div>
                <div className={styles.ContentData}>
                    <div className={styles.DataUser}>
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
                                    tradLink={person.tradLink}
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
