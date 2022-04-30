import { useEffect, useState } from "react";
import { iconsArrowPath } from "../../utils/constants";
import ArrowIcon from "./ArrowIcon";
import styles from './Pagination.module.css'

function Pagination(props: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        props.passParameters(currentPage);
    },[currentPage]);

    useEffect(() =>{
        setCurrentPage(props.currPage)
    },[props.currPage])

    const passParameters = () => {

    }
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
                    <ArrowIcon path = {iconsArrowPath.left}
                                style = {{width: 15, height: 15, fill: "#37a67d"}} />
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
                    <ArrowIcon path = {iconsArrowPath.right}
                                    style = {{width: 15, height: 15,fill: '#37a67d' }}/>
                </span>
            </button>
    </div>
    )
}

export default Pagination