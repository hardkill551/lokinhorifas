import style from './admin.module.css'
import TopSection from './adminComponents/TopSection'
import Inventory from './adminComponents/SkinInventory';
import Dashboard from './adminComponents/Dashboard';

const Admin = () => {

  
  return (
    <section className={style.admin}>
      <div className={style.adminWrapper}>
        <TopSection />

        <Inventory />

        <Dashboard />
      </div>
    </section>
  );
}
 
export default Admin;