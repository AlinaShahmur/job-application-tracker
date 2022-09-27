import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';
import { fetchData } from '../../utils/request_client';
import Loader from '../UI/Loader';
import Pagination from '../UI/Pagination';
import SearchPanel from '../UI/SearchPanel';
import TableHeader from '../UI/TableHeader';
import ApplicationItem from './ApplicationItem';
import styles from './Applications.module.css'

function Applications() {

    const { getIdTokenClaims } = useAuth0();
    
    const [applications, setApplications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageLimit, setPageLimit] = useState(4)
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpSort, setIsUpSort] = useState(false);
    const process = useSelector((state: any) => state.process.currentProcess);

    useEffect( () => {
        async function getApplications() {
            const token: any = await getIdTokenClaims();
            const url = `${BASE_URL}/applications?skip=${(currentPage-1)*limit}&limit=${limit}&queryString=${searchQuery}&sortType=${isUpSort ? 'desc' : 'asc'}`
            const res = await fetchData('get', null, url, token.__raw, process._id);
            
            setPages(Math.ceil(res.totalItems / limit))
            setApplications(res.applications);
            setIsLoading(false);
        }
        getApplications();

    },[currentPage,searchQuery,isUpSort])

    const onSearchHandler = (searchString: string) => {
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
                        applications.map((app: any) => <ApplicationItem key = {app._id} item = {app}/>) :
                        <h2>There are no applications</h2>
    return (
        <div className = {styles.applications}>

                <h1>{process.name}</h1>
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