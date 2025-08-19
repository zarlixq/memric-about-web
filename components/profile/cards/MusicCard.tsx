"use client";

import Card from "../Card";

type Song = { 
  id: string; 
  name: string; 
  artist?: string; 
  image?: string; 
  external_url?: string 
};

type Artist = { 
  id: string; 
  name?: string; 
  image?: string; 
  external_url?: string 
};

type Props = {
  expanded: boolean;
  onToggle: (id: string) => void;
  currently_listening_songs?: Song[];
  favorite_songs?: Song[];
  listened_artists?: Artist[];
};

export default function MusicCard({
  expanded,
  onToggle,
  currently_listening_songs = [],
  favorite_songs = [],
  listened_artists = [],
}: Props) {
  const openInSpotify = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  return (
    <Card
      id="music"
      title="Müzik"
      icon="🎵"
      expanded={expanded}
      onToggle={onToggle}
    >
      {/* Şu An Dinliyor */}
      {currently_listening_songs.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-100 mb-3">Şu an Ruh Halim</h3>
          {currently_listening_songs.slice(0, 1).map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => openInSpotify(s.external_url)}
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-28 h-28 rounded-lg object-cover shadow-md"
              />
              <div className="text-center">
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-neutral-400">{s.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Favori Şarkılar */}
      {favorite_songs.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-100 mb-3">En Sevdiğim Şarkılar</h3>
          {/* Mobil: yatay scroll, PC: grid */}
          <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 scrollbar-hide">
            {favorite_songs.map((s) => (
              <div
                key={s.id}
                className="flex-shrink-0 w-28 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => openInSpotify(s.external_url)}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-28 h-28 rounded-lg object-cover shadow-md"
                />
                <div className="text-center">
                  <p className="font-medium truncate max-w-[100px]">{s.name}</p>
                  <p className="text-xs text-neutral-400 truncate max-w-[100px]">{s.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dinlenen Sanatçılar */}
      {listened_artists?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-neutral-100 mb-3">En Sevdiğim Sanatçılar</h3>
          <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 scrollbar-hide">
            {listened_artists.map((a) => (
              <div
                key={a.id}
                className="flex-shrink-0 w-28 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => openInSpotify(a.external_url)}
              >
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-28 h-28 rounded-lg object-cover shadow-md"
                />
                <p className="mt-1 text-sm text-neutral-300 text-center truncate max-w-[100px]">
                  {a.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
