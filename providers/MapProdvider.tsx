'use client';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';
const libraries = ['geometry'];

export function MapProvider({ children }: { children: ReactNode }) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  });

  if(loadError) return (<p>Got an error when loading map</p>)

  if(!scriptLoaded) return (
    <div className="w-full h-[60vh] bg-slate-50 animate-pulse">
    </div>
  )

  return children;
}