import useApiCall from "../../../hooks/useApiCall"
import Card from "../../shared/card/card"
import Spinner from "../../shared/spinner/spinner"
import "./list.scss"

/**
 * A List component that displays a list of podcasts.
 *
 * The component fetches a list of podcasts from the iTunes API
 * and displays them in a div with the class "componentList". If
 * the data is still loading, a Spinner component is displayed
 * instead.
 *
 * @returns {JSX.Element}
 */
export default function List(){


    const {data,loading} = useApiCall({url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"})

    return (
        <div className="componentList">
            <h1>Podcasts</h1>
            <div>{loading && <Spinner/>}</div>
            <ol>
                {(!loading && data) && data.map((item) => <Card item={item} />)}
            </ol>
            
        </div>
    )
}