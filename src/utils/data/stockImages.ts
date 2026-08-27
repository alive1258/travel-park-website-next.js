/**
 * Stock photography for the few slots with no local asset and no CMS-backed
 * image source — team portraits, plus a couple of Transportation vehicle
 * shots. Everything else now uses the real photos in `public/images` via
 * `localImages.ts`. All IDs point at images.unsplash.com, already
 * whitelisted in next.config.js.
 */
function unsplash(id: string, w = 1200) {
  return `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;
}

export const TRANSPORT_IMAGES = {
  luxuryInterior: unsplash("1499696010180-025ef6e1a8f9"),
  airportTerminal: unsplash("1528181304800-259b08848526"),
  luxuryExterior: unsplash("1560179707-f14e90ef3623"),
  shuttleVan: unsplash("1560448204-e02f11c3d0e2"),
};

export const TEAM_PORTRAITS = {
  memberOne: unsplash("1487412720507-e7ab37603c6f", 400),
  memberTwo: unsplash("1519085360753-af0119f7cbe7", 400),
  memberThree: unsplash("1500648767791-00dcc994a43e", 400),
  memberFour: unsplash("1522071820081-009f0129c71c", 400),
  memberFive: unsplash("1494790108377-be9c29b29330", 400),
  memberSix: unsplash("1517841905240-472988babdf9", 400),
  memberSeven: unsplash("1506794778202-cad84cf45f1d", 400),
};
