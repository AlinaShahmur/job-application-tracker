import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL_DEV } from '../../../utils/constants';
import { fetchData } from '../../../utils/request_client';
import Loader from '../../UI/Loader';
import Pagination from '../../UI/Pagination';
import SearchPanel from '../../UI/SearchPanel';
import TableHeader from '../../UI/TableHeader';
import ApplicationItem from './ApplicationItem';
import styles from './Applications.module.css'

function Applications() {
    const [applications, setApplications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageLimit, setPageLimit] = useState(4)
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpSort, setIsUpSort] = useState(false);
    useEffect( () => {
        const query = [{key:'skip', value:0},{key:'limit', value:10},{key:'queryString', value:''}]
        const url = `${BASE_URL_DEV}/applications?skip=${(currentPage-1)*limit}&limit=${limit}&queryString=${searchQuery}&sortType=${isUpSort ? 'desc' : 'asc'}`
        fetchData('get', null, url)
        .then(res => {
            console.log('fetch data')
            setPages(Math.ceil(res.totalCount / limit))
            setApplications(res.data);
            setIsLoading(false);
        })
        .catch(err =>{
            console.log(err)
        })
    },[currentPage,searchQuery,isUpSort])

    const onSearchHandler = (searchString: string) => {
        console.log(searchString)
        setCurrentPage(1);
        setSearchQuery(searchString);
    }
    const passCurrentState = (curPage: any) => {
        setCurrentPage(curPage)
    }
    const onSortClick = (isUpSort:boolean ) => {
        setIsUpSort(isUpSort);
    }
    const appContent = applications.length > 0 ? 
                        applications.map((app: any) => <ApplicationItem item = {app}/>) :
                        <h2>There are no applications</h2>
    return (
        <div className = {styles.applications}>

                <h1>My Applications</h1>
                <SearchPanel onSearch = {onSearchHandler}/>
            <div className={styles.table}>
                <TableHeader onSortByDateClick = {onSortClick}/>
                {isLoading ? <Loader/> : appContent}
            </div>
            <Pagination 
                className = {styles.pagination}
                currPage = {currentPage}
                passParameters = {passCurrentState}
                pageLimit = {pageLimit}
                pages = {pages}/>
        </div>
        
    )
}

export default Applications