import { RaffleProvider } from 'contexts/RaffleContext';
import style from './admin.module.css'
import AdminForm from './adminComponents/AdminForm'
import Dashboard from './adminComponents/Dashboard'
import Receipt from './adminComponents/Receipt';
import RaffleDashboard from './adminComponents/RaffleDashboard';

const Admin = () => {
  return (
    <RaffleProvider>
      <section className={style.admin}>
        <div className={style.adminWrapper}>
          <div className={style.colGroup}>
            <div className={style.formGroup}>
              {Array.from({ length: 2 }, (_, i) => {
                const isFree = i == 0 ? false : true
                return <AdminForm key={i} isFree={isFree}
                />})}
            </div>
            <Receipt />
          </div>

          <RaffleDashboard />

          <Dashboard />
        </div>
      </section>
    </RaffleProvider>
  );
}
 
export default Admin;