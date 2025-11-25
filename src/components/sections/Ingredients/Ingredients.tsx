import Image from "next/image";
import vela2 from "../../../../public/images/herovela2.webp";

export function Ingredients() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center my-10 pb-10">
      <div className="bg-black/10 w-[70vw] h-[50vh] md:w-[60vw] md:h-[70vh] absolute md:bottom-0 lg:bottom-auto lg:left-0" />
      <div className="w-[40vw] h-[30vh] md:w-[40vw] md:h-[50vh] lg:w-[30vw] lg:h-[85vh] relative mb-20 lg:m-0">
        <Image src={vela2} alt="Ingredients" fill className="object-cover" />
      </div>
      <div className="px-10 space-y-5 md:space-y-10 text-center lg:text-start">
        <h2 className="text-4xl md:text-7xl font-legquinne max-w-xl">
          Our collection Ready to use
        </h2>
        <p className="text-2xl font-antic italic max-w-lg">
          Inspired by the elegant glamor of yesteryear
        </p>
      </div>
    </section>
  );
}
