import { lazy, Suspense } from "react";

interface IconProps {
  name: "Close" | "Play" | "Pause" | "Volume" | "Muted";
}
/**
 * Un componente funcional que importa y renderiza dinámicamente un ícono SVG.
 *
 * Este componente usa React.lazy y Suspense para cargar los componentes de ícono SVG
 * solo cuando es necesario, según la propiedad name proporcionada. Si el nombre dado no coincide
 * con ningún ícono disponible, devuelve null.
 *
 * @param {IconProps} props: las propiedades para el componente Icon.
 * @param {"Close" | "Play" | "Pause" | "Volume" | "Muted"} props.name: el nombre del ícono que se renderizará.
 *
 * @returns {JSX.Element | null} Un elemento JSX que renderiza el ícono solicitado, o null si el nombre del ícono no es válido.
 */
export default function Icon({ name }: IconProps) {
  const IconList = {
    Close: lazy(() => import("./list/close")),
    Play: lazy(() => import("./list/play")),
    Pause: lazy(() => import("./list/pause")),
    Volume: lazy(() => import("./list/volume")),
    Muted: lazy(() => import("./list/muted")),
  };

  const LazyPath = IconList[name];

  if (!LazyPath) {
    return null;
  }

  return (
    <Suspense>
      <LazyPath />
    </Suspense>
  );
}
