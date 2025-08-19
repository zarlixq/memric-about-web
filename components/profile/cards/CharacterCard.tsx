"use client";

import Card from "../Card";

type Props = {
  expanded: boolean;
  onToggle: (id: string) => void;
  hobbies?: string[];
  red_lines?: string[];
  phobias?: string[];
};

export default function CharacterCard({
  expanded,
  onToggle,
  hobbies = [],
  red_lines = [],
  phobias = [],
}: Props) {
  return (
    <Card
      id="character"
      title="Karakter"
      icon="🧭"
      expanded={expanded}
      onToggle={onToggle}
    >
      {/* Hobiler */}
      {hobbies.length > 0 && (
        <div>
          <p className="font-semibold text-neutral-100 mb-1">Hobiler</p>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Kırmızı Çizgiler */}
      {red_lines.length > 0 && (
        <div>
          <p className="font-semibold text-neutral-100 mb-1">Kırmızı Çizgiler</p>
          <div className="flex flex-wrap gap-2">
            {red_lines.map((red, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-red-600/20 text-red-300 text-xs font-medium"
              >
                {red}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Fobiler */}
      {phobias.length > 0 && (
        <div>
          <p className="font-semibold text-neutral-100 mb-1">Fobiler</p>
          <div className="flex flex-wrap gap-2">
            {phobias.map((phobia, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-amber-600/20 text-amber-300 text-xs font-medium"
              >
                {phobia}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
