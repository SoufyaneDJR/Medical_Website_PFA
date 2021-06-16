import { useState, useEffect } from 'react'
import { withRouter } from 'react-router';
import { useLocation } from 'react-router-dom'
import './MedicamentPage.css'
import axios from 'axios'

const MedicamentPage = () => {
    const [info, setInfo] = useState({
        drugname: '',
        presentation: '',
        distributeur: '',
        composition: '',
        statut: '',
        ppv: '',
        prixhos: '',
        indication: ''
    })
    const id = useLocation().pathname.split("=")[1]
    useEffect(() => {
        axios.get(`http://localhost:3002/medicament/id=${id}`).then(
            (res) => {
                const data = JSON.parse(JSON.stringify(res.data[0]))
                console.log(res)
                setInfo(data)
            }
        )
    }, [])
    console.log(info)
    return (
        <div className="medicamentcontainer">
            <h1 className="medicamentTitle">
                {info.drugname}
            </h1>
            <div className="medicamenttable">
                <table className="medicamentList">
                    <tr>
                        <th>Presentation : </th>
                        <td>{info.presentation}</td>
                    </tr>
                    <tr>
                        <th>Distributeur :</th>
                        <td>{info.distributeur}</td>
                    </tr>
                    <tr>
                        <th>Composition :</th>
                        <td>{info.composition}</td>
                    </tr>
                    <tr>
                        <th>Statut :</th>
                        <td>{info.statut}</td>
                    </tr>
                    <tr>
                        <th>PPV :</th>
                        <td>{`${info.ppv} dhs`}</td>
                    </tr>
                    <tr>
                        <th>Prix Hospitalier :</th>
                        <td>{`${info.prixhos} dhs`}</td>
                    </tr>
                    <tr>
                        <th className="lineheight">Indication :</th>
                        <td>{info.indication}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default withRouter(MedicamentPage)
