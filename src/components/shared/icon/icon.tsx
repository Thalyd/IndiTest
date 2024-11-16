import { lazy, Suspense } from "react";

interface IconProps {
  name: "Close";
}
export default function Icon({ name }: IconProps) {
  const IconList = {
    Close: lazy(() => import("./list/close")),
  };

  const LazyPath = IconList[name];

  if (!LazyPath) {
    return <div>Icon not found</div>;
  }

  return (
    <svg viewBox="0 0 25 25">
      <Suspense fallback={<div>Loading...</div>}>
        <LazyPath />
      </Suspense>
    </svg>
  );
}
