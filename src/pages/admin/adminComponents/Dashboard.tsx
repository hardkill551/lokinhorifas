import style from '../admin.module.css'

const Dashboard = () => {
  return (
    <div className={style.adminDashboard}>
      <div className={style.TopSection}>
        <h2>Painel de administração de usuários</h2>
        <label>
          <input type="text" />
          <button>Procurar</button>
        </label>
      </div>

      <div className={style.usersList}>
        <div className={style.user}></div>
      </div>
    </div>
  );
}
 
export default Dashboard;