import { useEffect,useState } from "react";


const SearchForm=({search})=>{
    const [searchItem, setSearchItem]=useState("");


    const handleSubmit=(e)=>{
        e.preventDefault();
        search(searchItem)
    }
    const handleChange=(e)=>{
        setSearchItem(e.target.value);
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                onChange={handleChange}>
                </input>
                <button> Search</button>

            </form>
        </div>
    )
}

export default SearchForm;