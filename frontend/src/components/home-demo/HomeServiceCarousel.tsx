import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { HOME_DEMO_COPY } from "../../lib/homeDemoContent";

const SWIPE_THRESHOLD = 48;

export default function HomeServiceCarousel() {
  const copy = HOME_DEMO_COPY.servicesCarousel;
  const slides = copy.items;
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const labelId = useId();

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % total) + total) % total;
      setIndex(wrapped);
    },
    [total],
  );

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStart.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerStart.current == null) return;
    const delta = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(total - 1);
    }
  }

  return (
    <section className="section svc-carousel-section" id={copy.id} data-testid="home-service-carousel">
      <div className="wrap">
        <div className="center">
          <div className="kicker">{copy.eyebrow}</div>
          <h2>{copy.title}</h2>
        </div>
      </div>
        <div
          className="svc-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <p id={labelId} className="svc-carousel-live" aria-live="polite">
            {index + 1} of {total} {copy.counterSuffix}: {slides[index].title}
          </p>
          <div className="svc-carousel-shell">
          <button
            type="button"
            className="svc-carousel-arrow svc-carousel-arrow--prev"
            aria-label={copy.previousLabel}
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>
          <div
            className="svc-carousel-viewport"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
          >
            <div
              className="svc-carousel-track"
              style={{
                width: `${total * 100}%`,
                transform: `translateX(-${(index * 100) / total}%)`,
              }}
            >
              {slides.map((slide, slideIndex) => {
                const active = slideIndex === index;
                return (
                  <article
                    className="svc-slide"
                    key={slide.id}
                    aria-hidden={!active}
                    data-testid={`home-service-slide-${slide.id}`}
                    data-active={active ? "true" : "false"}
                    style={{ flex: `0 0 ${100 / total}%`, width: `${100 / total}%` }}
                  >
                    <div className="svc-slide-copy">
                      <span className="svc-slide-num">
                        {slide.num} / {slide.kicker}
                      </span>
                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                      <ul>
                        {slide.capabilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <Link className="btn" to={slide.to} tabIndex={active ? 0 : -1}>
                        {copy.exploreLabel} <span>↗</span>
                      </Link>
                    </div>
                    <div className="svc-slide-media">
                      <img src={slide.image} alt={slide.alt} draggable={false} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            className="svc-carousel-arrow svc-carousel-arrow--next"
            aria-label={copy.nextLabel}
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
          </div>
          <div className="svc-carousel-nav">
            <div className="svc-carousel-dots" role="tablist" aria-label="Service slides">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-label={`Show ${slide.title}`}
                  aria-selected={slideIndex === index}
                  className={slideIndex === index ? "is-active" : undefined}
                  onClick={() => goTo(slideIndex)}
                />
              ))}
            </div>
            <div className="svc-carousel-counter" data-testid="home-service-counter">
              {index + 1} of {total} {copy.counterSuffix}
            </div>
          </div>
        </div>
    </section>
  );
}
