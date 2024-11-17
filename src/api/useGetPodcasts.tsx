import { useContext, useEffect } from "react";
import useApiCall from "@Hooks/useApiCall";
import { CacheMem } from "@Config/contextCache";

export interface ITunesListItem {
  name: string;
  image: string;
  author: string;
  id: number;
}

/**
 * Hook personalizado para obtener y administrar una lista de podcasts desde la API de iTunes.
 *
 * Este hook recupera los podcasts principales de un género específico y los almacena
 * en un caché de contexto. Verifica si la lista de podcasts ya está cargada para
 * evitar llamadas a la API redundantes.
 *
 * @returns {Object} Un objeto que contiene:
 * - podList: La lista de podcasts.
 * - loading: Booleano que indica si los datos aún se están obteniendo.
 * - complete: Booleano que indica si la operación de obtención se ha completado.
 */
export function useGetPodcasts() {
  const { podList, updateList } = useContext(CacheMem);

  const { data, loading, complete, error } = useApiCall({
    url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
    skip: podList.length > 0,
  });

  useEffect(() => {
    if (!loading && complete && podList.length === 0 && !error) {
      updateList(
        data.feed.entry.map(item => {
          return {
            name: item.title.label,
            image: item["im:image"][1].label,
            author: item["im:artist"].label,
            id: item.id.attributes["im:id"],
          };
        })
      );
    }
  }, [data, complete, loading, podList, updateList]);

  return { podList, loading, complete };
}
