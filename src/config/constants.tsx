/**
 *   @CorrsEvader : La url de la API de AllOrigins para obtener la respuesta en formato JSON.
 *   @CacheMemory : La duración de la memoria cache en milisegundos.
 *
 */

export const CorrsEvader = "https://api.allorigins.win/get?url=";

const HoursEquals = 1000 * 60 * 60;
export const CacheMemory = HoursEquals * 24;
export const EpisodesPerRequest = 20;
