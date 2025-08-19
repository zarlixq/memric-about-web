"use client";

import Card from "../Card";

type Media = {
  id: string;
  name: string;
  image?: string;
  external_url?: string;
};

type Props = {
  expanded: boolean;
  onToggle: (id: string) => void;
  favorite_movies?: Media[];
  favorite_series?: Media[];
  favorite_actors?: Media[];
};

export default function FilmCard({
  expanded,
  onToggle,
  favorite_movies = [],
  favorite_series = [],
  favorite_actors = [],
}: Props) {
  return (
    <Card
      id="films"
      title="Film & Dizi"
      icon="🎬"
      expanded={expanded}
      onToggle={onToggle}
    >
      {/* Favori Filmler */}
      {favorite_movies.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-100 mb-3">Favori Filmler</h3>
          <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 scrollbar-hide">
            {favorite_movies.map((m) => (
              <a
                key={m.id}
                href={m.external_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 w-28 flex flex-col items-center gap-2 hover:opacity-90 transition cursor-pointer"
              >
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-28 h-28 rounded-lg object-cover shadow-md"
                />
                <p className="mt-1 text-sm text-neutral-300 text-center truncate max-w-[100px]">
                  {m.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Favori Diziler */}
      {favorite_series.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-100 mb-3">Favori Diziler</h3>
          <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 scrollbar-hide">
            {favorite_series.map((s) => (
              <a
                key={s.id}
                href={s.external_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 w-28 flex flex-col items-center gap-2 hover:opacity-90 transition cursor-pointer"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-28 h-28 rounded-lg object-cover shadow-md"
                />
                <p className="mt-1 text-sm text-neutral-300 text-center truncate max-w-[100px]">
                  {s.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Favori Oyuncular */}
      {favorite_actors.length > 0 && (
        <div>
          <h3 className="font-semibold text-neutral-100 mb-3">Favori Oyuncular</h3>
          <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 scrollbar-hide">
            {favorite_actors.map((a) => (
              <a
                key={a.id}
                href={a.external_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 w-28 flex flex-col items-center gap-2 hover:opacity-90 transition cursor-pointer"
              >
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-28 h-28 rounded-full object-cover shadow-md"
                />
                <p className="mt-1 text-sm text-neutral-300 text-center truncate max-w-[100px]">
                  {a.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
