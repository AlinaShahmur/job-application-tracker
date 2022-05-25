import { inputDebouncer } from "../../utils/utils"
import classes from './SearchPanel.module.css'

function SearchPanel(props: any) {

    const onSearchHandler = inputDebouncer((value: any) => {
            props.onSearch(value)
        }, 1000)
    
    return (
        <input className = {classes['search-input']} placeholder="company name of role" onKeyUp={(e: any) => onSearchHandler(e.target.value)}/>
    )
}

export default SearchPanel