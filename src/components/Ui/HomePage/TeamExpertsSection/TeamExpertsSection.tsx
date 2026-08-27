import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { TEAM_PORTRAITS } from "@/src/utils/data/stockImages";

// TODO: replace with the real team roster once profiles are finalized.
const TEAM = [
  {
    name: "Kevin Martin",
    role: "Travel Expert",
    image: TEAM_PORTRAITS.memberOne,
  },
  {
    name: "Martina Chopra",
    role: "Tour Planner",
    image: TEAM_PORTRAITS.memberFour,
  },
  {
    name: "John Dione",
    role: "Destination Specialist",
    image: TEAM_PORTRAITS.memberThree,
  },
];

const TeamExpertsSection = () => {
  return (
    <section className="bg-brand-50/40 py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Our Travel Experts
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Creative Minds. Real Results.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
          {TEAM.map(({ name, role, image }, i) => (
            <SlideUp key={name} delay={i + 1}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm text-center">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-900">{name}</h3>
                  <p className="text-xs text-brand-900/50">{role}</p>
                  <div className="mt-3 flex justify-center gap-2">
                    {[FaFacebookF, FaInstagram, FaLinkedinIn].map(
                      (Icon, idx) => (
                        <span
                          key={idx}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-600"
                        >
                          <Icon size={11} />
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamExpertsSection;
