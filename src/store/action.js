import { FETCH_REPOS } from './actionTypes';
import { FETCH_REPOS_PAGE } from './actionTypes';

export const fetchRepos = (value, currentPage, perPage) => ({type: FETCH_REPOS, payload: value, currentPage: currentPage, perPage: perPage});
export const fetchReposPage = (repo, user) => ({type: FETCH_REPOS_PAGE, repo: repo, user: user})