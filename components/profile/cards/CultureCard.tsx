"use client";

import Card from "../Card";

type Props = {
  expanded: boolean;
  onToggle: (id: string) => void;
  countries_visited?: string[];
  languages_known?: string[];
};

export default function CultureCard({
  expanded,
  onToggle,
  countries_visited = [],
  languages_known = [],
}: Props) {
  return (
    <Card
      id="culture"
      title="Kültür"
      icon="🌍"
      expanded={expanded}
      onToggle={onToggle}
    >
      {/* Gezilen Ülkeler */}
      {countries_visited.length > 0 && (
        <div>
          <p className="font-semibold text-neutral-100 mb-1">Gezilen Ülkeler</p>
          <div className="flex flex-wrap gap-2">
            {countries_visited.map((c, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-300 text-xs font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bilinen Diller */}
      {languages_known.length > 0 && (
        <div>
          <p className="font-semibold text-neutral-100 mt-3 mb-1">
            Bilinen Diller
          </p>
          <div className="flex flex-wrap gap-2">
            {languages_known.map((lang, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
