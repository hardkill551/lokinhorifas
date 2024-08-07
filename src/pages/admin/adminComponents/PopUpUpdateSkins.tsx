import { skinDataType } from "utils/interfaces";
import style from "../admin.module.css";
import { useEffect, useState } from 'react';

export default function PopUpUpdateSkins({ setPopUpSkins }: any) {
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [skin, setSkin] = useState<skinDataType>({
        name: "teste",
        value: 4.55,
        type: "AWP",
        picture: null
    });
    const [typeSkins, setTypeSkins] = useState([
        { name: "Faca" },
        { name: "Luva" },
        { name: "AWP" },
    ]);
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
        const { name, value } = event.target;
        setSkin((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleValueChange = (e: any) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = (Number(value) / 100).toFixed(2) + '';
        value = value.replace(".", ",");
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        setSkin((prevState: any) => ({
            ...prevState,
            value: value,
        }));
    };

    return (
        <div className={style.ContainerPopUpUpdate}>
            <div className={style.ContentPopUpUpdate}>
                <div className={style.ButtonExitUpdate}>
                    <button onClick={() => setPopUpSkins(false)} className={style.ButtonExitUpdateStyle}>x</button>
                </div>
                <div className={style.DataPopUpUpdate}>

                    <div className={style.DivPhoto}>
                        <input type="file" className={style.fileInput} name="picture" onChange={handleImageChange} />
                        {image && <img className={style.imagePreview} src={image} alt="Image Preview" />}
                    </div>

                    <div>
                        <h1 className={style.TitlePopUpUpdate}>Adicionar skin à tabela</h1>
                        <div className={style.DivInput}>
                            <label className={style.LabelPopUpUpdate}>Nome Da Skin:</label>
                            <input 
                                    type='text' 
                                    className={style.InputDataPopUp} 
                                    name="name"
                                    value={skin.name} 
                                    onChange={(e)=>setSkin({...skin, name:e.target.value})} 
                                />
                        </div>
                        <div className={style.DivInput}>
                            <label className={style.LabelPopUpUpdate}>Tipo:</label>
                            <select 
                                    className={style.InputDataPopUp} 
                                    name="type"
                                    value={skin.type} 
                                    onChange={(e)=>setSkin({...skin, type:e.target.value})}
                                >
                                    <option value="" className={style.dd}>Selecione um tipo</option>
                                    {typeSkins.map((type, index) => (
                                        <option key={index} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        <div className={style.DivInput}>
                            <label className={style.LabelPopUpUpdate} >Valor Da Skin:</label>
                            <input 
                                    type='text' 
                                    className={style.InputDataPopUp} 
                                    name="value" 
                                    placeholder='0,00'
                                    value={skin.value} 
                                    onChange={handleValueChange}
                                />
                        </div>
                        <button className={style.ButtonSavePopUp}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
