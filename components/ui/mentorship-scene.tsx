import { useId, useRef } from "react";
import {
  useVisibleAnimation,
  type VisibleTimeline,
} from "../../src/hooks/useVisibleAnimation";

function animateConversation(tl: VisibleTimeline) {
  tl.to(
    ".mentor-gesture",
    {
      rotation: -7,
      svgOrigin: "414 237",
      duration: 1.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
    },
    0.2,
  )
    .to(
      ".mentor-head",
      {
        rotation: 3,
        svgOrigin: "370 204",
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      0.4,
    )
    .to(
      ".listener-left-head",
      {
        rotation: -4,
        svgOrigin: "187 324",
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      1.1,
    )
    .to(
      ".listener-center-head",
      {
        rotation: 4,
        svgOrigin: "565 297",
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      2.1,
    )
    .to(
      ".listener-right-gesture",
      {
        rotation: -8,
        svgOrigin: "720 353",
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      3.4,
    )
    .to(
      ".listener-right-head",
      {
        rotation: -3,
        svgOrigin: "744 315",
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      3.6,
    )
    .to(
      ".mentor-head",
      {
        rotation: -2,
        svgOrigin: "370 204",
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      5.3,
    )
    .to(
      ".conversation-dot",
      {
        y: -5,
        duration: 0.45,
        stagger: 0.16,
        ease: "sine.inOut",
        repeat: 1,
        yoyo: true,
      },
      1,
    )
    .to(
      ".conversation-dot",
      {
        y: -5,
        duration: 0.45,
        stagger: 0.16,
        ease: "sine.inOut",
        repeat: 1,
        yoyo: true,
      },
      4.8,
    );
}

/** Original articulated vector scene based on the supplied group-mentoring reference. */
export function MentorshipScene() {
  const root = useRef<HTMLDivElement>(null);
  const title = useId();
  const reduced = useVisibleAnimation(root, animateConversation);
  return (
    <div
      className="mentoring-scene"
      ref={root}
      data-motion={reduced ? "reduced" : "paused"}
    >
      <svg
        viewBox="0 0 880 650"
        role="img"
        aria-labelledby={title}
        className="mentoring-scene-svg"
      >
        <title id={title}>
          A mentor and three young people listening and sharing in a small group
        </title>
        {/* A quiet room, with a soft silhouette instead of a rectangular frame. */}
        <path
          d="M60 489C28 416 48 323 113 267c51-44 84-34 123-84C275 132 325 59 419 53c92-6 124 37 169 62 46 26 111 18 161 72 51 55 81 160 59 237-19 68-69 116-162 124L216 566C136 575 83 549 60 489Z"
          fill="#edf0ee"
        />
        <path
          d="M46 562c75-28 135-8 220-11 133-4 174-16 312-10 75 4 159 10 252 43-86 37-255 30-359 23-160-11-299 19-425-14-20-5-22-22 0-31Z"
          fill="#f0dcc7"
        />
        <path
          d="M122 588c185 8 458 1 633 0"
          fill="none"
          stroke="#d9bda2"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g>
          <path d="M574 72h96v132h-96z" fill="#d0d5cf" />
          <path d="M582 80h80v116h-80z" fill="#fffdf8" />
          <path d="M591 89h62v98h-62z" fill="#b7cbb5" />
          <path
            d="M591 148c22-30 44-10 62-38v38c-21 17-42 8-62 23Z"
            fill="#96b49a"
          />
          <path d="M591 174c25-18 40-9 62-23v36h-62Z" fill="#709479" />
        </g>
        <g fill="none" stroke="#dddfd9" strokeWidth="2">
          <path d="M477 551h105M286 551h32" />
        </g>

        {/* Left chair and seated listener. */}
        <g>
          <path
            d="m139 438-33 139m103-136 35 136m-53-133-7 129m-31-129 52 127"
            stroke="#655c4c"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M104 340c8-27 42-34 70-22 39 15 65 44 62 98-2 39-41 51-83 43-48-9-68-54-49-119Z"
            fill="#d99042"
          />
          <path
            d="M111 351c-6 40 9 71 33 81 32 13 64 4 83-14-2 31-33 41-67 36-43-5-63-47-49-103Z"
            fill="#cb7a30"
          />
          <path
            d="M159 422c34-9 69-1 91 17 18 16 29 44 38 73l-20 14-43-63-47-3Z"
            fill="#526274"
          />
          <path
            d="M153 429c25-7 65 1 83 14 11 9 15 27 15 42l-10 74-24-1-5-72-45-20Z"
            fill="#657488"
          />
          <path d="m216 547 26 1-2 23-23 4Z" fill="#bc815b" />
          <path
            d="M216 567c9 2 17 2 25-2l17 8c6 4 7 12 1 13h-43c-6-2-6-11 0-19Z"
            fill="#303c45"
          />
          <path d="m263 511 22-5 10 20-18 11Z" fill="#bc815b" />
          <path
            d="M274 528c8-3 13-8 17-13l18 4c8 2 11 10 6 13l-35 18c-8 2-11-8-6-22Z"
            fill="#303c45"
          />
          <path
            d="M143 328c15-15 45-24 65-6l19 61-14 50c-20 16-60 13-72-4l-11-61Z"
            fill="#87a48f"
          />
          <path
            d="m150 333-3 62 16 29c13 6 34 8 49 0l-1 13c-23 10-61 4-70-8l-11-61Z"
            fill="#719580"
          />
          <path
            d="M189 332c10-6 17-1 22 12l13 36 34 15-7 15-49-12c-11-4-13-26-18-39Z"
            fill="#98b09b"
          />
          <path
            d="m250 394 13-3 15 2 15 8c4 5 1 9-5 7l-12-4-12 9-16-6Z"
            fill="#c18b65"
          />
          <path
            d="m158 332 25 3 3 46 32 18-7 16-43-22c-10-7-11-32-10-61Z"
            fill="#96ad98"
          />
          <path
            d="m210 399 17 2 16 7 6 7c2 4-2 7-6 4l-8-4-11 3-19-7Z"
            fill="#c18b65"
          />
          <g className="listener-left-head">
            <path d="m173 297-2 25 17 13 12-12-2-26Z" fill="#b97e56" />
            <path
              d="M157 267c1-26 44-35 54-9l-1 20 8 12-9 4-4 16c-10 9-28 1-39-13Z"
              fill="#c79065"
            />
            <path
              d="M157 283c-9-8-15-23-9-34-11-8-7-20 4-20-1-11 11-17 20-12 5-14 21-15 28-5 11-7 23 1 21 11 14 1 17 13 9 23-4 8-14 11-25 9l-6 17-7-5-7 18Z"
              fill="#403b32"
            />
            <path d="M173 276c-11-8-17 8-6 15l9 2" fill="#c79065" />
            <path
              d="M171 281c-4-4-7 1-3 5"
              fill="none"
              stroke="#a56b4b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="m202 269 7 1"
              stroke="#473b31"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="207" cy="277" r="1.7" fill="#44372e" />
            <path
              d="M201 298c4 2 7 1 9-1"
              fill="none"
              stroke="#8a513c"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Standing mentor: separate head and arm make the gesture live. */}
        <g>
          <path
            d="m344 362 68-2 6 51-17 81-1 76-28 1-4-86 8-68-10-8-5 84-22 70-24-6 18-82Z"
            fill="#52616c"
          />
          <path
            d="m377 397 7 57-13 100m-25-173-3 87-18 66"
            stroke="#3f4e5b"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="m318 548 23 6-5 19-23-4m60-14 26 1 2 20-27 2"
            fill="#dfad8c"
          />
          <path
            d="M310 567c11-4 17 2 26 2l7 12c3 7-2 10-9 9l-31-9c-9-4-1-12 7-14Zm64 2c8 5 18 3 26 0l19 10c7 4 8 13-1 14h-42c-7-3-6-16-2-24Z"
            fill="#37434a"
          />
          <path
            d="M341 210c21-12 45-13 65 1 16 19 17 52 12 85l-7 68c-22 12-53 7-70-2l-12-80Z"
            fill="#d77957"
          />
          <path
            d="m354 217-8 85 6 59c-5 0-8-1-11-3l-12-76 11-65Z"
            fill="#c96849"
          />
          <path
            d="M366 217c9 5 19 6 29 0"
            stroke="#b86345"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M340 215c-11-3-23 14-28 35l-14 67 4 37 18-1 4-39 28-65Z"
            fill="#dd8764"
          />
          <path
            d="m302 344 16-1 2 25-7 27c-3 6-7 3-6-1l2-12-7 10c-3 4-6 2-4-3l5-18-5-6Z"
            fill="#e3b394"
          />
          <g className="mentor-gesture">
            <path
              d="M404 217c16-2 25 21 28 39l13 30 29-24 12 12-35 36c-10 8-22 4-28-6l-26-55Z"
              fill="#df8866"
            />
            <path
              d="m471 262 12-17 3-17c1-7 8-6 7 1l-1 14 13-2 19-6c7-2 9 4 3 7l-17 7 19-1c6 0 6 5 0 7l-18 3 11 3c6 2 4 6-2 6l-15-1-18 11Z"
              fill="#e3b394"
            />
            <path
              d="m485 260 8-9 11-2"
              stroke="#c58f70"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="m438 291 8 7m-23-47 8 26"
              stroke="#c77052"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          <g className="mentor-head">
            <path d="m359 174-2 34c8 11 25 15 34 5l-8-31Z" fill="#d9a17f" />
            <path
              d="M347 142c-1-21 36-31 50-12 9 13 4 24 5 38l6 11-9 5-5 18c-12 9-29-3-39-20Z"
              fill="#e4b496"
            />
            <path
              d="M347 170c-12-16-15-45-2-59 11-14 43-17 56 0 6 7 6 16 4 26-10-2-18-7-22-14-7 15-15 19-26 21l-1 20-4 7Z"
              fill="#4b3e34"
            />
            <path
              d="M344 134c4-16 19-23 33-21"
              stroke="#65503e"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M357 166c-12-12-19 5-8 14l11 1" fill="#e4b496" />
            <path
              d="m350 169 5 6"
              stroke="#ba876b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="m385 151 10 1"
              stroke="#584334"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="392" cy="160" r="1.8" fill="#46362d" />
            <path
              d="m392 166 2 9-5 1m-5 10c4 3 8 3 11 0"
              fill="none"
              stroke="#b17b63"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Middle chair and listener, angled into the conversation. */}
        <g>
          <path
            d="m531 429-37 137m117-135 19 141m-72-137 37 131"
            stroke="#645947"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M570 303c39-8 65 24 63 66l-3 55c-3 30-54 42-89 28-35-14-41-58-27-86Z"
            fill="#d58a43"
          />
          <path
            d="M526 405c26-15 61-15 82 3 20 18 11 42-6 54l-56 15-25 61-22-7 20-78 37-21-42 7Z"
            fill="#ad7258"
          />
          <path
            d="M539 419c-12 4-25 13-26 29l-9 76-23 17 12 15 39-14 19-79 30-9"
            fill="#c28b6b"
          />
          <path d="m500 522 22 6-7 23-26-6Z" fill="#dfb090" />
          <path d="m483 537 19 12-7 18-30 5c-14 1-17-7-10-11Z" fill="#e1b492" />
          <path
            d="M485 547c9 7 13 8 22 7l5 13-12 12-46 1c-9-2-7-10 1-14Z"
            fill="#9b6047"
          />
          <path
            d="M538 292c14-8 38-9 56 3l18 32-9 75c-18 13-54 14-77 3l-6-66Z"
            fill="#334554"
          />
          <path d="m570 302 6 95c12 0 20-3 27-6l6-64-15-30Z" fill="#2c3b47" />
          <path
            d="M536 299c-16 0-23 11-29 30l-15 39-7 35 17 5 16-32 26-43Z"
            fill="#334554"
          />
          <path
            d="m486 397 15 6-3 12 2 15c-1 7-7 7-8 1l-2-10-5 11c-3 4-6 3-5-3l-1-15Z"
            fill="#d9a384"
          />
          <path
            d="M593 301c14-4 24 16 28 35l6 47c0 17-8 26-26 25l-40-3 1-17 37-7-13-41Z"
            fill="#3c4e5d"
          />
          <path
            d="m560 388 15-2 2 18-16 4-19-2c-6-1-8-4-3-6l10-1-9-4c-5-3-2-6 2-4Z"
            fill="#d9a384"
          />
          <g className="listener-center-head">
            <path d="m552 267-6 27c9 15 25 14 34 1l-8-26Z" fill="#c08b72" />
            <path
              d="M539 241c-3-22 28-31 43-15 7 11 7 26 4 36l-9 19c-11 7-28-2-32-14l-2-9-8-4Z"
              fill="#d7a58a"
            />
            <path
              d="M538 246c-7-8-7-16-4-22-11-2-13-13-6-19 4-5 10-5 17-2 1-13 19-17 26-8 10-8 23-2 24 7 12-1 21 14 12 23-1 14-6 21-18 21l-5-15c-13 2-22-4-29-10l-6 10-6-1 1 17Z"
              fill="#8c6356"
            />
            <path d="M585 246c10-11 17 2 8 10l-8 2" fill="#d7a58a" />
            <path
              d="m544 237 8-2m11 2 7 1"
              stroke="#6e4d40"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="549" cy="244" r="1.6" fill="#584236" />
            <circle cx="566" cy="245" r="1.6" fill="#584236" />
            <path
              d="m555 246-3 9 5 2m-4 9c5 2 8 1 10-2"
              stroke="#a5735f"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>

        {/* Right chair and the listener who responds. */}
        <g>
          <path
            d="m687 468-25 117m121-122 35 119m-84-113 36 115m2-116-20 111"
            stroke="#675b47"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M764 326c29-5 53 12 61 40 13 44-1 100-39 118-28 14-68 8-91-16-19-20-13-60 0-86Z"
            fill="#da924c"
          />
          <path
            d="M796 340c11 28 13 67 0 91-14 27-42 34-79 29l-12 10c26 17 50 18 74 10 33-13 47-56 43-89-2-22-10-44-26-51Z"
            fill="#ca7b34"
          />
          <path
            d="M705 412c-22 2-40 13-53 35l-24 53-1 59 26 1 8-53 35-47 55-13Z"
            fill="#c65d43"
          />
          <path
            d="M731 421c-14 15-46 21-57 37l-24 55-7 54 28 4 12-46 30-38c34-1 58-8 66-27 8-16-1-33-14-40Z"
            fill="#df805d"
          />
          <path d="m628 548 26 3-2 23-30 1Z" fill="#d5a17b" />
          <path
            d="M622 566c10 5 20 3 28 2l3 18-35 6h-25c-10-3-6-10 1-12Z"
            fill="#844e3b"
          />
          <path d="m644 555 25 5-3 20-27-1Z" fill="#d5a17b" />
          <path
            d="M639 574c9 4 18 5 26 0l10 13c4 6 0 11-8 11h-52c-10-2-9-10-1-13Z"
            fill="#9c5c42"
          />
          <path
            d="M716 320c13-10 38-15 50-6 15 12 20 49 18 80l-12 44c-24 12-47 2-66-10l-7-67Z"
            fill="#f5e9d7"
          />
          <path
            d="m762 321 7 59-7 42c-8 7-15 8-27 6l-25-3-4 7c29 17 49 19 66 6l12-44c2-36-5-65-22-73Z"
            fill="#e7d8c1"
          />
          <path
            d="M744 351c-6 24-16 44-39 55l-31-3 1-18 30-7 16-42Z"
            fill="#f3e5d0"
          />
          <path
            d="m674 385-14-3-15-10c-5-3-9 1-5 5l9 10-15-3c-6-1-7 4-2 6l17 7 26 5Z"
            fill="#d4a07b"
          />
          <g className="listener-right-gesture">
            <path
              d="M721 325c-15 0-23 12-25 29l-9 16-23-18-12 14 31 29c10 7 24 2 29-10l19-36Z"
              fill="#fcf1e1"
            />
            <path
              d="m658 361-17-11-10-23c-2-6 3-9 6-4l7 11-3-22c0-6 6-7 7-1l5 20 2-22c1-5 7-5 7 1v24l5-14c2-5 8-3 6 3l-4 22 2 11Z"
              fill="#d8a481"
            />
            <path
              d="m646 340 9 10 9-3"
              fill="none"
              stroke="#bc8868"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
          <g className="listener-right-head">
            <path d="m728 291-6 31c10 10 23 10 33-1l-4-32Z" fill="#bf8866" />
            <path
              d="M719 256c11-18 42-11 48 10l-5 31c-3 16-16 24-29 17l-14-11-4-16-9-6 8-12Z"
              fill="#d6a380"
            />
            <path
              d="M718 263c-9-20 2-41 23-44 24-2 42 15 40 39-1 15-5 32-17 43l-9-5 2-23-11 2-7-20c-8 8-14 10-21 8Z"
              fill="#3b382f"
            />
            <path d="M752 278c7-15 21-4 12 7l-10 6" fill="#d6a380" />
            <path
              d="m758 279 2 5"
              stroke="#b37d5d"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="m718 270 9-2"
              stroke="#584635"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="721" cy="279" r="1.7" fill="#453729" />
            <path
              d="M720 297c3 3 7 4 11 1"
              stroke="#a16d52"
              strokeWidth="1.7"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
        <g fill="#a0b3a6">
          <circle className="conversation-dot" cx="456" cy="187" r="4" />
          <circle className="conversation-dot" cx="472" cy="182" r="4" />
          <circle className="conversation-dot" cx="488" cy="187" r="4" />
        </g>
      </svg>
    </div>
  );
}
