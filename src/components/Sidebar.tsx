import { useSidebarState } from "../contexts/SidebarContext";

import { useRouter } from "next/router";

const Sidebar = () => {
  const { sidebarView, toggleSidebar } = useSidebarState() as { sidebarView:boolean, toggleSidebar:Function }

  const router = useRouter()

  return (
    <section className={sidebarView ? "Sidebar mobile tablet visible" : "Sidebar mobile tablet"}>
      <div className="SidebarWrapper">
        <ul className="MainNavigation">
          <li onClick={() => {
            router.push('/#Home')
            toggleSidebar()
            }}>Home</li>
          <li onClick={() => {
            router.push('/#Vantagens')
            toggleSidebar()
            }}>Vantagens</li>
          <li onClick={() => {
            router.push('/#Grupos')
            toggleSidebar()
            }}>Grupos</li>
          <li onClick={() => {
            router.push('/#SobreNos')
            toggleSidebar()
            }}>Sobre Nós</li>
        </ul>
        <button>Faça parte!</button>
        <ul className="Socials">
          <li><a target="_blank" href="https://api.whatsapp.com/send?phone=5586981088012">Whatsapp</a></li>
          <li><a target="_blank" href="https://instagram.com/lokinhoskins">Instagram</a></li>
        </ul>
      </div>
    </section>
  );
}
 
export default Sidebar;