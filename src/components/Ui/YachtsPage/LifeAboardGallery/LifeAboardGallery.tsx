import Image from "next/image";

const LIFE_ABOARD = [
  "/images/experiences/exp-35.jpg",
  "/images/experiences/exp-38.jpg",
  "/images/experiences/exp-wakeboard.webp",
  "/images/experiences/exp-dubai-tour.avif",
  "/images/experiences/exp-efoil.jpg",
];

export default function LifeAboardGallery() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-10">
          Life Aboard
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {LIFE_ABOARD.map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt="Life aboard an Eco Yachts charter"
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className=" transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
