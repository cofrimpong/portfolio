"use client";

import { useEffect, useState } from "react";

type SlideProgressProps = {
  slideIds: string[];
};

export function SlideProgress({ slideIds }: SlideProgressProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slides = slideIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (slides.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const currentId = visibleEntries[0].target.id;
        const nextIndex = slideIds.indexOf(currentId);

        if (nextIndex >= 0) {
          setActiveIndex(nextIndex);
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    slides.forEach((slide) => observer.observe(slide));

    return () => {
      observer.disconnect();
    };
  }, [slideIds]);

  return (
    <nav className="slide-progress reveal-up" aria-label="Slide navigation">
      <a href={`#${slideIds[activeIndex]}`} className="slide-progress__title">
        <span>Portfolio</span>
        <strong>{String(activeIndex + 1).padStart(2, "0")} / {String(slideIds.length).padStart(2, "0")}</strong>
      </a>
      <div className="slide-progress__dots">
        {slideIds.map((slideId, index) => (
          <a
            key={slideId}
            href={`#${slideId}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={activeIndex === index ? "is-active" : undefined}
          />
        ))}
      </div>
    </nav>
  );
}