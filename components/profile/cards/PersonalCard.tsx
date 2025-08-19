"use client";

import Card from "../Card";

type Props = {
  expanded: boolean;
  onToggle: (id: string) => void;
  school?: string;
  zodiac_sign?: string;
  show_zodiac?: boolean;
};

export default function PersonalCard({
  expanded,
  onToggle,
  school,
  zodiac_sign,
  show_zodiac,
}: Props) {
  return (
    <Card
      id="personal"
      title="Kişisel Bilgiler"
      icon="🎓"
      expanded={expanded}
      onToggle={onToggle}
    >
      {school && (
        <p>
          <span className="font-semibold text-neutral-100">Okul:</span>{" "}
          {school}
        </p>
      )}
      {show_zodiac && zodiac_sign && (
        <p>
          <span className="font-semibold text-neutral-100">Burç:</span>{" "}
          {zodiac_sign}
        </p>
      )}
    </Card>
  );
}
