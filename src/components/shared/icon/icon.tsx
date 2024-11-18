import { lazy, Suspense } from "react";

interface IconProps {
  name: "Close" | "Play" | "Pause" | "Volume" | "Muted";
}
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
