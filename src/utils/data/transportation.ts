import { TRANSPORT_IMAGES } from "./stockImages";
import { TRANSPORT_LOCAL_IMAGES } from "./localImages";

// TODO: placeholder fleet/pricing — replace once ground-transport partners
// and real rates are onboarded.
export interface VehicleListing {
  slug: string;
  name: string;
  type: string;
  capacity: string;
  pricePerTrip: number;
  image: string;
}

export const SERVICE_TYPES = [
  {
    title: "Airport Transfer",
    description: "Door-to-door pickup and drop-off, flight tracked.",
    image: TRANSPORT_IMAGES.airportTerminal,
  },
  {
    title: "Private Car",
    description: "A dedicated driver and vehicle for the day.",
    image: TRANSPORT_LOCAL_IMAGES.privateCarRoad,
  },
  {
    title: "Shuttle Service",
    description: "Shared rides between hotels, marinas, and airports.",
    image: TRANSPORT_IMAGES.shuttleVan,
  },
  {
    title: "Boat Transfer",
    description: "Marina-to-marina transfers timed with your charter.",
    image: TRANSPORT_LOCAL_IMAGES.boatTransfer,
  },
];

export const VEHICLE_FLEET: VehicleListing[] = [
  {
    slug: "executive-sedan",
    name: "Executive Sedan",
    type: "Private Car",
    capacity: "1-3 passengers",
    pricePerTrip: 45,
    image: TRANSPORT_IMAGES.luxuryInterior,
  },
  {
    slug: "premium-suv",
    name: "Premium SUV",
    type: "Private Car",
    capacity: "1-5 passengers",
    pricePerTrip: 65,
    image: TRANSPORT_IMAGES.luxuryExterior,
  },
  {
    slug: "group-shuttle-van",
    name: "Group Shuttle Van",
    type: "Shuttle",
    capacity: "1-12 passengers",
    pricePerTrip: 90,
    image: TRANSPORT_IMAGES.shuttleVan,
  },
  {
    slug: "marina-speedboat",
    name: "Marina Speedboat",
    type: "Boat Transfer",
    capacity: "1-6 passengers",
    pricePerTrip: 120,
    image: TRANSPORT_LOCAL_IMAGES.boatTransfer,
  },
];

export const TRANSPORT_FAQS = [
  {
    id: "t1",
    question: "How far in advance should I book transportation?",
    answer:
      "We recommend booking at least 48 hours ahead, especially for airport transfers and boat connections timed with a charter departure.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "t2",
    question: "Can I change my pickup time after booking?",
    answer:
      "Yes — contact our team as early as possible and we'll adjust your pickup at no extra charge, subject to driver availability.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "t3",
    question: "Do you track flight delays for airport pickups?",
    answer:
      "Yes, all airport transfers are tracked against your flight number so your driver adjusts automatically if your flight is delayed.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "t4",
    question: "Are boat transfers included with a yacht charter?",
    answer:
      "Marina-to-marina transfers can be bundled with your tour booking — mention it when you inquire and we'll coordinate the timing.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];
