import React, { useEffect, useState } from 'react';
import * as Soundfont from 'soundfont-player';
import PianoKey from './components/PianoKey';
import './Styles.css';

interface Note {
  note: string;
  keyCode: number;
  type: 'white' | 'black';
}
const notes: Note[] = [
  { note: 'C4', keyCode: 81, type: 'white' },  // Q
  { note: 'C#4', keyCode: 50, type: 'black' }, // 2
  { note: 'D4', keyCode: 87, type: 'white' },  // W
  { note: 'D#4', keyCode: 51, type: 'black' }, // 3
  { note: 'E4', keyCode: 69, type: 'white' },  // E
  { note: 'F4', keyCode: 82, type: 'white' },  // R
  { note: 'F#4', keyCode: 53, type: 'black' }, // 5
  { note: 'G4', keyCode: 84, type: 'white' },  // T
  { note: 'G#4', keyCode: 54, type: 'black' }, // 6
  { note: 'A4', keyCode: 89, type: 'white' },  // Y
  { note: 'A#4', keyCode: 55, type: 'black' }, // 7
  { note: 'B4', keyCode: 85, type: 'white' },  // U
  { note: 'C5', keyCode: 73, type: 'white' },  // I
  { note: 'C#5', keyCode: 57, type: 'black' }, // 9
  { note: 'D5', keyCode: 79, type: 'white' },  // O
  { note: 'D#5', keyCode: 48, type: 'black' }, // 0
  { note: 'E5', keyCode: 80, type: 'white' },  // P
  { note: 'F5', keyCode: 219, type: 'white' }, // [
  { note: 'F#5', keyCode: 187, type: 'black' },// =
  { note: 'G5', keyCode: 221, type: 'white' }, // ]
  { note: 'G#5', keyCode: 65, type: 'black' }, // A
  { note: 'A5', keyCode: 90, type: 'white' },  // Z
  { note: 'A#5', keyCode: 83, type: 'black' }, // S
  { note: 'B5', keyCode: 88, type: 'white' },  // X
  { note: 'C6', keyCode: 67, type: 'white' },  // C
  { note: 'C#6', keyCode: 70, type: 'black' }, // F
  { note: 'D6', keyCode: 86, type: 'white' },  // V
  { note: 'D#6', keyCode: 71, type: 'black' }, // G
  { note: 'E6', keyCode: 66, type: 'white' },  // B
  { note: 'F6', keyCode: 78, type: 'white' },  // N
  { note: 'F#6', keyCode: 74, type: 'black' }, // J
  { note: 'G6', keyCode: 77, type: 'white' }, // M
  { note: 'G#6', keyCode: 75, type: 'black' }, // K
  { note: 'A6', keyCode: 188, type: 'white' },// ,
  { note: 'A#6', keyCode: 76, type: 'black' },  // L
  { note: 'B6', keyCode: 190, type: 'white' },  // .
  { note: 'C7', keyCode: 191, type: 'white' },  // /
];



const App: React.FC = () => {
  const [audioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());
  const [player, setPlayer] = useState<Soundfont.Player | null>(null);
  const [activeKeys, setActiveKeys] = useState<number[]>([]);

  useEffect(() => {
    Soundfont.instrument(audioContext, 'acoustic_grand_piano').then(piano => {
      setPlayer(piano);
    });
  }, [audioContext]);

  const playSound = (note: string) => {
    if (player) {
      player.play(note);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const note = notes.find(n => n.keyCode === e.keyCode);
    if (note && !activeKeys.includes(e.keyCode)) {
      playSound(note.note);
      setActiveKeys(prevKeys => [...prevKeys, e.keyCode]);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    setActiveKeys(prevKeys => prevKeys.filter(key => key !== e.keyCode));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys, player]);

  return (
    <div className="piano">
      {notes.map(({ note, keyCode, type }) => (
        <PianoKey
          key={keyCode}
          note={note}
          keyCode={keyCode}
          isActive={activeKeys.includes(keyCode)}
          playSound={playSound}
          type={type}
        />
      ))}
    </div>
  );
};

export default App;
