import styles from './PopupDate.module.css'


function PopupDate(props: any) {
    return (
        <div className= {styles['popup-date']}>
            <p>{props.date}</p>
        </div>
    )
}

export default PopupDate