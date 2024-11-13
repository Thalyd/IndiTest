

interface CardProps{
    item: ITunesListItem
};

export interface ITunesListItem {
    title: {label: string},
    id: {attributes: {"im:id": string}},

}

/**
 * A Card component that displays a podcast item from the iTunes API.
 *
 * The component is a simple list item with a class of "Card" and displays
 * the title of the podcast in a paragraph element.
 *
 * @param {{item: ITunesListItem}} props
 *    - item: the podcast item from the iTunes API to display
 *
 * @returns {JSX.Element} as Li element
 */
export default function Card({item}:CardProps){
    return (<li className="Card">
        <p>{item.title.label}</p>
    </li>)
}