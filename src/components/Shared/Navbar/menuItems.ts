export interface MenuItem {
  display: string;
  href: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  { display: "Home", href: "/" },
  { display: "Tours", href: "/tours" },
  { display: "Hotels", href: "/hotels" },
  { display: "Transportation", href: "/transportation" },
  { display: "Destinations", href: "/destinations" },
  { display: "Blog", href: "/blog" },
  { display: "Contact Us", href: "/contact" },
];

// TODO: replace with the charter company's real phone number/hours
export const CONTACT_PHONE = "+1 (202) 555-0198";
export const OPEN_HOURS = "Mon - Sat, 9am - 6pm";
