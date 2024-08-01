import { Dispatch, useEffect, useRef, useState } from 'react';
import style from '../admin.module.css'
import { v4 as uuidv4 } from 'uuid';
import { RaffleInfoTable } from 'utils/interfaces';
import { useRaffleContext } from 'contexts/RaffleContext';

const RaffleDashboard = () => {
  const { raffle, setRaffle } = useRaffleContext() as { raffle: RaffleInfoTable[]; setRaffle: Dispatch<React.SetStateAction<RaffleInfoTable[]>> }
  const [ raffleOptions, setRaffleOptions ] = useState<RaffleInfoTable[]>([])
  const [ skinsOptions, setSkinsOptions ] = useState<RaffleInfoTable[]>([])
  const [ order, setOrder ] = useState(true)
  const [ lastClicked, setLastClicked ] = useState('')

  const [ searchValue, setSearchValue ] = useState('')

  const searchRef = useRef<HTMLInputElement>(null)

  const isOrder = order ? '^' : 'v'

  const handleSearch = () => {
    const searchReference = searchRef.current
    if(!searchReference) return

    setSearchValue(searchReference.value)

    if(searchReference.value == '') {
      setRaffleOptions([])
      setSkinsOptions([])
    }
    else {
      setRaffleOptions(raffle.filter(item => item.state.toLocaleLowerCase().replaceAll(' ', '') == (searchReference.value).toLocaleLowerCase().replaceAll(' ', '')))
      setSkinsOptions(raffle.filter(item => item.skins.join().toLocaleLowerCase().replaceAll(' ', '').includes((searchReference.value).toLocaleLowerCase().replaceAll(' ', ''))))
    }
  }

  const handleSearchSelectionState = (state:string) => {
    setSearchValue(state)
    setRaffle(raffle.sort((a, b) => {
      if (a.state == state) return -1
      if (b.state == state) return 1
      return 0
    }))
  }

  const handleSearchSelectionSkin = (skins: string[]) => {
    setSearchValue('skins')
    setRaffle(raffle.sort((a, b) => {
      if (a.skins === skins) return -1
      if (b.skins.join().toLocaleLowerCase().replaceAll(' ', '').includes((skins).join().toLocaleLowerCase().replaceAll(' ', ''))) return 1
      return 0
    }))
  }

  const filterByTableNumber = () => {
    if(order) {
      setRaffle(raffle.sort((a, b) => Number(b.id) - Number(a.id)))
      setOrder(false)
    } else {
      setRaffle(raffle.sort((a, b) => Number(a.id) - Number(b.id)).reverse())
      setOrder(true)
    }

    setLastClicked('number')
  }

  const filterByRaffleName = () => {
    if(order) {
      setRaffle(raffle.sort((a, b) => a.name.localeCompare(b.name)))
      setOrder(false)
    } else {
      setRaffle(raffle.sort((a, b) => a.name.localeCompare(b.name)).reverse())
      setOrder(true)
    }

    setLastClicked('name')
  }

  const filterByState = () => {
    if(order) {
      setRaffle(raffle.sort((a, b) => a.state.localeCompare(b.state)).reverse())
      setOrder(false)
    } else {
      setRaffle(raffle.sort((a, b) => a.state.localeCompare(b.state)))
      setOrder(true)
    }

    setLastClicked('state')
  }

  const filterByTotal = () => {
    if(order) {
      setRaffle(raffle.sort((a, b) => Number(a.totalValue) - Number(b.totalValue)).reverse())
      setOrder(false)
    } else {
      setRaffle(raffle.sort((a, b) => Number(a.totalValue) - Number(b.totalValue)))
      setOrder(true)
    }

    setLastClicked('total')
  }

  const filterByUnit = () => {
    if(order) {
      setRaffle(raffle.sort((a, b) => Number(a.unitValue) - Number(b.unitValue)).reverse())
      setOrder(false)
    } else {
      setRaffle(raffle.sort((a, b) => Number(a.unitValue) - Number(b.unitValue)))
      setOrder(true)
    }

    setLastClicked('unit')
  }

  const filterByNumParticipants = () => {
    if(order) {
      setRaffle(raffle.sort((a, b) => Number(a.participants) - Number(b.participants)).reverse())
      setOrder(false)
    } else {
      setRaffle(raffle.sort((a, b) => Number(a.participants) - Number(b.participants)))
      setOrder(true)
    }

    setLastClicked('participants')
  }

  const filterByMaxParticipants = () => {
    if(order) {
      setRaffle(raffle.sort((a, b) => Number(a.participants) - Number(b.participants)).reverse())
      setOrder(false)
    } else {
      setRaffle(raffle.sort((a, b) => Number(a.participants) - Number(b.participants)))
      setOrder(true)
    }

    setLastClicked('maxParticipants')
  }

  const filterBySkins = () => {
    if(order) {
      setRaffle(raffle.sort((a, b) => a.skins.join().localeCompare(b.skins.join())))
      setOrder(false)
    } else {
      setRaffle(raffle.sort((a, b) => a.skins.join().localeCompare(b.skins.join())).reverse())
      setOrder(true)
    }

    setLastClicked('skins')
  }

  const handleBlur = () => {
    setTimeout(() => {
      setRaffleOptions([])
      setSkinsOptions([])
    }, 200);
  }

  return (
    <div className={style.adminDashboard}>
      <div className={style.DashboardWrapper}>
        <div className={style.TopSection}>
          <h2>Painel de administração de Rifas</h2>
          <label>
            <input type="text" onBlur={() => handleBlur()} name='search' onChange={() => handleSearch()} value={searchValue} ref={searchRef}/>
            {(raffleOptions.length > 0 || skinsOptions.length > 0) && 
            <div className={style.options}>
              <ul>
                {raffleOptions.length > 0 && <h3>estado</h3>}
                {raffleOptions.length > 0 && raffleOptions.map(item => <li onClick={() => handleSearchSelectionState(item.state)} key={uuidv4()}>{item.name}</li>)}
                {skinsOptions.length > 0 && <h3>armas</h3>}
                {skinsOptions.length > 0 && skinsOptions.map(item => <li onClick={() => handleSearchSelectionSkin(item.skins)} key={uuidv4()}>{item.skins.join(', ')}</li>)}
              </ul>
            </div>}
            <button>Procurar</button>
          </label>
        </div>
        <div className={style.tableViewport}>
          <table>
            <thead>
              <tr>
                <th onClick={() => filterByTableNumber()}># {lastClicked == 'number' ? isOrder : ''}</th>
                <th onClick={() => filterByRaffleName()}>nome {lastClicked == 'name' ? isOrder : ''}</th>
                <th onClick={() => filterByState()}>estado {lastClicked == 'state' ? isOrder : ''}</th>
                <th onClick={() => filterByTotal()}>valor total {lastClicked == 'total' ? isOrder : ''}</th>
                <th onClick={() => filterByUnit()}>valor unitário {lastClicked == 'unit' ? isOrder : ''}</th>
                <th onClick={() => filterByNumParticipants()}># de participantes {lastClicked == 'participants' ? isOrder : ''}</th>
                <th onClick={() => filterByMaxParticipants()}>max participantes {lastClicked == 'maxParticipants' ? isOrder : ''}</th>
                <th onClick={() => filterBySkins()}>armas rifadas {lastClicked == 'skins' ? isOrder : ''}</th>
                <th>realizado</th>
                <th>criação</th>
              </tr>
            </thead>
            <tbody>
              {raffle && raffle.map(item =>
              <tr key={uuidv4()} className={style.user}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.state}</th>
                <th>R$ {(item.totalValue).toFixed(2).toString().replace('.', ',')}</th>
                <th>R$ {(item.unitValue).toFixed(2).toString().replace('.', ',')}</th>
                <th>{item.participants}</th>
                <th>{item.maxParticipants}</th>
                <th>{item.skins.join(', ')}</th>
                <th>{item.ocurred}</th>
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
 
export default RaffleDashboard;