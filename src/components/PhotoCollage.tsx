import { asset } from "../data/content";

export type CollagePhoto = { image: string; alt: string };

/** Each layer has its own scroll depth; masks keep the composition on one paper surface. */
export function PhotoCollage({
  photos,
  label,
}: {
  photos: readonly CollagePhoto[];
  label: string;
}) {
  return (
    <div className="story-collage">
      <div
        className="collage-fragment fragment-blue"
        data-depth="0.35"
        aria-hidden="true"
      />
      <div
        className="collage-fragment fragment-cream"
        data-depth="0.6"
        aria-hidden="true"
      />
      {photos.map((photo, index) => (
        <figure
          key={`${index}-${photo.image}`}
          className={`story-photo story-photo-${index}`}
          data-depth={[0.5, 1, 0.7, 1.3][index]}
        >
          <div className="story-photo-mask">
            <img
              src={asset(photo.image)}
              alt={photo.alt}
              width="800"
              height="700"
              loading="lazy"
            />
          </div>
        </figure>
      ))}
      <svg
        className="collage-thread"
        viewBox="0 0 500 600"
        fill="none"
        aria-hidden="true"
      >
        <path d="M65 180C12 123 64 53 139 74C209 95 120 151 79 184C-7 250 97 267 193 300C380 364 474 399 428 469C390 526 302 492 345 454" />
      </svg>
      <span className="collage-note" data-depth="0.4">
        {label}
      </span>
    </div>
  );
}
