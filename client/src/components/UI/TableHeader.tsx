import { useState } from 'react'
import { iconsArrowPath } from '../../utils/constants'
import ArrowIcon from '../Icons/ArrowIcon'
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
               <span onClick = {onSortClick} className = {styles['sort-btn']}><ArrowIcon path = {isUpSort ? iconsArrowPath.up : iconsArrowPath.down}
                        style = {{width: 13, height: 13, fill: "#000000"}}/></span> 
        </div>
    </div>
    )
}

export default TableHeader