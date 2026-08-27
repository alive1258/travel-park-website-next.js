export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "lake-como-italy",
    name: "Lake Como, Italy",
    region: "Europe",
    description:
      "Pastel villas, cypress-lined shores, and ferries gliding between lakeside villages.",
    image: "/images/lake-como-varenna-flowers.jpg",
  },
  {
    id: "railay-beach-thailand",
    name: "Railay Beach, Thailand",
    region: "Asia",
    description:
      "Limestone cliffs rising straight out of turquoise water, reachable only by longtail boat.",
    image: "/images/thailand-railay-beach-aerial-sunset.jpg",
  },
  {
    id: "istanbul-turkey",
    name: "Istanbul, Turkey",
    region: "Europe",
    description:
      "Where two continents meet — domed skylines, bustling bazaars, and ferries across the Bosphorus.",
    image: "/images/istanbul-bosphorus-skyline.webp",
  },
  {
    id: "lake-louise-canada",
    name: "Lake Louise, Canada",
    region: "Americas",
    description:
      "Glacier-fed turquoise water framed by the snow-capped peaks of Banff National Park.",
    image: "/images/lake-louise-canada.jpg",
  },
  {
    id: "rovinj-croatia",
    name: "Rovinj, Croatia",
    region: "Europe",
    description:
      "A cobblestoned old town on the Adriatic, with a harbor full of sailboats and yachts.",
    image: "/images/rovinj-croatia-pier-girl.webp",
  },
  {
    id: "abu-dhabi-uae",
    name: "Abu Dhabi, UAE",
    region: "Asia",
    description:
      "Glass towers, private beaches, and a skyline that keeps rising along the Corniche.",
    image: "/images/abu-dhabi-skyline-aerial.jpg",
  },
  {
    id: "ha-giang-vietnam",
    name: "Ha Giang, Vietnam",
    region: "Asia",
    description:
      "Switchback mountain roads through terraced valleys — one of Asia's great road trips.",
    image: "/images/ha-giang-vietnam-road.jpg",
  },
  {
    id: "na-pali-coast-hawaii",
    name: "Na Pali Coast, Hawaii",
    region: "Americas",
    description:
      "Emerald cliffs plunging into the Pacific along Kauai's roadless northern shore.",
    image: "/images/na-pali-coast-hawaii.jpg",
  },
  {
    id: "everest-base-camp-nepal",
    name: "Everest Base Camp, Nepal",
    region: "Asia",
    description:
      "The trek of a lifetime through the Khumbu valley to the foot of the world's tallest peak.",
    image: "/images/nepal-everest-base-camp-trekker.jpg",
  },
  {
    id: "maya-bay-thailand",
    name: "Maya Bay, Thailand",
    region: "Asia",
    description:
      "A hidden cove ringed by cliffs, with longtail boats bobbing in impossibly clear water.",
    image: "/images/thailand-maya-bay-boats.jpg",
  },
  {
    id: "costa-blanca-spain",
    name: "Costa Blanca, Spain",
    region: "Europe",
    description:
      "Quiet coves and pine-covered cliffs along Spain's sun-soaked Mediterranean coast.",
    image: "/images/mediterranean-cove-boats.jpg",
  },
  {
    id: "lake-garda-italy",
    name: "Lake Garda, Italy",
    region: "Europe",
    description:
      "Italy's largest lake, ringed by lemon groves, medieval towns, and mountain backdrops.",
    image: "/images/italian-lakeside-town.jpg",
  },
  {
    id: "koh-tao-thailand",
    name: "Koh Tao, Thailand",
    region: "Asia",
    description:
      "A laid-back island known for its viewpoints, dive sites, and quiet turquoise bays.",
    image: "/images/hiker-overlook-turquoise-bay.jpg",
  },
  {
    id: "krabi-thailand",
    name: "Krabi, Thailand",
    region: "Asia",
    description:
      "Towering karst islands and mangrove-lined beaches along Thailand's Andaman coast.",
    image: "/images/thailand-karst-longtail-boat.jpg",
  },
];
