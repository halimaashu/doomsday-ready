import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#2a2a38]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e11d48]/25 via-[#0b0b12] to-[#7c3aed]/25" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="font-heading text-6xl md:text-8xl">
          Avengers: <span className="text-[#e11d48]">Doomsday</span> is coming
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[#a1a1aa]">
          Rewatch the MCU in the right order before the premiere, then book
          your opening-night watch party.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button as={Link} to="/rewatch" color="danger" size="lg">
            Plan my rewatch
          </Button>
          <Button as={Link} to="/booking" variant="bordered" size="lg">
            Book a watch party
          </Button>
        </div>
      </div>
    </section>
  );
}