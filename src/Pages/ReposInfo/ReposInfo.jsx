import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"

import { fetchReposPage } from "../../store/action";
import { reposPageData } from "../../store/selector";

const ReposPage = () => {
    const {repos, user} = useParams();
    const reposPage = useSelector(reposPageData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReposPage(repos, user));
    }, [repos, user])

    console.log(reposPage)

    return (
        <div>
            <h1>{reposPage.name}</h1>
            <h2>{reposPage.owner?.login}</h2>
            <p><a href={reposPage.owner?.html_url}>jump to profile on GitHub</a></p>
            <img src={reposPage.owner?.avatar_url} alt="Error" />
            <p>{reposPage.stargazers_count}</p>
            <p>{reposPage.language}</p>
        </div>
    )
}

export default ReposPage