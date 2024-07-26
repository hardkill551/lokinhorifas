import style from '../admin.module.css'

const Inventory = () => {
  const tempArray = []
  
  for(let i = 0; i < 88; i++) {
    tempArray.push(i)
  }

  return (
    <div className={style.skinInventory}>
      <div className={style.inventory}>
        <div className={style.col1}>
          <h2>Inventário</h2>
          <div className={style.availableRaffles}>
            <h3>Rifas ativas</h3>
            <div className={style.raffleGroup}>
              <div className={style.raffle}></div>
            </div>
          </div>
          <div className={style.buttonGroup}>
            <div className={style.mainButtons}>
              <button>Selecionar todos</button>
              <button>Desmarcar seleção</button>
            </div>
            <button>Filtrar</button>
          </div>
          <div className={style.skinViewport}>
            <div className={style.skinGroup}>
              {tempArray.map(item => <div key={item} className={style.skin}></div>)}
            </div>
          </div>
          <div className={style.buttonGroup}>
            <div className={style.mainButtons}>
              <button className={style.mainbutton}>Criar uma rifa</button>
              <label>
                <input type="checkbox" name="free" />
                Fazer uma rifa gratuita
              </label>
              </div>
            <button>Deletar skins selecionadas</button>
          </div>
        </div>
        <div className={style.col2}>
          <div className={style.SkinImageBox}>
          </div>
          <div className={style.form}>
            <label>
              <p>Nome da skin</p>
              <input type="text" />
            </label>
            <label>
              <p>Tipo da arma da skin</p>
              <input type="text" />
            </label>
            <label>
              <p>Quantidade</p>
              <input type="number" />
            </label>
            <label>
              <p>Valor estimado da skin</p>
              <input type="number" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Inventory;