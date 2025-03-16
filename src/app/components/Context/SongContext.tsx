// SongContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SongContextType {
  linkSong: string | null; // linkSong là "song/1", "song/2", v.v.
  setLinkSong: (link: string | null) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [linkSong, setLinkSong] = useState<string | null>(null);

  return (
    <SongContext.Provider value={{ linkSong, setLinkSong }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSong must be used within a SongProvider');
  }
  return context;
};