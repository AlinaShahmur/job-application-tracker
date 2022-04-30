import { inputDebouncer } from "../../utils/utils"

function SearchPanel(props: any) {

    const onSearchHandler = inputDebouncer((value: any) => {
            props.onSearch(value)
        }, 1000)
    
    return (
        <input placeholder="company name of role" onKeyUp={(e: any) => onSearchHandler(e.target.value)}/>
    )
}

export default SearchPanel