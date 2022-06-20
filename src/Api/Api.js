export const APIFetchRepos = (payload, currentPage, perPage) => fetch(`https://api.github.com/search/repositories?q=${payload}&sort=stars&per_page=${perPage}&page=${currentPage}`).then(response => response.json());
export const APIFetchReposPage = (repo, user) => fetch(`https://api.github.com/repos/${repo}/${user}`).then(response => response.json());