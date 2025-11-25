import Image from "next/image";
import vela1 from "../../../../public/images/herocandel.webp";
import vela2 from "../../../../public/images/herovela2.webp";

export function DetaislsCandles() {
  return (
    <section className="flex flex-col lg:flex-row md:items-center justify-center my-20">
      <div className="max-w-xl text-center space-y-10">
        <h2 className="font-legquinne text-6xl md:text-8xl md:text-nowrap">
          Sherry Berry
        </h2>
        <p className="font-antic text-2xl mx-auto max-w-72">
          Brings a breath of fresh air to the world of fashion and high-end.
        </p>

        <div className="relative flex flex-col items-center my-20 lg:my-0 lg:mt-32">
          <Image
            src="/svg/Cherry.svg"
            alt="Cherry"
            width={170}
            height={170}
            className="absolute -translate-y-1/3 opacity-20"
          />
          <p className="text-wrap max-w-32 mx-auto text-3xl font-legquinne font-bold  ">
            Discover Sherry Berry
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5 lg:p-10 relative md:-translate-x-12 lg:translate-x-0">
        <div className="relative w-[52vw] lg:w-[25vw] h-[50vh] lg:h-[68vh] lg:translate-48">
          <Image src={vela1} alt="Vela 1" fill className="object-cover" />
        </div>
        <div className="absolute w-[52vw] lg:w-[25vw] h-[50vh] lg:h-[68vh] translate-36 lg:translate-0 ">
          <Image src={vela2} alt="Vela 2" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
