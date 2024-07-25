import style from '../admin.module.css'

const TopSection = () => {
  return (
    <div className={style.topSection}>
      <div className={style.addSkin}>
        <div className={style.SkinImageBox}>

        </div>
        <h2>Adicionar skin à tabela</h2>
        <hr />

        <label>
          <p>Nome da skin</p>
          <input type="text" required />
        </label>
        <label>
          <p>Tipo da arma da skin</p>
          <input type="text" required />
        </label>
        <label>
          <p>Valor estimado da skin</p>
          <input type="number" required />
        </label>

        <button>Adicionar</button>
      </div>
      <div className={style.graph}>
        <div className={style.graph1}>
          Média do valor das armas adicionadas
        </div>
        <div className={style.graph2}>
          Média de entradas por rifa (com valor de individual)
        </div>
      </div>
    </div>
  );
}
 
export default TopSection;