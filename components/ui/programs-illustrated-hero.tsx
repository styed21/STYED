import { useRef } from "react";
import { programs } from "../../src/data/content";
import { Arrow } from "../../src/components/Arrow";
import { Reveal } from "../../src/components/Reveal";
import {
  useVisibleAnimation,
  type VisibleTimeline,
} from "../../src/hooks/useVisibleAnimation";

function animatePrograms(tl: VisibleTimeline) {
  tl.to(
    ".programs-connection-line",
    { strokeDashoffset: -34, duration: 9, ease: "none" },
    0,
  )
    .to(
      ".program-art-head",
      {
        rotation: 3,
        transformOrigin: "50% 90%",
        duration: 1.6,
        stagger: 0.16,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0.5,
    )
    .to(
      ".education-guidance",
      {
        rotation: -5,
        svgOrigin: "238 180",
        duration: 1.5,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0.3,
    )
    .to(
      ".education-pencil",
      {
        rotation: 5,
        svgOrigin: "123 260",
        duration: 0.45,
        repeat: 5,
        yoyo: true,
        ease: "sine.inOut",
      },
      2.8,
    )
    .to(
      ".housing-key",
      {
        rotation: -12,
        svgOrigin: "176 227",
        duration: 1.2,
        repeat: 3,
        yoyo: true,
        ease: "sine.inOut",
      },
      1.2,
    )
    .to(
      ".community-conversation",
      {
        rotation: -5,
        svgOrigin: "245 222",
        duration: 1.4,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      3.6,
    )
    .to(
      ".rights-guidance",
      {
        rotation: 3,
        svgOrigin: "278 235",
        duration: 1.6,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      4.3,
    )
    .to(
      ".program-art-leaves",
      {
        rotation: 3,
        transformOrigin: "50% 100%",
        duration: 2,
        stagger: 0.2,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0.2,
    )
    .to(
      ".community-sun-rays",
      { opacity: 0.45, duration: 2, repeat: 1, yoyo: true, ease: "sine.inOut" },
      1,
    );
}

type HeadProps = {
  x: number;
  y: number;
  skin?: string;
  hair?: string;
  style?: "short" | "curly" | "bun" | "long" | "cap";
  facing?: 1 | -1;
  scale?: number;
  glasses?: boolean;
};

function Head({
  x,
  y,
  skin = "#dcaa86",
  hair = "#44382e",
  style = "short",
  facing = 1,
  scale = 1,
  glasses = false,
}: HeadProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`}>
      <g className="program-art-head">
        {style === "long" && (
          <path
            d="M-22-22c-4-24 39-32 50-8 8 18-3 22 9 47l-2 29-57-2-9-18Z"
            fill={hair}
          />
        )}
        <path d="m-9 11-4 24c9 9 19 9 28 0L10 13Z" fill={skin} />
        <path
          d="M-22-21c8-20 40-17 47 2l-1 14 6 10-7 4-5 17c-14 10-33-7-37-19Z"
          fill={skin}
        />
        {style === "short" && (
          <path
            d="M-22 3c-13-10-12-34-3-45 12-13 37-11 49 0 7 6 8 17 4 26-10-1-16-5-20-12-8 13-17 11-23 18l-1 14Z"
            fill={hair}
          />
        )}
        {(style === "curly" || style === "bun") && (
          <>
            <path
              d="M-22 6c-10-7-15-21-11-30-10-10-1-23 10-21 0-12 14-20 23-12 8-12 25-8 27 4 15-2 25 14 15 25-1 11-12 16-25 10L5-24c-6 11-16 10-20 18l-1 13Z"
              fill={hair}
            />
            {style === "bun" && (
              <>
                <circle cx="17" cy="-58" r="18" fill={hair} />
                <path
                  d="M6-59c5-8 12-10 17-5"
                  fill="none"
                  stroke="#ffffff19"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </>
            )}
          </>
        )}
        {style === "long" && (
          <path
            d="M-24 5c-10-16-10-30 0-42 12-15 36-15 48-1 7 6 8 17 6 25-10-1-18-9-22-18-7 14-14 20-23 25l-3 12Z"
            fill={hair}
          />
        )}
        {style === "cap" && (
          <>
            <path
              d="M-26-1c-8-14-6-31 6-42 13-10 34-9 44 3 6 9 7 20 3 30L5-21-13 1Z"
              fill={hair}
            />
            <path
              d="M-30-16c-1-32 17-44 37-39 20 4 24 20 24 37Z"
              fill="#2856a4"
            />
            <path
              d="m-28-17 61-2 12 10c-16 7-31 5-46-2l-27 1Z"
              fill="#3e6abd"
            />
            <path
              d="M-3-48c-8 7-11 17-10 28"
              fill="none"
              stroke="#7395d2"
              strokeWidth="2"
            />
          </>
        )}
        <path d="M-14-1c-12-12-21 3-11 12l11 3" fill={skin} />
        <path
          d="m-22 4 6 5"
          stroke="#7e5138"
          strokeOpacity=".4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="m7-11 10 1"
          stroke={hair}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="13" cy="-2" r="1.8" fill="#393129" />
        <path
          d="M7 16c4 3 8 3 12 0"
          fill="none"
          stroke="#875840"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        {glasses && (
          <g fill="none" stroke="#fdf6e8" strokeWidth="2.4">
            <circle cx="-3" cy="1" r="8" />
            <circle cx="17" cy="2" r="8" />
            <path d="m5 1 4 1m-21-2-7-3" />
          </g>
        )}
      </g>
    </g>
  );
}

function Plant({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="program-art-leaves">
        <path d="M0 0c-15-30-17-56-4-84 18 18 23 44 4 84Z" fill="#9ba977" />
        <path d="M1 0c1-34 10-57 34-67 0 32-11 56-34 67Z" fill="#7b9567" />
        <path d="M-3 0c-26-12-38-32-33-55 26 9 38 28 33 55Z" fill="#a8b288" />
        <path
          d="M0 2v-64m0 55 22-39M0-8l-23-28"
          stroke="#5b7850"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <path d="M-22 0h44l-7 43h-30Z" fill="#bd8a67" />
      <path d="M-24-2h48v8h-48Z" fill="#cd9c77" />
    </g>
  );
}

function Ground({ tint = "#eee2d5" }: { tint?: string }) {
  return (
    <>
      <path d="M0 393c88-14 267-15 360 0v29H0Z" fill={tint} />
      <path
        d="M4 220C-4 115 49 68 122 68c62-44 162-17 193 29 51 50 65 168 34 291H13Z"
        fill={tint}
        opacity=".48"
      />
    </>
  );
}

function EducationArt() {
  return (
    <svg viewBox="0 0 360 430" aria-hidden="true" className="program-vignette">
      <Ground />
      <Plant x={38} y={256} scale={0.85} />
      <path
        d="M207 223h63l2 81-13 88-27-2-3-89-12 89-25-1 1-94Z"
        fill="#6583b6"
      />
      <path
        d="m237 243 6 65-3 68"
        fill="none"
        stroke="#4d6ba0"
        strokeWidth="3"
      />
      <path
        d="m192 383 26 1 2 14-32 10-24-1c-10-5-5-12 3-14Zm41 2h27l14 15c5 7 0 12-8 11h-36c-7-5-6-13 3-26Z"
        fill="#3d3c33"
      />
      <path
        d="M213 146c17-8 39-6 49 7l24 58-16 32-66-5-15-49Z"
        fill="#c16c3f"
      />
      <path d="m242 158 4 64 23 11-1 10-64-5-8-32 7-37" fill="#b35a30" />
      <path
        d="M209 154c-13-3-19 7-24 22l-20 26-34-13-7 16 43 25c11 4 21-1 28-12l26-34Z"
        fill="#ce8050"
      />
      <path
        d="m126 188-15-1-16 8c-6 4-3 8 2 6l11-2 12 9 10-5Z"
        fill="#e4ac86"
      />
      <Head x={230} y={123} style="bun" glasses />
      <path
        d="m221 154 5 20 15 8"
        fill="none"
        stroke="#dc9a66"
        strokeWidth="2.5"
      />
      <g className="education-guidance">
        <path
          d="M259 159c10 4 15 17 15 31l2 44c0 10-6 17-16 20l-57 12-5-17 48-19-10-37Z"
          fill="#d28151"
        />
        <path
          d="m198 248-17 4-9 7c-4 4-1 8 4 5l12-3 15 7 5-16Z"
          fill="#e4ac86"
        />
      </g>
      <path
        d="M55 259c-15 1-21 15-19 37l4 50h103l5-49c0-24-21-40-41-40Z"
        fill="#b1b990"
      />
      <path
        d="m47 335-10 67m98-65 18 64"
        stroke="#716947"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M64 287c21-7 46-4 68 14 13 9 18 25 17 42l-4 45-22 1-13-60-21-1 8 59-22 3-24-69Z"
        fill="#354144"
      />
      <path
        d="m76 333 12 41m40-54 9 47"
        fill="none"
        stroke="#eef0db"
        strokeWidth="2.5"
      />
      <path
        d="m73 384 24-2 4 13 11 6c6 5 3 13-5 13H68c-9-3-7-11 0-16Zm52-2 22-2 9 15 18 5c8 4 5 13-2 13h-50c-7-4-5-13 3-31Z"
        fill="#f8f7ee"
      />
      <path
        d="M69 401h41m16 0h42"
        stroke="#5478b4"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M73 197c13-11 33-12 50-2l25 59-19 38-67-2-8-56Z"
        fill="#426cad"
      />
      <path d="m84 196 19 18 14-22 13 17-27 22-31-24Z" fill="#5a7eb6" />
      <path
        d="m91 217-2 40m20-40 3 25"
        stroke="#eee7d4"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Head x={99} y={166} style="curly" skin="#d2a078" />
      <path
        d="M68 219c-10 0-17 13-20 30l-7 21c0 14 10 21 25 19l51-10-2-18-44 1 10-25Z"
        fill="#4c75b3"
      />
      <path d="m111 260 18-3 17 5c5 3 4 8-2 8l-13-2-17 9Z" fill="#d2a078" />
      <g className="education-pencil">
        <path
          d="m131 263-16-24"
          stroke="#d5a136"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="m115 239-2-6 5 3" fill="#303840" />
      </g>
      <path d="M8 292h344v12H8Z" fill="#a36b43" />
      <path d="M26 303h13v110H26Zm290 0h13v110h-13Z" fill="#865431" />
      <path d="m37 285 52-7 43 12-51 7Z" fill="#fffaf0" />
      <path d="m82 282 3 11m11-8 16 4" stroke="#b9b9a5" strokeWidth="1.3" />
      <path d="m165 235 87-2-11 60h-88Z" fill="#8b9397" />
      <path d="m169 239 77-2-9 51h-77Z" fill="#b5babb" />
      <circle cx="203" cy="263" r="5" fill="#e9eae3" />
      <path d="M142 292h113v4H142Z" fill="#66737a" />
      <path d="M267 281h66v11h-66Z" fill="#b66a3e" />
      <path d="M272 270h64v11h-64Z" fill="#7b8753" />
      <path d="M270 259h62v11h-62Z" fill="#4568a6" />
      <path
        d="M279 263h50m-48 11h52m-56 11h53"
        stroke="#f7efd8"
        strokeWidth="4"
      />
      <path d="M25 356c0-23 40-33 51-10l9 61-63 2Z" fill="#85955c" />
      <path
        d="M34 359c5-12 21-15 29-3m-28 11h27l5 28H31Z"
        fill="none"
        stroke="#56673d"
        strokeWidth="3"
      />
      <path
        d="m27 359-9 44"
        stroke="#424936"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HousingArt() {
  return (
    <svg viewBox="0 0 360 430" aria-hidden="true" className="program-vignette">
      <Ground tint="#e5e6d8" />
      <path d="m127 121 81-73 89 73v165H127Z" fill="#d9c1a9" opacity=".7" />
      <path
        d="M168 133h19v21h-19Zm31 0h19v21h-19Zm-31 32h19v21h-19Zm31 0h19v21h-19Z"
        fill="#f7f1e6"
      />
      <Plant x={173} y={314} scale={0.8} />
      <path
        d="M67 266h59l2 41-10 83-23 3-9-78-7 80-24-2 3-73Z"
        fill="#6484b9"
      />
      <path d="m83 278 12 106" stroke="#4c6da2" strokeWidth="3" />
      <path
        d="m56 384 22 1 7 14 19 7c6 4 3 10-5 10H56c-9-3-7-18 0-32Zm42 0 19-1 11 18 19 5c6 5 1 10-6 10H99c-8-4-7-21-1-32Z"
        fill="#fffaf0"
      />
      <path d="m56 409 46 1m-1-1 43 1" stroke="#d9bea5" strokeWidth="2" />
      <path
        d="M69 174c18-10 41-7 53 11l10 89c-25 18-54 13-72 4l-14-64Z"
        fill="#818d53"
      />
      <path d="m88 175 23 0 8 74-30 22-8-46Z" fill="#fbf6e9" />
      <path
        d="m81 180 20 59 13-59"
        fill="none"
        stroke="#455345"
        strokeWidth="2.5"
      />
      <path d="M98 226h15v23H98Z" fill="#edece2" />
      <path d="M101 233h9v11h-9Z" fill="#557aaf" />
      <Head x={94} y={141} style="long" />
      <path
        d="M64 188c-14 0-19 12-23 35l-5 36c1 12 11 15 24 13l40-9-3-15-38 1 18-41Z"
        fill="#8b985f"
      />
      <path d="M46 221h44v62H46Z" fill="#434835" />
      <path d="M51 226h33v46H51Z" fill="#b2b090" />
      <path d="m67 249 16-3 10 3 1 11-25 3Z" fill="#dfac84" />
      <path
        d="M115 181c14 0 20 13 23 28l9 20 22-9 7 13-33 24c-8 4-18-1-23-11l-22-32Z"
        fill="#8f9a64"
      />
      <path
        d="m166 220 11-7 18 1 14 7c4 4 1 7-4 5l-15-3-12 12-9-1Z"
        fill="#dfac84"
      />
      <g className="housing-key">
        <circle
          cx="178"
          cy="242"
          r="8"
          fill="none"
          stroke="#465043"
          strokeWidth="4"
        />
        <path
          d="m179 249 2 29 8-1-1-8-6 1"
          stroke="#c58b2d"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M175 226v8" stroke="#c98c2e" strokeWidth="3" />
      </g>
      <path
        d="M223 277h62l7 60-4 55-26 1-15-73-8 77-25-1-3-77Z"
        fill="#434638"
      />
      <path d="m245 302 20 67" stroke="#79775b" strokeWidth="2" />
      <path
        d="m214 389 25 0 2 12 12 7c6 5 2 10-5 10h-47c-6-4-4-10 3-14Zm49-2h23l14 18 16 1c7 4 4 10-3 11h-53c-6-5-1-21 3-30Z"
        fill="#c26942"
      />
      <path d="M200 413h51m12 0h52" stroke="#fff6e7" strokeWidth="4" />
      <path
        d="M225 188c17-11 40-11 55 3l21 70-18 34-62-3-14-64Z"
        fill="#c7774e"
      />
      <path d="m244 201 7 79 29 10-1 6-59-3-9-45" fill="#b76641" />
      <Head
        x={247}
        y={156}
        style="bun"
        skin="#a56c46"
        hair="#342f23"
        facing={-1}
      />
      <path
        d="M224 127c13-7 23-8 34-2"
        stroke="#d28a4f"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <g>
        <path
          d="M274 248c15-2 32 0 38 12l-8 39-12 18-12-7 9-30-25-12Z"
          fill="#375ea3"
        />
        <path d="m271 267-5 26 3 20 16 1 5-25Z" fill="#3e69b1" />
        <path
          d="m267 304 16 2 4 12-16 8-12-3c-4-5 4-14 8-19Zm25-1 13 7-3 13-16 9c-7 2-10-3-6-8Z"
          fill="#f8f1df"
        />
        <path
          d="M273 213c14-4 30 2 35 13l6 30-12 13-38-10-4-28Z"
          fill="#6087c7"
        />
        <Head
          x={287}
          y={199}
          style="curly"
          skin="#a96e48"
          hair="#343124"
          scale={0.68}
          facing={-1}
        />
        <path
          d="m271 226-16 22-11-3"
          stroke="#a96e48"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M220 212c-12-3-22 10-23 25l2 24c3 14 17 21 33 17l54-13-4-16-46 6-7-34Z"
        fill="#d08558"
      />
      <path d="m279 250 19-6 11 5c5 3 3 7-2 6l-9 1-9 10-10-1Z" fill="#aa724a" />
    </svg>
  );
}

function SafetyArt() {
  return (
    <svg viewBox="0 0 360 430" aria-hidden="true" className="program-vignette">
      <Ground tint="#e8e2d3" />
      <path d="M126 111a55 55 0 0 1 110 0Z" fill="#eab55f" />
      <g
        className="community-sun-rays"
        stroke="#e3af55"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M181 41V27m-27 20-5-15m-20 30-10-13m-10 34-15-7m112-29 5-15m20 30 11-13m8 34 14-7" />
      </g>
      <path d="m89 152 91-48 90 48v155H89Z" fill="#ded5c1" />
      <path
        d="M171 172c-15-19-36 0-19 16l20 17 20-17c17-16-5-35-20-16Z"
        fill="#b99a82"
        opacity=".5"
      />
      <Plant x={35} y={300} scale={0.7} />
      <Plant x={318} y={300} scale={0.72} />
      <path d="M14 315h332v16H14Z" fill="#b49370" />
      <path d="M27 331h16v73H27Zm290 0h16v73h-16Z" fill="#947b61" />
      <path d="M44 344h273v60H44Z" fill="#d6bba0" />
      <path
        d="M44 365h273M44 385h273m-234-41v21m100-21v21m100-21v21M96 365v20m100-20v20m100-20v20m-214 0v19m100-19v19m100-19v19"
        stroke="#efe0cb"
        strokeWidth="2"
      />
      <path
        d="M66 288c24-14 66-13 86 9 8 12 5 30-8 42l-24 18 2 37-21 1-16-45 15-27-30-1Z"
        fill="#3d4335"
      />
      <path
        d="M104 303c-7 17-1 25 13 31l28 11 1 48 24 2 4-63-30-27Z"
        fill="#444a3c"
      />
      <path
        d="m117 343 26 6m-43 13 10 22"
        stroke="#ada586"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="m100 388 23 0 7 13 18 6c6 5 3 11-5 11H96c-8-5-4-22 4-30Zm47 1h22l11 14 16 4c5 5 1 11-6 11h-46c-6-5-2-22 3-29Z"
        fill="#fcf5e8"
      />
      <path d="M99 412h46m2 0h45" stroke="#c7b19c" strokeWidth="2" />
      <path
        d="M77 209c19-12 40-12 57-1l25 71-16 22-70 7-21-42Z"
        fill="#426aad"
      />
      <path d="m80 210 25 20 20-22 9 17-28 21-32-23Z" fill="#577bb7" />
      <path
        d="m96 231-4 29m18-28 3 27"
        stroke="#ddd8bd"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Head x={101} y={178} skin="#9f6c44" style="cap" />
      <path
        d="M66 227c-12 1-17 21-14 36l8 20c6 13 18 18 31 13l26-11-4-16-29 6-3-32Z"
        fill="#4c73b2"
      />
      <path
        d="m112 270 17-4 19 6c5 3 3 8-2 6l-15-2 10 8c3 4 0 7-4 5l-22-6Z"
        fill="#a06c44"
      />
      <path
        d="M131 224c15 2 23 20 20 38l-9 22-21 1-1-15 14-9-12-23Z"
        fill="#4064a1"
      />
      <path
        d="M231 292c23-14 59-9 70 10 12 17 0 29-20 34l-42 17-15 41-24-4 11-58 36-17-20 1Z"
        fill="#6c87b7"
      />
      <path
        d="M256 309c-9 16-9 22 9 26l20 10-24 50-24-3 13-43-25-20Z"
        fill="#7591c0"
      />
      <path
        d="m201 383 23 7-3 12-29 14-23-1c-6-5 0-11 7-14Zm37 3 23 5 2 14-23 14h-27c-7-4-3-11 4-15Z"
        fill="#303b37"
      />
      <path d="m173 411 44 1m4 1 38-3" stroke="#f1e9da" strokeWidth="2.5" />
      <path
        d="M228 201c18-11 42-10 58 4l23 69-13 37-64-3-23-37Z"
        fill="#c97647"
      />
      <path d="m248 203 16 20 17-19 8 14-24 23-24-25Z" fill="#dd8c56" />
      <path
        d="m255 229-3 29m18-30 3 24"
        stroke="#e9c6a0"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <Head x={257} y={171} style="bun" facing={-1} skin="#dfad89" />
      <g className="community-conversation">
        <path
          d="M233 213c-12-2-19 13-24 27l-8 7-31-15-8 14 40 25c9 4 18 0 23-10l21-27Z"
          fill="#d78651"
        />
        <path
          d="m169 231-15-4-17-14c-4-3-9 1-6 5l8 9-11-4c-6-2-8 3-3 6l16 9 20 10Z"
          fill="#dfad89"
        />
      </g>
      <path
        d="M288 222c11 4 16 22 18 36l-1 29c-2 14-14 19-27 12l-35-14 6-14 32 10-5-40Z"
        fill="#d88651"
      />
      <path
        d="m249 271-19-3-14 4c-6 2-5 7 1 6l14-1 13 10 9-2Z"
        fill="#dfad89"
      />
    </svg>
  );
}

function RightsArt() {
  return (
    <svg viewBox="0 0 360 430" aria-hidden="true" className="program-vignette">
      <Ground tint="#e7e4df" />
      <path
        d="M183 60c34-17 73-3 77 29 3 24-18 41-47 44l-20 20-1-21c-27-9-44-53-9-72Z"
        fill="#fcf6eb"
      />
      <g fill="none" stroke="#7d98c5" strokeWidth="2">
        <circle cx="208" cy="93" r="26" fill="#bdcbea" />
        <ellipse cx="208" cy="93" rx="12" ry="26" />
        <path d="M182 93h52m-46-13h40m-40 26h40" />
      </g>
      <path
        d="M54 314c-10 11-13 37-10 70l23 9 16-56 19 52 22-1 1-78Z"
        fill="#637552"
      />
      <path
        d="m44 378 24 5 6 15-30 14-22-3c-6-5 2-12 9-14Zm59 3 23 0 10 17 21 6c5 5 2 11-6 11h-45c-9-5-6-22-3-34Z"
        fill="#eee8d9"
      />
      <path
        d="M57 208c20-10 44-9 61 5l21 76-15 35-70-8-14-60Z"
        fill="#9da479"
      />
      <Head
        x={80}
        y={180}
        style="long"
        facing={1}
        skin="#ba825a"
        hair="#302f26"
      />
      <path
        d="M52 225c-12 4-18 26-11 48l14 18 42 0 2-15-34-9 6-22Z"
        fill="#aab18a"
      />
      <path
        d="M239 294h59l7 47-16 57-24-1-1-49-18 50-24-2 4-71Z"
        fill="#57739f"
      />
      <path
        d="m224 388 24 2 4 13 16 6c4 4 0 9-7 9h-43c-7-5-1-23 6-30Zm41 1 24 0 14 14 17 5c5 6 0 10-8 10h-46c-7-4-5-22-1-29Z"
        fill="#3b4145"
      />
      <path
        d="M240 195c19-8 40-7 58 7l30 92-21 21-72-9-18-62Z"
        fill="#6385bb"
      />
      <path
        d="m252 194 16 40 16-35"
        fill="none"
        stroke="#eee5d4"
        strokeWidth="2.5"
      />
      <path d="M261 228h17v26h-17Z" fill="#f2eee3" />
      <path d="M265 235h9v13h-9Z" fill="#5b74a3" />
      <Head
        x={270}
        y={163}
        style="curly"
        facing={-1}
        glasses
        skin="#dfad89"
        hair="#30362e"
      />
      <path
        d="M119 283c19-15 48-16 70 0l13 39-23 21-64-10-11-22Z"
        fill="#bb613c"
      />
      <path d="m117 329-7 31 11 38 22-1 3-35 12 35 24 0 8-62Z" fill="#627495" />
      <path
        d="m122 390 20 0 10 16-31 7-14-2c-5-4 1-11 7-14Zm37 1 22 0 9 15 18 3c5 5 1 10-6 9h-43c-6-4-4-15 0-27Z"
        fill="#f6f0e4"
      />
      <path
        d="M120 244c16-10 38-11 55 1l30 61-13 25-70-7-20-32Z"
        fill="#ce794b"
      />
      <path d="m127 245 19 17 18-18 10 10-27 23-29-22Z" fill="#df8e5b" />
      <path d="m139 266-4 32m18-32 2 29" stroke="#f5d4aa" strokeWidth="2" />
      <Head x={147} y={220} skin="#c99772" style="short" scale={0.85} />
      <path d="M14 326h337v12H14Z" fill="#ba855b" />
      <path d="M28 338h13v78H28Zm292 0h13v78h-13Z" fill="#9c6f48" />
      <path
        d="M118 265c-10 1-15 17-13 33l12 11 49 8 5-14-43-15 3-13Z"
        fill="#d78453"
      />
      <path d="m165 302 15-3 14 5c5 4 2 8-3 6l-11-1-13 9Z" fill="#c99772" />
      <g className="rights-guidance">
        <path
          d="M299 222c14 4 19 23 20 41l2 27c-2 14-15 20-27 14l-43-20 7-16 38 11-12-37Z"
          fill="#7091c5"
        />
        <path
          d="m254 269-15-6-13 2c-5 3-3 7 2 7l10 1 13 14 8-5Z"
          fill="#dfad89"
        />
        <path d="m208 235 60-8 13 88-60 7Z" fill="#fffaf0" />
        <text
          x="242"
          y="253"
          textAnchor="middle"
          fill="#31435b"
          fontSize="9"
          fontFamily="Montserrat, sans-serif"
          fontWeight="500"
          transform="rotate(-7 242 253)"
        >
          YOUR RIGHTS
        </text>
        <path
          d="m220 270 41-5m-39 15 41-5m-39 15 32-4m-30 14 39-5"
          stroke="#d0c4ae"
          strokeWidth="2"
        />
      </g>
      <path d="M219 351h83v13h-83Z" fill="#c67a45" />
      <path d="M227 338h73v13h-73Z" fill="#7b8657" />
      <path d="M226 325h77v13h-77Z" fill="#4f72ad" />
      <path
        d="M237 331h62m-64 13h61m-65 14h67"
        stroke="#f3ead6"
        strokeWidth="5"
      />
      <Plant x={329} y={377} scale={0.8} />
    </svg>
  );
}

function ProgramIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 84 84"
      className={`program-pillar-icon program-pillar-icon-${index}`}
      aria-hidden="true"
    >
      <path
        d="M7 25C19 5 48 1 66 12c18 11 19 42 6 56C59 84 28 84 13 68-1 53-2 40 7 25Z"
        fill={["#efd0ab", "#c3c7a6", "#c87949", "#a1b6dc"][index]}
      />
      <g
        fill="none"
        stroke={index === 2 ? "#fffaf1" : index === 0 ? "#96502b" : "#263c58"}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {index === 0 && (
          <>
            <path
              className="program-book"
              d="M17 23c12-1 20 5 25 10 7-6 15-10 25-10v37c-11 0-19 2-25 7-8-5-16-7-25-7Zm25 10v34"
            />
            <path d="m12 28-1 38 31 3 31-3-1-38" />
          </>
        )}
        {index === 1 && (
          <>
            <path
              d="m16 41 26-24 27 24-5 0v25H49V48H36v18H21V41Z"
              fill="#33433b"
              stroke="#33433b"
            />
            <path d="M58 22v10" stroke="#33433b" strokeWidth="5" />
          </>
        )}
        {index === 2 && (
          <>
            <path d="M42 16c8 7 16 10 24 11-1 22-8 34-24 44-16-10-23-22-24-44 9-1 16-4 24-11Z" />
            <path
              d="m42 52-9-9c-10-10 3-21 9-10 7-11 20 0 9 10Z"
              fill="#fffaf1"
              stroke="none"
            />
          </>
        )}
        {index === 3 && (
          <>
            <circle cx="42" cy="42" r="26" />
            <ellipse cx="42" cy="42" rx="12" ry="26" />
            <path d="M16 42h52m-46-16c12 8 29 8 40 0M22 58c12-7 29-7 40 0M42 16v52" />
          </>
        )}
      </g>
    </svg>
  );
}

const art = [EducationArt, HousingArt, SafetyArt, RightsArt];

export function ProgramsIllustratedHero({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const root = useRef<HTMLElement>(null);
  const reduced = useVisibleAnimation(root, animatePrograms);
  return (
    <section
      ref={root}
      className="programs-illustrated-hero"
      aria-labelledby="programs-page-title"
      data-motion={reduced ? "reduced" : "paused"}
    >
      <div className="programs-illustrated-intro">
        <div>
          <span className="eyebrow">STYED / Our programs</span>
          <Reveal>
            <h1 id="programs-page-title">
              More support.
              <br />
              <em>More possibility.</em>
            </h1>
          </Reveal>
        </div>
        <div className="programs-illustrated-intro-note">
          <p>
            For learning. For safety. For a place to belong.
            <br /> Four connected ways to stand with our youth.
          </p>
          <a href="#drug-prevention">
            Our drug-prevention approach <Arrow direction="down" />
          </a>
        </div>
      </div>
      <nav
        className="programs-illustrated-grid"
        aria-label="Explore STYED’s four programs"
      >
        <svg
          className="programs-connection"
          viewBox="0 0 1200 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="programs-connection-line"
            d="M20 61C120-15 231-15 293 49c42 60-48 43-11-4C351-14 491-8 574 52c40 56-40 45-8-1C637-15 788-8 857 48c45 55-45 47-10-2 74-52 203-44 327 11"
            fill="none"
            stroke="#ad937e"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
        </svg>
        {programs.map((program, index) => {
          const Scene = art[index];
          return (
            <a
              key={program.id}
              className="program-illustrated-link"
              href={`#${program.id}`}
              onClick={() => onSelect(program.id)}
              aria-label={`${program.name}: view details`}
            >
              <div className="program-illustrated-label">
                <ProgramIcon index={index} />
                <h2>{program.name}</h2>
              </div>
              <Scene />
              <span className="program-illustrated-cta">
                Explore program <Arrow />
              </span>
            </a>
          );
        })}
      </nav>
      <div className="programs-illustrated-footer">
        <span>Minneapolis & the Twin Cities</span>
        <span>Education. Stability. Safety. Belonging.</span>
      </div>
    </section>
  );
}
