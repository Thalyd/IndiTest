import { ITunesListItem, useGetPodcasts } from "@Api/useGetPodcasts";

import Card from "@Modules/list/card/card";
import Spinner from "@Components/spinner/spinner";
import "./list.scss";
import { useEffect, useState } from "react";
import { normalize } from "@Utils/normalize";
import SearchTool from "@Modules/list//searchTool/searchTool";
import NoResults from "@Modules/list//noResults/noResults";

/**
 * Un componente funcional que muestra una lista de podcasts.
 *
 * Este componente obtiene una lista de podcasts del hook useGetPodcasts
 * y los muestra como tarjetas. Incluye una barra de búsqueda para filtrar
 * los podcasts mostrados por nombre o autor. Mientras se cargan los datos,
 * se muestra un indicador. Si ningún podcast coincide con los criterios de búsqueda,
 * se muestra un mensaje "Sin resultados".
 *
 * @returns {JSX.Element} Un div que contiene la lista de podcasts o un indicador de carga.
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
