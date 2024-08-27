import { useEffect, useState } from "react";
import style from "./RifasCadastradas.module.css";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import Users from "../users/Users";

export default function PopUpUpdateRifa({ setPopUpUpdateRaffle }: any) {

    const [users, setUsers] = useState([
        { id: 1, image: "", name: "Elisson Victor Costa Gama Siquera", email: "elisson.siqueira@lifecon.com", charge: "Admin" },
        { id: 2, image: "", name: "Lucas Araújo De oliveira", email: "Lucas.Oliveira@lifecon.com", charge: "Admin" },
        { id: 3, image: "", name: "Guilhotina Ferreira de Sousa ", email: "Guilhotina.Sousa@lifecon.com", charge: "Gerente" },
        { id: 4, image: "", name: "Ana Rodrigues", email: "maria.rodrigues@lifecon.com", charge: "Diretor" },
        { id: 5, image: "", name: "Carlos Mendes", email: "carlos.mendes@lifecon.com", charge: "Usuario" },
        { id: 6, image: "", name: "Ana Paula Lima", email: "ana.paula@lifecon.com", charge: "Usuario" },
        { id: 7, image: "", name: "Lucas Silva", email: "roberto.silva@lifecon.com", charge: "Usuario" },
        { id: 8, image: "", name: "Juliana Martins", email: "juliana.martins@lifecon.com", charge: "Gerente" }
    ]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChargeChange = (userId: any, newCharge: any) => {
        setUsers(users.map(user => user.id === userId ? { ...user, charge: newCharge } : user));
    };
    const handleDeleteUser = (userId: any) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const filterUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className={style.ContainerPopUpUpdateRifa}>
            <div className={style.ContentPopUpUpdateRifa}>
                <div className={style.ButtonExitPopUpUpdate}>
                    <button onClick={() => setPopUpUpdateRaffle(false)} className={style.ButtonExitUpdateStyle}>x</button>
                </div>
                <div className={style.ContainerSearchMember}>
                    <div>
                        <div className={style.inputNavBarContainer}>
                            <IoSearch className={style.searchIconMember} />
                            <input
                                type='text'
                                className={style.inputNavBarMember}
                                placeholder="Pesquisar por nome"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <div className={style.ButtonAddMember}>+</div>
                        </div>
                    </div>
                </div>
                <div className={style.Data}>
           
                <div className={style.LineMember}></div>
                <div className={style.ContentUsersPopUp}>
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
    );
}

