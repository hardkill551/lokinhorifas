import style from "./RifasCadastradas.module.css";

export default function PopUpRifa({setPopUpRifaRifa}:any) {

    return (
        <div className={style.ContainerPopUpRifa}>
            <div className={style.ContentPopUpRifa}>
                <div className={style.ButtonExitUpdate}>
                    <button onClick={() => setPopUpRifaRifa(false)} className={style.ButtonExitUpdateStyle}>x</button>
                </div>
                <div>
                    <p className={style.TitleDescriptionPopUpRifa}>Quantida de Participantes: <span>3</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Limite de Participante: <span>20</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Estado: <span className={style.EstateRaffle}>Em analise</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Valor Total: <span>R$:500</span> </p>
                   <p className={style.TitleDescriptionPopUpRifa}>Limite de valor por rifa: <span>R$:50</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Criado em: <span>12/08/2024</span></p>
                   <p className={style.TitleDescriptionPopUpRifa}>Modificada em: <span>12/09/2024</span></p>
                </div>
                <div>
                    <button className={style.ButtonPopUpRifa}>Ativar Rifa</button>
                   <button className={style.ButtonPopUpRifa}>Deletar Rifa</button>
                   <button className={style.ButtonPopUpRifa}>Atualizar Rifa</button>
                </div>
            </div>
        </div>
    );
}