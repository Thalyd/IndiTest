import { useParams } from "react-router-dom";
import "./episode.scss";




export default function Episode() {
  const id = useParams().episodeId;

  return <div className="Episode">Episode {id}</div>;
}
