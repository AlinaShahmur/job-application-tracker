import styles from './Wrapper.module.css'


function Wrapper(props: any) {
    return (
        <div style={{height: props.height, width: props.width}} className = {styles.wrapper}>
            {props.children}
        </div>
    )
}

export default Wrapper;