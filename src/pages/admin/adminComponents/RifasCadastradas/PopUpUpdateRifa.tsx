import { useState } from "react";
import style from "./RifasCadastradas.module.css";
import { IoSearch } from "react-icons/io5";
import Users from "../users/Users";

export default function PopUpUpdateRifa({ setPopUpUpdateRaffle }: any) {

    const [usersRegisterReffla, setusersRegisterReffla] = useState([
        { id: 1, image: "", name: "Esta na rifa", email: "elisson.siqueira@lifecon.com", charge: "Admin" },
        { id: 2, image: "", name: "Esta na rifa", email: "Lucas.Oliveira@lifecon.com", charge: "Admin" },
        { id: 3, image: "", name: "Esta na rifa ", email: "Guilhotina.Sousa@lifecon.com", charge: "Gerente" },
        { id: 4, image: "", name: "Esta na rifa", email: "maria.rodrigues@lifecon.com", charge: "Diretor" },
        { id: 5, image: "", name: "Esta na rifa", email: "carlos.mendes@lifecon.com", charge: "Usuario" },
        { id: 6, image: "", name: "Esta na rifa", email: "ana.paula@lifecon.com", charge: "Usuario" },
        { id: 7, image: "", name: "Esta na rifa", email: "roberto.silva@lifecon.com", charge: "Usuario" },
        { id: 8, image: "", name: "Esta na rifa", email: "juliana.martins@lifecon.com", charge: "Gerente" }
    ]);

    const [userRegister, setUserRegister] = useState([
        { id: 1, image: "", name: "Não esta na rifa", email: "elisson.siqueira@lifecon.com", charge: "Admin" },
        { id: 2, image: "", name: "Não esta na rifa", email: "Lucas.Oliveira@lifecon.com", charge: "Admin" },
        { id: 3, image: "", name: "Não esta na rifa ", email: "Guilhotina.Sousa@lifecon.com", charge: "Gerente" },
        { id: 4, image: "", name: "Não esta na rifa", email: "maria.rodrigues@lifecon.com", charge: "Diretor" },
        { id: 5, image: "", name: "Não esta na rifa", email: "carlos.mendes@lifecon.com", charge: "Usuario" },
        { id: 6, image: "", name: "Não esta na rifa", email: "ana.paula@lifecon.com", charge: "Usuario" },
        { id: 7, image: "", name: "Não esta na rifa", email: "roberto.silva@lifecon.com", charge: "Usuario" },
        { id: 8, image: "", name: "Não esta na rifa", email: "juliana.martins@lifecon.com", charge: "Gerente" }
    ]);

    const [addUser, setAddUser] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChargeChange = (userId: number, newCharge: string) => {
        setusersRegisterReffla(usersRegisterReffla.map(user => user.id === userId ? { ...user, charge: newCharge } : user));
    };

    const handleDeleteUserRaffle = (userId: number) => {
        setusersRegisterReffla(usersRegisterReffla.filter(user => user.id !== userId));
    };

    const handleAddUser = () => {
       //fazer a função de add participante na rifa
    };
    
    const onDeleteUser = () => {
     };

    const filteredUsers = (addUser ? usersRegisterReffla : userRegister).filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            <div className={style.ButtonAddMember} onClick={() => setAddUser(false)}>+</div>
                        </div>
                    </div>
                </div>
                <div className={style.Data}>
                    <div className={style.LineMember}></div>
                    <div className={style.ContentUsersPopUp}>
                        {filteredUsers.map(person =>
                        <Users
                        key={person.id}
                        id={person.id}
                        image={person.image}
                        name={person.name}
                        charge={person.charge}
                        onChargeChange={handleChargeChange}
                        tradLink=""
                        onDeleteUserRaffle={handleDeleteUserRaffle}
                        onAddUser={handleAddUser}
                        onDeleteUser={onDeleteUser}
                        context={addUser ? "ParticipantsRafle": "addParticipantsRaflle" }
                         />
                        )}
                </div>
                </div>
            </div>
        </div>
    );
}
