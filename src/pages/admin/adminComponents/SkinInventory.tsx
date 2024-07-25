import style from '../admin.module.css'

const Inventory = () => {
  return (
    <div className={style.skinInventory}>
      <h2>Inventário</h2>

      <div className={style.inventory}>
        <div className={style.col1}>
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

          <div className={style.skinGroup}>
            <div className={style.skin}></div>
          </div>

          <div className={style.buttonGroup}>
            <button>Criar uma rifa nova com skins selecionadas</button>
            <button>Deletar skins selecionadas</button>
          </div>
        </div>

        <div className={style.col2}>
          <div className={style.SkinImageBox}>

          </div>

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
  );
}
 
export default Inventory;