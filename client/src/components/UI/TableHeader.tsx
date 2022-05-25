import { useState } from 'react'
import { ICONS } from '../../utils/constants'
import SvgIcon from '../Icons/SvgIcon'
import styles from './TableHeader.module.css'

function TableHeader(props: any) {
    const [isUpSort, setIsUpSort] = useState(false)
    const onSortClick = () => {
        props.onSortByDateClick(!isUpSort);
        setIsUpSort(!isUpSort);
    }
    return (
    <div className = {styles['table-header']}>
        <div>Role</div>
        <div>Company Name</div>
        <div>Status</div>
        <div>
            Start Date
               <span onClick = {onSortClick} className = {styles['sort-btn']}>
                <SvgIcon path = {isUpSort ? ICONS.path.arrows.up :  ICONS.path.arrows.down}
                        style = {{width: 13, height: 13, fill: "#000000"}}
                        viewBox = {ICONS.viewBox.arrows}/>
                </span> 
        </div>
    </div>
    )
}

export default TableHeader