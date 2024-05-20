declare module 'soundfont-player' {
    export interface Player {
      play(note: string | number, when?: number, options?: { duration?: number }): void;
      stop(): void;
    }
  
    export interface Instrument {
      name: string;
      player: Player;
    }
  
    export function instrument(
      audioContext: AudioContext,
      name: string,
      options?: object
    ): Promise<Player>;
  }
  