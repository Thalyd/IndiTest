import { useContext, useEffect } from "react";
import useApiCall from "@Hooks/useApiCall";
import { CacheMem } from "@Config/contextCache";
import { EpisodesPerRequest } from "@Config/constants";

export interface PodData {
  name: string;
  image: string;
  author: string;
  id: number;
  description: string;
  count: number;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  date: Date;
  duration: Date;
  description: string;
  url: string;
}

interface UseGetPodcastSingleProps {
  id: string;
}

export function useGetPodcastSingle({ id }: UseGetPodcastSingleProps) {
  const { podsData, updatePodList, getPodcast, getEpisode } =
    useContext(CacheMem);

  const { data, loading, complete, error } = useApiCall({
    url:
      "https://itunes.apple.com/lookup?id=" +
      id +
      "&media=podcast&entity=podcastEpisode&limit=" +
      EpisodesPerRequest,
    skip:
      podsData.length > 0 &&
      podsData.find((pod: PodData) => pod.id === Number(id)) !== undefined,
  });

  useEffect(() => {
    if (!loading && complete && !getPodcast(id) && !error) {
      updatePodList({
        name: data.results[0].collectionName,
        image: data.results[0].artworkUrl600,
        author: data.results[0].artistName,
        id: data.results[0].collectionId,
        description: data.results[0].description,
        count: data.results[0].trackCount,
        episodes: data.results
          .filter((_, index) => index > 0)
          .map((episode: any) => ({
            id: episode.trackId,
            title: episode.trackName,
            date: new Date(episode.releaseDate),
            duration: new Date(episode.trackTimeMillis),
            description: episode.description,
            url: episode.previewUrl,
          })),
      });
    }
  }, [
    data,
    complete,
    loading,
    podsData,
    updatePodList,
    error,
    getPodcast,
    id,
    getEpisode,
  ]);

  return { podsData, loading, complete, getPodcast, getEpisode };
}
