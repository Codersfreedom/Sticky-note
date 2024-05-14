import { IoMdAddCircleOutline } from "react-icons/io";
import './Searchbar.css';
const Searchbar = () => {


    return (

        <div className="search-container">

            <input type="text" placeholder="Add note..."

            />

            <IoMdAddCircleOutline id="add-btn"

            />

        </div>
    )
}

export default Searchbar
