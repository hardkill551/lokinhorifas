import { ChangeEvent, useEffect, useState } from 'react'
import style from '../admin.module.css'
import { useRaffleContext } from 'contexts/RaffleContext'

const AdminForm = ({value}: { value: { isFree: boolean } }) => {
  const { addItem, addedItemList, submitNewRaffle } = useRaffleContext() as { 
    addItem: Function, addedItemList: Function, submitNewRaffle: Function 
  }

  const { isFree } = value
  
  const [ formItems, setFormItems ] = useState<{
    name:string, quality:string, value:number
  }>({ name: '', quality: '', value: 0 })

  const handleFormSubmit = () => {
    if(formItems.name == '' || formItems.quality == '') return
    addItem([formItems.name, formItems.quality, formItems.value])
    setFormItems({name: '', quality: '', value: 0})
  }

  const handleFormUpdate = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, type: string) => {
    if(!e.target.value) return
    if(e.target.value == '') return

    
    const value = type == 'value' ? Number(e.target.value) : e.target.value
    
    setFormItems(oldObject => {return {...oldObject, [type]: value}})
  }
  
  return (
    <div className={style.adminForm}>
      <h2>Rifa {isFree ? 'Rifa Free (Gratuita)' : 'Comum (Paga)'}</h2>
      <div className={style.addSkin}>
        <div className={style.col1}>
          <div className={style.SkinImageBox}>
          </div>
        </div>
        <div className={style.form}>
          <h2>Adicionar skin à tabela</h2>
          <hr />
          <label>
            <p>Nome da skin</p>
            <input type="text" required value={formItems.name} onChange={e => handleFormUpdate(e, 'name')} />
          </label>
          <label>
            <p>Qualidade da arma</p>
            <select required value={formItems.quality} onChange={e => handleFormUpdate(e, 'quality')}>
              <option value="">Selecione uma opção</option>
              <option value="01">01 - Novo em Folha</option>
              <option value="02">02 - Pouco Usado</option>
              <option value="03">03 - Testado em Campo</option>
              <option value="04">04 - Bem Usado</option>
              <option value="05">05 - Desgastado pela Batalha</option>
            </select>
          </label>
          <label>
            <p>Valor estimado da skin</p>
            <input type="number" value={formItems.value} required onChange={e => handleFormUpdate(e, 'value')}/>
          </label>
          <div className={style.buttonGroup}>
            <button onClick={() => handleFormSubmit()}>Adicionar</button>
            <button onClick={() => submitNewRaffle(isFree)} disabled={addedItemList.length == 0 ? true : false}>Criar rifa ({addedItemList.length})</button>
            </div>
        </div>

      </div>
    </div>
  );
}
 
export default AdminForm;