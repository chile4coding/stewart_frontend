import React from "react";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="grid  grid-cols-2 md:grid-cols-1   sm:grid-cols-1      mt-32 sm:mt-8">
      <div className=" self-start md:order-2 sm:order-2">
        <h2 className="text-[48px]    font-semibold sm:text-[30px]">
          Modern Fashion
          <br /> Redefined
        </h2>
        <p className="text-[18px] l leading-7 mt-6 sm:text-sm">
          Welcome to Stewart Collection, where fashion meets <br /> passion and
          individuality. Get ready to redefine your <br /> style with us!
        </p>
        <button className="btn normal-case  font-semibold mt-6 px-6">
          Start shopping
        </button>
      </div>
      <div className=" lg:justify-self-center   xl:justify-self-center xs:order-1 md:order-1 sm:order-1">
        <Image
          src="/triangle.png"
          alt="hero triangle"
          width={456}
          height={425}
        />
      </div>
    </section>
  );
}
