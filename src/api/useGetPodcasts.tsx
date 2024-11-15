import { useEffect, useState } from "react";
import useApiCall from "../hooks/useApiCall";

export interface ITunesListItem {
  name: string;
  image: string;
  author: string;
  id: number;
}

/**
 * useGetPodcasts es un hook que devuelve una lista de podcasts
 * tomada de la API de iTunes.
 *
 * @returns {Object}
 *    - PodcastList: una lista de objetos que contienen la
 *      información de cada podcast.
 *    - loading: un booleano que indica si la petición se
 *      encuentra en curso.
 *    - complete: un booleano que indica si la petición
 *      ya ha finalizado.
 */
export function useGetPodcasts() {
  const [PodcastList, setPodcastList] = useState<ITunesListItem[]>([]);

  const { data, loading, complete } = useApiCall({
    url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
  });

  useEffect(() => {
    if (!loading && complete) {
      setPodcastList(
        data.map(item => {
          return {
            name: item.title.label,
            image: item["im:image"][1].label,
            author: item["im:artist"].label,
            id: item.id.attributes["im:id"],
          };
        })
      );
    }
  }, [data, complete, loading]);

  return { PodcastList, loading, complete };
}
