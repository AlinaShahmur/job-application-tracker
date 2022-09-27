import { ICONS } from '../../utils/constants'
import RoundButton from './RoundButton'
import classes from './Modal.module.css'

function Modal(props: any) {
    return (
        <div>
            <div className = {classes.backdrop} onClick = {props.onClose}></div>
            <div className = {classes.modal}>
                <div className={classes['close-btn']}>
                    <RoundButton 
                        onClick = {props.onClose} 
                        background = "#ffaf94" 
                        color = "#FFFFFF" 
                        path = {ICONS.path.close_icon}
                        viewBox = {ICONS.viewBox.close_icon}
                        >
                    </RoundButton>
                </div>

                <div className = {classes.content}>{props.children}</div>
            </div>
        </div>
    )
}

export default Modal