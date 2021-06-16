import './List.css'

const SearchedElement = ({tracked}) => {
    console.log(tracked.d_id)
    let urlpath =`/medicament/by_id=${tracked.d_id}`
    return (
        <tr className="trtr">
            <a href={urlpath} className="linkList"> <td>{tracked.drugname} </td></a>
        </tr>
    )
}
export default SearchedElement
