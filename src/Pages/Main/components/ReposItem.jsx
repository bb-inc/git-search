import { Link } from "react-router-dom";

const ReposItem = (props) => {
    const commit = props.commitdate.split('').splice(0, 10).join('');
    const repo = props.repo;

    return <div className="reposCard" key={props.id}>
                <div className="reposCardText">
                    <Link key={repo.name} to={`${repo.owner.login}/${repo.name}`}><h2>{props.reposname}</h2></Link>
                    <p><a href={props.link} className="gitHubLink">jump to the repository on GitHub</a></p>
                </div>
                <div className="reposCardInfo">
                    <h4>☆ {props.stars} stars</h4>
                    <p>Last commit date: {commit}</p>
                </div>
            </div>
}

export default ReposItem;