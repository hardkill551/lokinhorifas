import { useRouter } from 'next/router';
import style from '../admin.module.css';
import { useState } from 'react';
import axios from 'axios';
import { skinData } from 'utils/interfaces';

export default function ProfileInformations() {
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter()
    const [skin, setSkin] = useState<skinData>({
        name: "",
        value: 0,
        type: "",
        picture: null
    })
    const [typeSkins, setTypeSkins] = useState([
        { name: "Faca" },
        { name: "Luva" },
        { name: "AWP" },
    ]);

    const sendForm = async (e: any) => {
        e.preventDefault();
    
        setError("");
        if (!(await validateForm())) return;
    
        const formData = new FormData();
        const pictureFile = selectedFile;
    
        const {...skinData } = skin;
    
        if (!pictureFile) {
          skinData.picture = "default";
        } else {
            skinData.picture = pictureFile.name;
          formData.append("picture", pictureFile);
        }
    
        formData.append("skinData", JSON.stringify(skinData));
    
        try {
          await axios.post(
            process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          router.push("/login");
        } catch (error) {
          console.error(error);
          setError("Ocorreu um erro ao enviar o formulário.");
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

    return (
        <>
            <div className={style.ContainerInformation}>
                <form className={style.FormPhoto} onSubmit={sendForm}>
                    <div className={style.Data}>
                        <div className={style.ContentPhoto}>
                            <input type="file" className={style.fileInput} name ="picture" onChange={handleImageChange} />
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
                                <select className={style.InputData} value={skin.type} onChange={(e)=>setSkin({...skin, type:e.target.value})}>
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
                                <input type='number' className={style.InputData} value={skin.value} onChange={(e)=>setSkin({...skin, value:Number(e.target.value)})}/>
                            </div>

                            <button type="submit" className={style.ButtonSave}>Salvar</button>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )

};