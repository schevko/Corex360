const HERO_VIDEO_SRC = "/videos/corex360-hero.mp4";

export function HeroVideo() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      <div className="relative h-full w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Corex360 platform preview"
        />
      </div>
    </section>
  );
}
