import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { CorrsEvader } from "../config/constants";

interface useAxiosProps {
  url: string;
  type?: "GET" | "POST" | "PUT" | "DELETE";
  time?: number;
}

/**
 * useApiCall es un Hook que se encarga de realizar una petición HTTP
 * a una url dada. La petici´pn se hace a través de la API de AllOrigins
 * que convierte la respuesta en un objeto JSON.
 *
 * @param {{url: string, type?: "GET" | "POST" | "PUT" | "DELETE"}} props
 *    - url: la url a la que se va a realizar la petición.
 *    - type: el tipo de petici n HTTP que se va a realizar. Por defecto es "GET".
 *
 * @returns {{data: any, loading: boolean, complete: boolean}}
 *    - data: el resultado de la petición. Si la petición falla, es null.
 *    - loading: un booleano que indica si la petición está en curso.
 *    - complete: un booleano que indica si la petición ya ha finalizado.
 */
export default function useApiCall({ url, type = "GET" }: useAxiosProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const Initiated = useRef(false);

  useEffect(() => {
    function fetchData() {
      switch (type) {
        case "GET":
          axios
            .get(CorrsEvader + encodeURIComponent(url), {})
            .then((res: AxiosResponse) => {
              setData(JSON.parse(res.data.contents).feed.entry);
            })
            .catch((error: AxiosError) => {
              console.log("error : " + url, error);
            })
            .finally(() => {
              setLoading(false);
              setComplete(true);
            });

          break;
        case "POST": // no need to develop
          break;
        case "PUT": // no need to develop
          break;
        case "DELETE": // no need to develop
          break;
      }
    }
    if (!Initiated.current) {
      Initiated.current = true;
      setLoading(true);
      setComplete(false);
      fetchData();
    }
  }, [url, type, loading, complete]);

  return { data, loading, complete };
}
