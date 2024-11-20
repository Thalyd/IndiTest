import Icon from "@Components/icon/icon";
import { useState } from "react";
import Audio from "./audio";

interface PlayerProps {
  audio: string;
}

/**
 * Un componente funcional que muestra un reproductor de audio.
 *
 * Este componente utiliza un estado booleano para determinar si
 * el audio est  reproduciendo o no, y otro estado booleano para
 * determinar si el audio tiene volumen o no.
 *
 * @param {string} audio La URL del archivo de audio que se va a
 * reproducir.
 *
 * @returns {JSX.Element} Un div que contiene el reproductor de
 * audio y los botones de play/pause y mute/volume.
 */
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
