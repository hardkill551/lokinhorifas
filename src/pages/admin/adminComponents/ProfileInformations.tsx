import { useRouter } from 'next/router';
import style from '../admin.module.css';
import { useState } from 'react';
import axios from 'axios';
import { skinDataType } from 'utils/interfaces';

export default function ProfileInformations() {
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();
    const [skin, setSkin] = useState<skinDataType>({
        name: "",
        value: "",
        type: "",
        picture: null
    });
    const [typeSkins, setTypeSkins] = useState([
        { name: "Faca" },
        { name: "Luva" },
        { name: "AWP" },
    ]);
    const [error, setError] = useState('');

    const validateForm = async () => {
        if (!skin.name) {
            setError("O nome da skin é obrigatório.");
            return false;
        }
        if (!skin.type) {
            setError("O tipo da skin é obrigatório.");
            return false;
        }
        if (Number(skin.value) <= 0) {
            setError("O valor da skin deve ser maior que zero.");
            return false;
        }
        if (!selectedFile) {
            setError("A foto da skin é obrigatória.");
            return false;
        }
        return true;
    };

    const sendForm = async (e: any) => {

        e.preventDefault();
    
        setError("");
        if (!(await validateForm())) return;
    
        const formData = new FormData();
        const pictureFile = selectedFile;
    
        const skinData = { ...skin};
        skinData.value = parseFloat(skin.value.replace('.', '').replace(',', '.')).toFixed(2);
        console.log(skinData.value)
        if (!pictureFile) {
            skinData.picture = "default";
        } else {
            skinData.picture = pictureFile.name;
            formData.append("picture", pictureFile);
        }
        formData.append("skinData", JSON.stringify(skinData));
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/skin",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
    
        } catch (error:any) {
            setError(error.response.data.message);
        }
    };

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
        <>
            <div className={style.ContainerInformation}>
                <form className={style.FormPhoto} onSubmit={sendForm}>
                    <div className={style.Data}>
                        <div className={style.ContentPhoto}>
                            <input type="file" className={style.fileInput} name="picture" onChange={handleImageChange} />
                            {image && <img className={style.imagePreview} src={image} alt="Image Preview" />}
                        </div>

                        <div className={style.ContentInputs}>
                            <p className={style.TitleAdmin}>Adicionar skin à tabela</p>
                            <div className={style.DivInput}>
                                <label className={style.labelInformation}>Nome Da Skin:</label>
                                <input 
                                    type='text' 
                                    className={style.InputData} 
                                    name="name"
                                    value={skin.name} 
                                    onChange={(e)=>setSkin({...skin, name:e.target.value})} 
                                />
                            </div>
                            <div className={style.DivInput}>
                                <label className={style.labelInformation}>Tipo:</label>
                                <select 
                                    className={style.InputData} 
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
                                <label className={style.labelInformation}>Valor Da Skin:</label>
                                <input 
                                    type='text' 
                                    className={style.InputData} 
                                    name="value" 
                                    placeholder='0,00'
                                    value={skin.value} 
                                    onChange={handleValueChange}
                                />
                            </div>

                            {error && <p className={style.Error}>{error}</p>}

                            <button type="submit" className={style.ButtonSave}>Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
