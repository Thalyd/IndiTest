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
 * Hook para obtener la lista de podcasts.
 *
 * Este hook utiliza el contexto CacheMem para obtener el estado de la lista de
 * podcasts y actualizarlo. La lista se obtiene mediante una solicitud a la API
 * de iTunes y se actualiza en el estado del contexto.
 *
 * @returns {Object} Un objeto con tres propiedades:
 * - podList: la lista de podcasts.
 * - loading: booleano que indica si se est  obteniendo la lista de podcasts.
 * - complete: booleano que indica si la operaci n de obtenci n de la lista se ha
 *   completado.
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
  }, [data, complete, loading, podList, updateList, error]);

  return { podList, loading, complete };
}
