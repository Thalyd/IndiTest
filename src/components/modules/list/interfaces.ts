export interface ITunesResponse {
    contents: string,
    feed: {
        entry: ITunesListItem[]
    }
}

export interface ITunesListItem {
    title: {label: string},
    id: {attributes: {"im:id": string}},
}
