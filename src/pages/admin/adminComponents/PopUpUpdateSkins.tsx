import style from "../admin.module.css";
export default function PopUpUpdateSkins({ setPopUpSkins }: any) {

    return (
        <div className={style.ContainerPopUpUpdate}>
            <div className={style.ContentPopUpUpdate}>
                <div className={style.ButtonExitUpdate}>
                    <p onClick={() => setPopUpSkins(false)}>X</p>
                </div>
                <h1>Adicionar skin à tabela</h1>
                <div className={style.DataPopUpUpdate}>
                    <div>
                        <input type="file" />
                    </div>
                    <div>
                        <div>
                            <label>Nome Da Skin:</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Tipo:</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Valor Da Skin:</label>
                            <input type="text"></input>
                        </div>
                        <button className={style.ButtonSave}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};