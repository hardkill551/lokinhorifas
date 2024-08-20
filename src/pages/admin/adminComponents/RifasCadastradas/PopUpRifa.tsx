import style from "./RifasCadastradas.module.css";

export default function PopUpRifa() {

    return (
        <div className={style.ContainerPopUpRifa}>
            <div className={style.ContentPopUpRifa}>
                <div className={style.ButtonExitUpdate}>
                    <button onClick={() => (false)} className={style.ButtonExitUpdateStyle}>x</button>
                </div>
                <p>skjnfaksdjlnfj</p>
            </div>
        </div>
    );
}