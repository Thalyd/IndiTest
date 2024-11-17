import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { CorrsEvader } from "@Config/constants";

interface useAxiosProps {
  url: string;
  type?: "GET" | "POST" | "PUT" | "DELETE";
  time?: number;
  skip?: boolean;
}

/**
 * Hook para realizar una petición HTTP a una API.
 *
 * El Hook devuelve un objeto con las siguientes propiedades:
 * - datos: el resultado de la petición en formato JSON.
 * - cargando: un booleano que indica si la petición está en curso.
 * - complete: un booleano que indica si la petici n ha finalizado.
 *
 * Se pueden pasar los siguientes por metros:
 * - url: la URL de la petición.
 * - tipo: el tipo de petición ("GET", "POST", "PUT", "DELETE").
 * - skip: un booleano que indica si se debe omitir la petición n.
 *
 * La petición se env a solo si el par metro skip es falso y si el gancho
 * no ha sido llamado anteriormente.
 *
 * @example
 * const { datos, cargando, completo } = useApiCall({
 * url: "https://api.example.com/data",
 * tipo: "GET",
 * });
 */
export default function useApiCall({
  url,
  type = "GET",
  skip = false,
}: useAxiosProps) {
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
    if (!Initiated.current && !skip) {
      Initiated.current = true;
      setLoading(true);
      setComplete(false);
      fetchData();
    }
  }, [url, type, loading, complete, skip]);

  return { data, loading, complete };
}
