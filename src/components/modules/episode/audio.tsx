import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
interface AudioProps {
  audio: string;
  isPlaying: boolean;
  hasVolume: boolean;
}
export default function Audio({
  audio,
  isPlaying = false,
  hasVolume,
}: AudioProps) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    } else if (audioRef.current && !isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = hasVolume ? 1 : 0;
    }
  }, [hasVolume]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = parseFloat(event.target.value);
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  const audioRef = useRef<HTMLAudioElement | null>(null);
  return (
    <Content>
      <audio
        ref={audioRef}
        src={audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="progress">
        <input
          type="range"
          value={currentTime}
          min={0}
          max={duration}
          step="0.1"
          onChange={handleSeek}
        />
        <span>
          {Math.floor(currentTime)} / {Math.floor(duration)}
        </span>
      </div>
    </Content>
  );
}
const Content = styled.div({
  backgroundColor: "black",
  color: "white",
  span: {
    fontSize: "15px",
    backgroundColor: "black",
  },
  ".progress": {
    display: "grid",
    gridTemplateColumns: "1fr 80px",
    gridTemplateRows: "1fr",
    fontSize: "12px",
    input: { width: "calc(100% - 15px)", margin: "0px", padding: "0px" },
  },
});
