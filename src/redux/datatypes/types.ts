export interface Root_Redux {
    home: Home_Redux
}

export interface Home_Redux {
    url: Url_Redux
    genres: Genres_Redux
}

export interface Url_Redux {
    backdrop: string
    poster: string
    profile: string
}



export interface Genres_Redux {
    [id: number]: {
        id: number,
        name: string
    }
}
