import styles from './StatusIcon.module.css';

function StatusIcon(props: any) {
    return (
        <div className = {styles['status_icon']} style={{backgroundColor: props.color}}>
            {props.label}
        </div>
    )
}

export default StatusIcon;