
import React from 'react'
import { Link } from 'react-router-dom'
import { ApplicationDoc } from '../../types'
import { STATUS_AND_COLORS } from '../../utils/constants'
import { pretiffyDate } from '../../utils/utils'
import StatusIcon from '../Icons/StatusIcon'
import styles from './ApplicationItem.module.css'


export const ApplicationItem : React.FC<{item: ApplicationDoc}> = (props: any) => {
    const { pathname } = window.location;
    return (
        <div className = {styles['application-item']}>
            <div>
                <Link className= {styles['role_link']} to={`${pathname}/${props.item._id}`} state = {props}>{props.item.role}</Link>
            </div>
            <div className = {styles['role']}>
                {props.item.company_name}
            </div>
            <div className = {styles['status']} 
            >  
                <StatusIcon color = {STATUS_AND_COLORS[props.item.status]} label = {props.item.status}/>
            </div>
            <div>
                {pretiffyDate(props.item.start_date)}
            </div>
        </div>
    )
}

export default ApplicationItem