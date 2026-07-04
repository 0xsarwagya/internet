export type Photograph = {
  file: string;
  width: number;
  height: number;
  subject: string;
  place: string;
  meta: string;
};

export const PHOTOGRAPHS: readonly Photograph[] = [
  {
    file: "palace-facade-night.jpg",
    width: 1200,
    height: 1600,
    subject: "Lights that never remember to go out",
    place: "Residenzschloss · Ludwigsburg",
    meta: "48.90°N · 9.19°E",
  },
  {
    file: "mustard-fields-open.jpg",
    width: 1200,
    height: 1600,
    subject: "Yellow, taking its turn at being the loudest thing here",
    place: "Thahar · Muzaffarpur",
    meta: "26.38°N · 85.54°E",
  },
  {
    file: "rhine-village.jpg",
    width: 1200,
    height: 1600,
    subject: "A church that keeps the town small",
    place: "Bacharach · Rhineland-Palatinate",
    meta: "50.06°N · 7.77°E",
  },
  {
    file: "church-bare-trees.jpg",
    width: 1200,
    height: 1600,
    subject: "The church, waiting out another winter",
    place: "Friedenskirche · Ludwigsburg",
    meta: "48.89°N · 9.19°E",
  },
  {
    file: "bihar-road-with-tree.jpg",
    width: 360,
    height: 480,
    subject: "A road that mostly waits",
    place: "Thahar · Muzaffarpur",
    meta: "26.38°N · 85.54°E",
  },
  {
    file: "saar-loop.jpg",
    width: 768,
    height: 1024,
    subject: "A river changing its mind about which way to go",
    place: "Saarschleife · Mettlach",
    meta: "49.51°N · 6.55°E",
  },
  {
    file: "winter-town-dawn.jpg",
    width: 1200,
    height: 1600,
    subject: "Frost, and everything the streetlamp is still holding",
    place: "Ludwigsburg, waking up",
    meta: "48.89°N · 9.19°E",
  },
  {
    file: "valley-and-figure.jpg",
    width: 1200,
    height: 1600,
    subject: "Distance, for scale",
    place: "Trail in the Rhine gorge",
    meta: "50.14°N · 7.71°E",
  },
  {
    file: "sunset-houses.jpg",
    width: 768,
    height: 1024,
    subject: "The sky doing what it does at 20:14 in September",
    place: "Saarbrücken, walking home",
    meta: "49.24°N · 6.99°E",
  },
];
