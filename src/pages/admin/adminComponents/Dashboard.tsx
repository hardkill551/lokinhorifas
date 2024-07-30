import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import style from '../admin.module.css'

const Dashboard = () => {
  type UserInfoTable = {
    id: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
    tradeLink: string;
    created: string;
  }

  const tempArray: UserInfoTable[] = []
  const [ users, setUsers ] = useState<UserInfoTable[]>([])
  const [ usersOptions, setUsersOptions ] = useState<UserInfoTable[]>([])
  const [ tradeLinkOptions, setTradeLinkOptions ] = useState<UserInfoTable[]>([])
  const [ order, setOrder ] = useState(true)
  const [ lastClicked, setLastClicked ] = useState('')

  const [ searchValue, setSearchValue ] = useState('')

  const searchRef = useRef<HTMLInputElement>(null)

  const emails = [
    "emma@example.com",
    "liam@example.com",
    "olivia@example.com",
    "noah@example.com",
    "ava@example.com",
    "elijah@example.com",
    "sophia@example.com",
    "james@example.com",
    "isabella@example.com",
    "william@example.com",
    "charlotte@example.com",
    "benjamin@example.com",
    "amelia@example.com",
    "lucas@example.com",
    "mia@example.com",
    "henry@example.com",
    "harper@example.com",
    "alexander@example.com",
    "evelyn@example.com",
    "michael@example.com",
    "abigail@example.com",
    "ethan@example.com",
    "ella@example.com",
    "daniel@example.com",
    "avery@example.com",
    "matthew@example.com",
    "sofia@example.com",
    "joseph@example.com",
    "scarlett@example.com",
    "david@example.com"
  ]

  const tradeLinks = [
    "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=abc123",
    "https://steamcommunity.com/tradeoffer/new/?partner=987654321&token=def456",
    "https://steamcommunity.com/tradeoffer/new/?partner=234567890&token=ghi789",
    "https://steamcommunity.com/tradeoffer/new/?partner=876543210&token=jkl012",
    "https://steamcommunity.com/tradeoffer/new/?partner=345678901&token=mno345",
    "https://steamcommunity.com/tradeoffer/new/?partner=765432109&token=pqr678",
    "https://steamcommunity.com/tradeoffer/new/?partner=456789012&token=stu901",
    "https://steamcommunity.com/tradeoffer/new/?partner=654321098&token=vwx234",
    "https://steamcommunity.com/tradeoffer/new/?partner=567890123&token=yz5678",
    "https://steamcommunity.com/tradeoffer/new/?partner=543210987&token=abc234",
    "https://steamcommunity.com/tradeoffer/new/?partner=678901234&token=def567",
    "https://steamcommunity.com/tradeoffer/new/?partner=432109876&token=ghi890",
    "https://steamcommunity.com/tradeoffer/new/?partner=789012345&token=jkl123",
    "https://steamcommunity.com/tradeoffer/new/?partner=321098765&token=mno456",
    "https://steamcommunity.com/tradeoffer/new/?partner=890123456&token=pqr789",
    "https://steamcommunity.com/tradeoffer/new/?partner=210987654&token=stu012",
    "https://steamcommunity.com/tradeoffer/new/?partner=901234567&token=vwx345",
    "https://steamcommunity.com/tradeoffer/new/?partner=109876543&token=yz6789",
    "https://steamcommunity.com/tradeoffer/new/?partner=012345678&token=abc345",
    "https://steamcommunity.com/tradeoffer/new/?partner=987654320&token=def678",
    "https://steamcommunity.com/tradeoffer/new/?partner=123456788&token=ghi901",
    "https://steamcommunity.com/tradeoffer/new/?partner=876543219&token=jkl234",
    "https://steamcommunity.com/tradeoffer/new/?partner=234567889&token=mno567",
    "https://steamcommunity.com/tradeoffer/new/?partner=765432108&token=pqr890",
    "https://steamcommunity.com/tradeoffer/new/?partner=345678900&token=stu123",
    "https://steamcommunity.com/tradeoffer/new/?partner=654321097&token=vwx456",
    "https://steamcommunity.com/tradeoffer/new/?partner=456789011&token=yz7890",
    "https://steamcommunity.com/tradeoffer/new/?partner=543210986&token=abc456",
    "https://steamcommunity.com/tradeoffer/new/?partner=567890122&token=def789",
    "https://steamcommunity.com/tradeoffer/new/?partner=432109875&token=ghi012"
  ]


  const formatarDataHoraAtual = () => {
    const agora = new Date(Date.now())

    const dia = String(agora.getDate()).padStart(2, '0')
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0')
    const minutos = String(agora.getMinutes()).padStart(2, '0')

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`
  }

  useEffect(() => {
    

    for(let i = 0; i < 88; i++) {
      tempArray.push({
        id: `${i}`,
        email: emails[Math.floor(Math.random() * emails.length)],
        phoneNumber: '',
        isAdmin: Math.floor(Math.random() * 2) ? true : false,
        tradeLink: tradeLinks[Math.floor(Math.random() * tradeLinks.length)],
        created: formatarDataHoraAtual(),
      })
    }

    setUsers(tempArray)
  }, [])

  const filterByTableNumber = () => {
    if(order) {
      setUsers(users.sort((a: UserInfoTable, b: UserInfoTable) => Number(b.id) - Number(a.id)))
      setOrder(false)
    } else {
      setUsers(users.sort((a: UserInfoTable, b: UserInfoTable) => Number(a.id) - Number(b.id)))
      setOrder(true)
    }

    setLastClicked('number')
  }

  const filterByEmail = () => {
    if(order) {
      setUsers(users.sort((a, b) => a.email.localeCompare(b.email)))
      setOrder(false)
    } else {
      setUsers(users.sort((a, b) => a.email.localeCompare(b.email)).reverse())
      setOrder(true)
    }

    setLastClicked('email')
  }

  const filterByTradeLink = () => {
    if(order) {
      setUsers(users.sort((a, b) => a.tradeLink.localeCompare(b.tradeLink)))
      setOrder(false)
    } else {
      setUsers(users.sort((a, b) => a.tradeLink.localeCompare(b.tradeLink)).reverse())
      setOrder(true)
    }

    setLastClicked('tradeLink')
  }

  const filterByAdmin = () => {
    if(order) {
      setUsers(users.sort((a, b) => Number(a.isAdmin) - Number(b.isAdmin)))
      setOrder(false)
    } else {
      setUsers(users.sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin)))
      setOrder(true)
    }

    setLastClicked('admin')
  }

  const handleSearch = () => {
    const searchReference = searchRef.current
    if(!searchReference) return

    setSearchValue(searchReference.value)

    if(searchReference.value == '') {
      setUsersOptions([])
      setTradeLinkOptions([])
    }
    else {
      setUsersOptions(users.filter(item => item.email.includes(searchReference.value)))
      setTradeLinkOptions(users.filter(item => item.tradeLink.includes(searchReference.value)))
    }
  }

  const handleSearchSelectionEmail = (id:string, email:string) => {
    setSearchValue(email)
    setUsers(users.sort((a, b) => {
      if (a.email === email) return -1
      if (b.email === email) return 1
      return 0
    }))
  }

  const handleSearchSelectionTradeLink = (id:string, tradeLink:string) => {
    setSearchValue(tradeLink)
    setUsers(users.sort((a, b) => {
      if (a.tradeLink === tradeLink) return -1
      if (b.tradeLink === tradeLink) return 1
      return 0
    }))
  }

  const handleBlur = () => {
    setTimeout(() => {
      setUsersOptions([])
      setTradeLinkOptions([])
    }, 200);
  }



  return (
    <div className={style.adminDashboard}>
      <div className={style.DashboardWrapper}>
        <div className={style.TopSection}>
          <h2>Painel de administração de usuários</h2>
          <label>
            <input type="text" onBlur={() => handleBlur()} name='search' onChange={() => handleSearch()} value={searchValue} ref={searchRef}/>
            {(usersOptions.length > 0 || tradeLinkOptions.length > 0) && 
            <div className={style.options}>
              <ul>
                {usersOptions.length > 0 && <h3>users</h3>}
                {usersOptions.map(item => <li onClick={() => handleSearchSelectionEmail(item.id, item.email)} key={uuidv4()}>{item.email}</li>)}
                {tradeLinkOptions.length > 0 && <h3>tradelink</h3>}
                {tradeLinkOptions.map(item => <li onClick={() => handleSearchSelectionTradeLink(item.id, item.tradeLink)} key={uuidv4()}>{item.email}</li>)}
              </ul>
            </div>}
            <button>Procurar</button>
          </label>
        </div>
        <div className={style.tableViewport}>
          <table>
            <thead>
              <tr>
                <th onClick={() => filterByTableNumber()}># {lastClicked == 'number' ?order ? '^' : 'v' : ''}</th>
                <th onClick={() => filterByEmail()}>e-mail {lastClicked == 'email' ?order ? '^' : 'v' : ''}</th>
                <th onClick={() => filterByAdmin()}>admin {lastClicked == 'admin' ?order ? '^' : 'v' : ''}</th>
                <th onClick={() => filterByTradeLink()}>tradelink {lastClicked == 'tradeLink' ?order ? '^' : 'v' : ''}</th>
                <th>criação</th>
              </tr>
            </thead>
            <tbody>
              {users.map(item =>
              <tr key={uuidv4()} className={style.user}>
                <th>{item.id}</th>
                <th>{item.email}</th>
                <th>{item.isAdmin ? 'sim' : 'não'}</th>
                <th>{item.tradeLink}</th>
                <th>{item.created}</th>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
export default Dashboard;