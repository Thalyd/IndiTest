import { ITunesListItem, useGetPodcasts } from "@Api/useGetPodcasts";

import Card from "@Modules/list/card/card";
import Spinner from "@Components/spinner/spinner";
import "./list.scss";
import { useEffect, useState } from "react";
import { normalize } from "@Utils/normalize";
import SearchTool from "@Modules/list//searchTool/searchTool";
import NoResults from "@Modules/list//noResults/noResults";

/**
 * Muestra una lista de podcasts.
 *
 * Este componente utiliza el hook `useGetPodcasts` para obtener la lista de
 * podcasts y muestra una lista de tarjetas con la informaci n de cada podcast.
 * Tambi n incluye un componente de b squeda que actualiza en tiempo real la
 * lista de tarjetas que se muestran.
 *
 * @returns {JSX.Element} Un JSX con la lista de tarjetas de podcasts.
 */
export default function List() {
  const { podList, loading } = useGetPodcasts();

  const [List, setList] = useState<ITunesListItem[]>([]);
  const [filtering, setFiltering] = useState("");

  useEffect(() => {
    setList(podList);
  }, [podList]);

  function search(value: ITunesListItem) {
    return (
      normalize(value.name).includes(normalize(filtering)) ||
      normalize(value.author).includes(normalize(filtering))
    );
  }

  function ghostify(card: ITunesListItem) {
    let exists = true;
    if (
      !List.filter(search)
        .map(el => el.id)
        .includes(card.id)
    ) {
      exists = false;
    }
    return exists;
  }

  return (
    <div className="podList">
      {loading ?
        <Spinner />
      : <div>
          <SearchTool
            UpdateParent={setFiltering}
            Count={List.filter(search).length}
            debounce={true} // false para desactivar debounce y ajustarse a la prueba
          />
          {List.filter(search).length === 0 && !loading && filtering && (
            <NoResults />
          )}
          <ol>
            {!loading &&
              List &&
              List.map((item, index) => (
                <Card item={item} key={index} ghost={ghostify(item)} />
              ))}
          </ol>
        </div>
      }
    </div>
  );
}
