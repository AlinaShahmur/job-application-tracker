

export default function TextInput(props: any) {

    return (
        <div className = {`${props.className} input ${props.hasError ? "invalid" : ""}`}>
            <label htmlFor={props.id}> 
                {props.label}
            </label> <br></br>
            <input type={props.type}
                    id = {props.id} 
                    onChange = {props.onChange}
                    placeholder = {props.placeholder}
                    value = {props.value}
                    onBlur = {props.onBlur}/>
            {props.hasError && <p className = 'error-text'>The value is not valid</p>}
                    
        </div>
    )
}