import { useEffect, useState } from "react";
import {  ICONS } from "../../utils/constants";
import SvgIcon from "../Icons/SvgIcon";
import styles from './Pagination.module.css'

function Pagination(props: any) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        props.passParameters(currentPage);
    },[currentPage]);

    useEffect(() =>{
        setCurrentPage(props.currPage)
    },[props.currPage])

    const goToPreviousPage = () => {
        setCurrentPage(currentPage => currentPage-1)
    }
    const getPaginationGroup = () => {
        let start: number = Math.floor((currentPage - 1)/props.pageLimit) * props.pageLimit; 
        return new Array(props.pageLimit).fill(null).map((_, idx) => start + idx + 1);
    }
    const goToNextPage = () => {
        setCurrentPage(currentPage => currentPage+1)
    }
    const changePage = (event: any) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber)
    } 
    return (
        <div className={styles['pagination']}>
            <button 
                onClick={goToPreviousPage}
                className = {styles['side-btn']}
                disabled = {currentPage === 1}
            >
                <span>
                    <SvgIcon path = {ICONS.path.circle_chevrons.left}
                            viewBox = {ICONS.viewBox.circle_chevron}
                            style = {{width: 25, height: 25, fill: "#8a996c"}} 
                    />
                </span>
            </button>
        
            {getPaginationGroup().map((item) => (
            <button  
                className = {styles['btn-num']}
                key = {item}
                onClick = {changePage}
                disabled = {item > props.pages}
            >
                <span className={item === currentPage ? styles['active']: ''}>{item}</span> 
            </button>
            ))}
        
            <button
                onClick={goToNextPage}
                className = {styles['side-btn']}
                disabled = {currentPage === props.pages}
            >
                <span>
                    <SvgIcon path = {ICONS.path.circle_chevrons.right}
                            viewBox = {ICONS.viewBox.circle_chevron}
                            style = {{width: 25, height: 25,fill: "#8a996c" }}
                    />
                </span>
            </button>
    </div>
    )
}

export default Pagination