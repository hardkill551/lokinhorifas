import style from '../admin.module.css';
import { useState } from 'react';

export default function ProfileInformations() {
    const [image, setImage] = useState('');
    const [typeSkins, setTypeSkins] = useState([
        { name: "Faca" },
        { name: "Luva" },
        { name: "Personagem" },
    ]);
    const [selectedType, setSelectedType] = useState('');

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTypeChange = (event: any) => {
        setSelectedType(event.target.value);
    };
    return (
        <>
            <div className={style.ContainerInformation}>
                <form className={style.FormPhoto}>
                    <div className={style.Data}>
                        <div className={style.ContentPhoto}>
                            <input type="file" className={style.fileInput} onChange={handleImageChange} />
                            {image && <img className={style.imagePreview} src={image} alt="Image Preview" />}
                        </div>

                        <div className={style.ContentInputs}>
                            <p className={style.TitleAdmin}>Adicionar skin à tabela</p>
                            <div className={style.DivInput}>
                                <label className={style.labelInformation}>Nome Da Skin:</label>
                                <input type='text' className={style.InputData} />
                            </div>
                            <div className={style.DivInput}>
                                <label className={style.labelInformation}>Tipo:</label>
                                <select className={style.InputData} value={selectedType} onChange={handleTypeChange}>
                                    <option value="" className={style.dd}>Selecione um tipo</option>
                                    {typeSkins.map((type, index) => (
                                        <option key={index} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={style.DivInput}>
                                <label className={style.labelInformation}>Valor Da Skin:</label>
                                <input type='text' className={style.InputData} />
                            </div>

                            <button className={style.ButtonSave}>Salvar</button>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )

};