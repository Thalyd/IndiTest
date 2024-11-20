import { render, screen, fireEvent } from "@testing-library/react";
import Player from "../player";

// Mock the Audio and Icon components to focus on testing the Player component
jest.mock("../audio", () => ({ isPlaying, hasVolume }) => (
  <div data-testid="audio-component">
    {isPlaying ? "Playing" : "Paused"} | {hasVolume ? "Volume" : "Muted"}
  </div>
));

jest.mock("@Components/icon/icon", () => ({ name }) => (
  <svg data-testid={`icon-${name}`} />
));

describe("Player Component", () => {
  it("renders correctly and shows play icon initially", () => {
    render(<Player audio="test-audio.mp3" />);

    // Check if the Play icon is rendered initially
    const playIcon = screen.getByTestId("icon-Play");
    expect(playIcon).toBeInTheDocument();

    // Check if the Audio component is rendered with the correct initial state
    const audioComponent = screen.getByTestId("audio-component");
    expect(audioComponent).toHaveTextContent("Paused | Volume");
  });

  it("toggles between play and pause on click", () => {
    render(<Player audio="test-audio.mp3" />);

    const playIcon = screen.getByTestId("icon-Play");
    fireEvent.click(playIcon); // Click play icon to toggle to pause

    // After clicking, it should show the Pause icon
    expect(screen.getByTestId("icon-Pause")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-Play")).not.toBeInTheDocument();

    // Check if the Audio component shows "Playing" state
    const audioComponent = screen.getByTestId("audio-component");
    expect(audioComponent).toHaveTextContent("Playing | Volume");

    fireEvent.click(playIcon); // Click pause icon to toggle back to play

    // It should return to showing the Play icon
    expect(screen.getByTestId("icon-Play")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-Pause")).not.toBeInTheDocument();

    // Check if the Audio component shows "Paused" state
    expect(audioComponent).toHaveTextContent("Paused | Volume");
  });

  it("toggles between volume and mute on click", () => {
    render(<Player audio="test-audio.mp3" />);

    const volumeIcon = screen.getByTestId("icon-Volume");
    fireEvent.click(volumeIcon); // Click volume icon to toggle to mute

    // After clicking, it should show the Muted icon
    expect(screen.getByTestId("icon-Muted")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-Volume")).not.toBeInTheDocument();

    // Check if the Audio component shows "Muted" state
    const audioComponent = screen.getByTestId("audio-component");
    expect(audioComponent).toHaveTextContent("Paused | Muted");

    fireEvent.click(volumeIcon); // Click mute icon to toggle back to volume

    // It should return to showing the Volume icon
    expect(screen.getByTestId("icon-Volume")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-Muted")).not.toBeInTheDocument();

    // Check if the Audio component shows "Volume" state
    expect(audioComponent).toHaveTextContent("Paused | Volume");
  });
});
