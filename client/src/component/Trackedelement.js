import { FaTimes, FaBellSlash, FaBell } from 'react-icons/fa'
import './List.css'

const Trackedelement = ({ tracked, onDelete, onToggle }) => {
    return (
        <tr>
            <td>{tracked.drugname} </td>
            <td>{tracked.firstday}</td>
            <td>{tracked.lastday}</td>
            <td>{tracked.frequency}</td>
            <td>{tracked.note}</td>
            <td style={{padding:'10px'}}><FaTimes style={{ color: 'lightcoral', cursor: 'pointer', fontSize: '20px',padding:'0px'}} onClick={() => onDelete(tracked.id)} /></td>
            <td style={{padding:'10px'}}>
                {
                    tracked.reminder ? (
                        <FaBell style={{ color: 'lightgreen', cursor: 'pointer', fontSize: '20px',padding:'0px' }} onClick={() => onToggle(tracked.id)} />
                    ) : (
                        <FaBellSlash style={{ color: 'lightcoral', cursor: 'pointer', fontSize: '20px',padding:'0px' }} onClick={() => onToggle(tracked.id)} />
                    )
                }
            </td>
        </tr>
    )
}

export default Trackedelement
