import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';

import { fetchRepos } from "../../store/action";
import { currentPageData, errorData, loadingData, perPageData, reposData, totalCountData } from "../../store/selector";
import ReposItem from "./components/ReposItem";
import { setCurrentPage } from "../../store";
import { createPages } from "../../pagesCreator/pagesCreator";

const Main = () => {
    const repos = useSelector(reposData);
    const currentPage = useSelector(currentPageData);
    const totalCount = useSelector(totalCountData);
    const loading = useSelector(loadingData);
    const error =useSelector(errorData);
    const perPage = useSelector(perPageData); 
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const pages = [];
    const pagesCount = Math.ceil( totalCount/perPage );

    createPages(pages, pagesCount, currentPage)

    useEffect (() => {
        dispatch(fetchRepos(value, currentPage, perPage));
    }, [currentPage, value, perPage]);

    const handleChange = (e) => {
        dispatch(setCurrentPage(1));
        setValue(e.target.value);
    }

    const reposFilter = repos.filter((reposinfo) => {
        return reposinfo.name.toLowerCase().includes(value.toLowerCase())
    });
    
    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else if (error) {
        return (
            <div>
                Error +-+
            </div>
        )
    } else {
        return (<>
            <section className="searchSection">
                <div className="Input">
                    <input type="text" id="input" className="Input-text" placeholder="Search" onChange={handleChange} autoComplete='off'></input>
                </div>
            </section>
    
            <section className="reposSection">
                <div className="reposCardBox">
                    {reposFilter.map((item) => (  
                            <ReposItem 
                                repo={item}
                                link={item.html_url} 
                                commitdate={item.updated_at} 
                                stars={item.stargazers_count} 
                                reposname={item.name} 
                                key={item.id}>
                            </ReposItem>
                    ))}
                </div>
            </section>
    
            <section className="paginatorBox">
                <div className="paginator">
                    {pages.map((page, index) => <span key={index} className={currentPage === page ? "current-page" : "page"} onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
                </div>
            </section></>
        )
    }
}

export default Main; 