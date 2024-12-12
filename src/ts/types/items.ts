export type Item = {
    name: string,
    owner: { login: string, },
    stargazers_count: number,
    html_url: string,
}

export type Repositories = {
    items: Array<Item>,
}
