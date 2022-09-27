import styles from './TextInput.module.css'


export default function TextInput(props: any) {
    return (
        <div className = {`${props.className} input`}>
            <label htmlFor={props.id}> 
                {props.label}
            </label> <br></br>
            <input type={props.type}
                    id = {props.id} 
                    onChange = {props.onChange}
                    placeholder = {props.placeholder}
                    value = {props.value}/>
        </div>
    )
}