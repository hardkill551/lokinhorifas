import { useState, useEffect, ChangeEvent } from "react";
import style from "./RifasCadastradas.module.css";
import { IoSearch } from "react-icons/io5";
import Users from "../users/Users";
import axios from "axios";
import defaultProfilePicture from '../../../../assets/defaultProfilePic.svg'

interface User {
    id: number;
    name: string;
    email: string;
    number: string;
    picture: string;
    tradeLink: string;
}

interface PopUpUpdateRifaProps {
    setPopUpUpdateRaffle: (value: boolean) => void;
    raffleId: string;
}

export default function PopUpUpdateRifa({ setPopUpUpdateRaffle, raffleId }: PopUpUpdateRifaProps) {
    const [usersRegisterRaffle, setUsersRegisterRaffle] = useState<User[]>([]);
    const [userRegister, setUserRegister] = useState<User[]>([]);
    const [addUser, setAddUser] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchUsers();
    }, [page, searchQuery, addUser]); // Adicione `addUser` à dependência

    const fetchUsers = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await axios.get<{ users: User[] }>(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users`, {
                params: { 
                    page, 
                    search: searchQuery.length >= 3 ? searchQuery : undefined 
                },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            if (addUser) {
                setUserRegister(prev => page === 1 ? response.data.users : [...prev, ...response.data.users]);
            } else {
                setUsersRegisterRaffle(prev => page === 1 ? response.data.users : [...prev, ...response.data.users]);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
        setLoading(false);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight && !loading) {
            setPage(prev => prev + 1);
        }
    };

    const handleAddUser = async (userId: number): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/raffle/add-user`, {
                raffleId: raffleId,
                userId: userId,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.status === 200) {
                alert('Usuário adicionado à rifa com sucesso!');
                setUsersRegisterRaffle(prev => [...prev, response.data]);
            }
        } catch (error) {
            console.error('Erro ao adicionar usuário à rifa:', error);
            alert('Falha ao adicionar usuário à rifa.');
        }
    };

    const handleDeleteUserRaffle = async (userId: number): Promise<void> => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/raffle/remove-user`, {
                data: { raffleId: raffleId, userId: userId },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.status === 200) {
                alert('Usuário removido da rifa com sucesso!');
                setUsersRegisterRaffle(prev => prev.filter(user => user.id !== userId));
            }
        } catch (error) {
            console.error('Erro ao remover usuário da rifa:', error);
            alert('Falha ao remover usuário da rifa.');
        }
    };

    const filteredUsers = (addUser ? userRegister : usersRegisterRaffle).filter(user =>
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
                                type="text"
                                className={style.inputNavBarMember}
                                placeholder="Pesquisar por nome"
                                value={searchQuery}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setSearchQuery(e.target.value);
                                    setPage(1);
                                    if (addUser) {
                                        setUsersRegisterRaffle([]);
                                    } else {
                                        setUserRegister([]);
                                    }
                                }}
                            />
                            <div className={style.ButtonAddMember} onClick={() => setAddUser(!addUser)}>
                                {addUser ? "+" : "-"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.Data} onScroll={handleScroll}>
                    <div className={style.LineMember}></div>
                    <div className={style.ContentUsersPopUp}>
                        {filteredUsers.map((person: User) => (
                            <Users
                                key={person.id}
                                image={person.picture === "default" ? defaultProfilePicture :
                                    (person.picture).startsWith('https://static-cdn.jtvnw.net') ?
                                        person.picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${person.picture}`}
                                name={person.name}
                                email={person.email}
                                tradLink={person.tradeLink}
                                onnumberChange={() => { } }
                                onDeleteUserRaffle={() => handleDeleteUserRaffle(person.id)}
                                onAddUser={() => handleAddUser(person.id)}
                                onDeleteUser={() => { } }
                                context={addUser ? "ParticipantsRafle" : "addParticipantsRaflle"}
                                id={0}
                                charge={""}
                                onChargeChange={function (id: number, newCharge: string): void {
                                    throw new Error("Function not implemented.");
                                } } 
                                number={""}                                
                            />
                      
                        ))}
                        {loading && <p>Carregando...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
