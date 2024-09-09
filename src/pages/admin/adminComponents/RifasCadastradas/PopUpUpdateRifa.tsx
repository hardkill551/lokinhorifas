import { useState, useEffect, ChangeEvent } from "react";
import style from "./RifasCadastradas.module.css";
import { IoSearch } from "react-icons/io5";
import Users from "../users/Users";
import axios from "axios";
import defaultProfilePicture from '../../../../assets/defaultProfilePic.svg';

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
    const [addUser, setAddUser] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    useEffect(() => {
        fetchUsers();
    }, [page, searchQuery, addUser, usersRegisterRaffle, setUsersRegisterRaffle]);

    const fetchUsers = async (): Promise<void> => {
        setLoading(true);
        try {
            if (!addUser) {
                axios.get<{ users: User[] }>(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users`, {
                    params: {
                        page,
                        search: undefined
                    },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
                ).then(res => {
                    setUsersRegisterRaffle(res.data.users);
                }).catch(err => {
                    setError(err.response.data);
                })

            } else {
                axios.get<User[]>(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/roulette/participants/${raffleId}`, {
                    params: {
                        page,
                    },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
                ).then((res: any) => {
                    setUsersRegisterRaffle(res.data);
                }).catch(err => {
                    setError(err.response.data);
                })
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

    const searchText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchQuery(e.target.value);
        setPage(1);
        if(e.target.value.length > 3){
            if (!addUser) {
                axios.get<{ users: User[] }>(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users`, {
                    params: {
                        page,
                        search: e.target.value
                    },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
                ).then(res => {
                    setUsersRegisterRaffle([]);
                    setUsersRegisterRaffle(res.data.users);
                    console.log("oi", res.data.users, usersRegisterRaffle)

                }).catch(err => {
                    setError(err.response.data);
                })
    
            } else {
                axios.get< User[] >(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/roulette/participants/raffle/${raffleId}`, {
                    params: {
                        page,
                        name: e.target.value
                    },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
                ).then(res => {
                    setUsersRegisterRaffle(res.data);
                    console.log("oi2", res.data, usersRegisterRaffle)
                }).catch(err => {
                    setError(err.response.data);
                })
            }
        }
        
    }

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
                                onChange={(e) =>searchText(e)}
                                
                            />
                            <div className={style.ButtonAddMember} onClick={() => setAddUser(!addUser)
                            }>
                                {addUser ? "+" : "-"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.Data} onScroll={handleScroll}>
                    <div className={style.LineMember}></div>
                    <div className={style.ContentUsersPopUp}>
                        {usersRegisterRaffle.map((person: User) => (
                            <Users
                                image={person.picture === "default" ? defaultProfilePicture :
                                    (person.picture).startsWith('https://static-cdn.jtvnw.net') ?
                                        person.picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${person.picture}`}
                                name={person.name}
                                email={person.email}
                                tradeLink={person.tradeLink}
                                onnumberChange={() => { }}
                                onDeleteUserRaffle={() => handleDeleteUserRaffle(person.id)}
                                onAddUser={() => handleAddUser(person.id)}
                                onDeleteUser={() => { }}
                                context={addUser ? "ParticipantsRafle" : "addParticipantsRaflle"}
                                id={0}
                                charge={""}
                                onChargeChange={function (id: number, newCharge: string): void {
                                    throw new Error("Function not implemented.");
                                }}
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
