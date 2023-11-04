import { Canvas } from "@react-three/fiber";
import useSound from "use-sound";
import downMusicFile from "./assets/audio/down.m4a";
import "./App.css";
import { useEffect } from "react";
import { Settings } from "./Settings/Settings";

function App() {
  const [playDownMusic, downMusic] = useSound(downMusicFile, { volume: 0.5 });

  useEffect(() => {
    playDownMusic();

    return () => {
      downMusic.stop();
    };
  }, [playDownMusic, downMusic]);

  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <texture />
      </Canvas>

      <Settings
        onVolumeChange={(volume) => {
          console.log("new volume:", volume);
          downMusic.sound.volume(volume / 100);
        }}
      />
    </>
  );
}

export default App;
