import Icon from "@Components/icon/icon";
import { useState } from "react";
import Audio from "./audio";

interface PlayerProps {
  audio: string;
}

export default function Player({ audio }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVolume, setHasVolume] = useState(true);

  return (
    <div className="player">
      <div
        className="action"
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        <Icon name={isPlaying ? "Pause" : "Play"} />
      </div>

      <Audio audio={audio} isPlaying={isPlaying} hasVolume={hasVolume} />
      <div
        className="action"
        onClick={() => {
          setHasVolume(!hasVolume);
        }}
      >
        <Icon name={hasVolume ? "Volume" : "Muted"} />
      </div>
    </div>
  );
}
