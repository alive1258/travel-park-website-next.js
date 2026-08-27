import Image from "next/image";

const YachtGallery = ({
  name,
  gallery,
}: {
  name: string;
  gallery: string[];
}) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
      Image Gallery
    </h2>
    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {gallery.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`relative overflow-hidden rounded-xl ${
            i === 0 ? "col-span-2 aspect-16/10 sm:col-span-3" : "aspect-square"
          }`}
        >
          <Image
            src={src}
            alt={`${name} — gallery photo ${i + 1}`}
            fill
            sizes="(min-width: 640px) 33vw, 50vw"
            className=" transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  </div>
);

export default YachtGallery;
