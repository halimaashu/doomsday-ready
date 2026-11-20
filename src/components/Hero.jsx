import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* peche glow */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <span className="inline-block rounded-full border border-line bg-card px-4 py-1 text-xs uppercase tracking-[0.2em] text-soft">
          Opening night countdown
        </span>

        <h1 className="font-heading mt-6 text-6xl leading-none md:text-8xl">
          Avengers: <span className="text-accent">Doomsday</span>
          <br />
          is coming
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-soft">
          Rewatch the MCU in the right order before the premiere, then book
          your opening-night watch party.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button color="danger" size="lg" onPress={() => navigate("/rewatch")}>
            Plan my rewatch
          </Button>
          <Button variant="bordered" size="lg" onPress={() => navigate("/booking")}>
            Book a watch party
          </Button>
        </div>
      </div>
    </section>
  );
}