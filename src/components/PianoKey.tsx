import React from 'react';
import './PianoKey.css';
import keyCodeMap from '../KeyCodeMap';

interface PianoKeyProps {
  note: string;
  keyCode: number;
  isActive: boolean;
  playSound: (note: string) => void;
  type: 'white' | 'black';
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, keyCode, isActive, playSound, type }) => {
  const className = `key ${type} ${isActive ? 'playing' : ''}`;
  const displayKey = keyCodeMap[keyCode];

  return (
    <div
      className={className}
      onMouseDown={() => playSound(note)}
      data-key={keyCode}
    >
      {displayKey}
    </div>
  );
};

export default PianoKey;
