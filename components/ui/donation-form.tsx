"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { gsap, useGSAP, useReducedMotion } from "@/src/hooks/useMotion";
import { Arrow } from "@/src/components/Arrow";
import { scrollToPosition } from "@/src/lib/scroll";
import {
  formatGift,
  giftAmounts,
  giftAreas,
  parseGiftAmount,
  type GiftFrequency,
} from "@/src/lib/donation";

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 53 10 31C-3 17 15 2 27 14l5 5 5-5C49 2 67 17 54 31L32 53Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GivingToken({
  cents,
  frequency,
}: {
  cents: number;
  frequency: GiftFrequency;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(root, { amount: 0.15 });
  const float = useRef<gsap.core.Tween | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useGSAP(
    () => {
      if (reduced) return;
      float.current = gsap.to(".giving-token-float", {
        y: -11,
        rotation: 2,
        duration: 3.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.from(".giving-token-sheet", {
        y: 50,
        rotationX: 20,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 90%", once: true },
      });
      const surface = root.current;
      const token = surface?.querySelector<HTMLElement>(".giving-token-float");
      if (!surface || !token || !window.matchMedia("(pointer: fine)").matches)
        return;
      const rotateX = gsap.quickTo(token, "rotationX", {
        duration: 0.7,
        ease: "power3.out",
      });
      const rotateY = gsap.quickTo(token, "rotationY", {
        duration: 0.7,
        ease: "power3.out",
      });
      const move = (event: PointerEvent) => {
        const rect = surface.getBoundingClientRect();
        rotateX((0.5 - (event.clientY - rect.top) / rect.height) * 12);
        rotateY(((event.clientX - rect.left) / rect.width - 0.5) * 18);
      };
      const reset = () => {
        rotateX(0);
        rotateY(0);
      };
      surface.addEventListener("pointermove", move);
      surface.addEventListener("pointerleave", reset);
      return () => {
        surface.removeEventListener("pointermove", move);
        surface.removeEventListener("pointerleave", reset);
        rotateX.tween.kill();
        rotateY.tween.kill();
      };
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  useEffect(() => {
    float.current?.paused(!inView || !visible || reduced);
  }, [inView, visible, reduced]);
  return (
    <div ref={root} className="giving-token-scene">
      <div className="giving-token-orbit" aria-hidden="true" />
      <div className="giving-token-float" aria-hidden="true">
        <div className="giving-token-sheet token-back" />
        <div className="giving-token-sheet token-middle" />
        <div className="giving-token-sheet token-front">
          <span className="token-top">
            STYED <span>A GIFT OF POSSIBILITY</span>
          </span>
          <Heart />
          <motion.span
            key={cents}
            className="token-value"
            initial={false}
            animate={{ scale: reduced ? 1 : [1, 1.07, 1] }}
            transition={{ duration: reduced ? 0 : 0.45 }}
          >
            {formatGift(cents)}
          </motion.span>
          <span className="token-frequency">
            {frequency === "monthly"
              ? "a little care, every month"
              : "one gift, shared possibility"}
          </span>
          <span className="token-bottom">
            SAFE YOUTH <span>FOR HOPE.</span>
          </span>
        </div>
      </div>
      <span className="giving-token-caption">
        It starts with someone like you.
      </span>
    </div>
  );
}

export function DonationForm() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const customInput = useRef<HTMLInputElement>(null);
  const interacted = useRef(false);
  const id = useId();
  const reduced = useReducedMotion();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [frequency, setFrequency] = useState<GiftFrequency>("once");
  const [preset, setPreset] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [area, setArea] = useState<string>(giftAreas[0]);
  const [error, setError] = useState("");
  const cents = preset === null ? parseGiftAmount(custom) : preset * 100;
  const amount = formatGift(cents ?? 0);
  const cadence = frequency === "monthly" ? "every month" : "one time";
  const go = (next: 0 | 1 | 2) => {
    interacted.current = true;
    setStep(next);
    if (card.current)
      scrollToPosition(
        card.current.getBoundingClientRect().top + window.scrollY - 112,
      );
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (cents === null) {
      setError(
        "Enter an amount from $1 to $10,000, with up to two decimal places.",
      );
      customInput.current?.focus();
      return;
    }
    setError("");
    go(step === 0 ? 1 : 2);
  };
  return (
    <section
      ref={root}
      className="giving-section"
      id="give"
      aria-labelledby="giving-section-title"
    >
      <div className="giving-story">
        <span className="eyebrow">Your kindness, put to work</span>
        <h1 id="giving-section-title">
          Help the everyday
          <br />
          <em>become possible.</em>
        </h1>
        <p>
          A patient explanation. A trusted mentor. A safer place to learn. Your
          support helps create more of the moments that matter.
        </p>
        <GivingToken cents={cents ?? 0} frequency={frequency} />
        <div className="giving-story-foot">
          <span>FOR OUR YOUTH.</span>
          <p>Education, stability, and a sense of belonging. All connected.</p>
        </div>
      </div>
      <div ref={card} className="giving-card">
        <div className="giving-demo-banner">
          <span>DEMO</span>
          <p>A preview of giving. No real payment will be taken.</p>
        </div>
        <ol className="giving-steps" aria-label="Donation progress">
          {["Your gift", "Review", "Thank you"].map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={i <= step ? "is-reached" : ""}
            >
              <span>{i < step ? "✓" : `0${i + 1}`}</span>
              {label}
            </li>
          ))}
        </ol>
        <div className="giving-progress-track" aria-hidden="true">
          <motion.div
            animate={{ scaleX: step / 2 }}
            initial={false}
            transition={{
              duration: reduced ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            className="giving-panel"
            initial={{ opacity: 0, x: reduced ? 0 : 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0 : 0.24 }}
            onAnimationComplete={() => {
              if (interacted.current)
                heading.current?.focus({ preventScroll: true });
            }}
          >
            {step < 2 ? (
              <form onSubmit={submit} noValidate>
                <div className="giving-card-title">
                  <span className="eyebrow">
                    {step === 0 ? "A little can mean a lot" : "One more look"}
                  </span>
                  <h3 ref={heading} tabIndex={-1}>
                    {step === 0 ? "Choose your gift." : "A gift from you."}
                  </h3>
                </div>
                {step === 0 ? (
                  <>
                    <fieldset className="giving-frequency">
                      <legend className="sr-only">
                        How often would you like to give?
                      </legend>
                      {(["once", "monthly"] as const).map((value) => (
                        <label
                          key={value}
                          className={frequency === value ? "is-selected" : ""}
                        >
                          <input
                            type="radio"
                            name={id + "-frequency"}
                            value={value}
                            checked={frequency === value}
                            onChange={() => setFrequency(value)}
                          />
                          {frequency === value && (
                            <motion.span
                              className="frequency-pill"
                              layoutId={id + "-frequency-pill"}
                              transition={{ duration: reduced ? 0 : 0.3 }}
                            />
                          )}
                          <span>
                            {value === "once" ? "Give once" : "Give monthly"}
                          </span>
                          {value === "monthly" && <Heart />}
                        </label>
                      ))}
                    </fieldset>
                    <fieldset className="giving-amounts">
                      <legend>
                        Choose an amount <span>USD</span>
                      </legend>
                      <div className="giving-amount-grid">
                        {giftAmounts.map((value) => (
                          <label
                            key={value}
                            className={preset === value ? "is-selected" : ""}
                          >
                            <input
                              type="radio"
                              name={id + "-amount"}
                              value={value}
                              checked={preset === value}
                              onChange={() => {
                                setPreset(value);
                                setError("");
                              }}
                            />
                            <span>${value}</span>
                            <span className="amount-check" aria-hidden="true">
                              {preset === value ? "✓" : "+"}
                            </span>
                          </label>
                        ))}
                      </div>
                      <div
                        className={`giving-custom ${preset === null ? "is-selected" : ""}`}
                      >
                        <label className="giving-custom-choice">
                          <input
                            type="radio"
                            name={id + "-amount"}
                            checked={preset === null}
                            onChange={() => {
                              setPreset(null);
                              customInput.current?.focus();
                            }}
                          />
                          <span>Other amount</span>
                        </label>
                        <span className="giving-custom-input">
                          <span aria-hidden="true">$</span>
                          <input
                            ref={customInput}
                            type="text"
                            inputMode="decimal"
                            value={custom}
                            placeholder="Your amount"
                            aria-label="Custom donation amount in US dollars"
                            aria-invalid={!!error}
                            aria-describedby={error ? id + "-error" : undefined}
                            onFocus={() => setPreset(null)}
                            onChange={(event) => {
                              setCustom(event.target.value);
                              setPreset(null);
                              setError("");
                            }}
                          />
                        </span>
                      </div>
                    </fieldset>
                    {error && (
                      <p
                        className="giving-error"
                        id={id + "-error"}
                        role="alert"
                      >
                        {error}
                      </p>
                    )}
                    <label className="giving-area" htmlFor={id + "-area"}>
                      Put my gift toward
                      <select
                        id={id + "-area"}
                        value={area}
                        onChange={(event) => setArea(event.target.value)}
                      >
                        {giftAreas.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <div className="giving-summary" aria-live="polite">
                      <span>
                        Your {frequency === "monthly" ? "monthly" : "one-time"}{" "}
                        gift
                      </span>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.strong
                          key={amount}
                          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                          transition={{ duration: reduced ? 0 : 0.12 }}
                        >
                          {amount}
                          <small> USD</small>
                        </motion.strong>
                      </AnimatePresence>
                    </div>
                    <button type="submit" className="button giving-submit">
                      Continue with {amount} <Arrow />
                    </button>
                    <p className="giving-small-note">
                      {frequency === "monthly"
                        ? "Explore recurring support in this demo. No subscription is created."
                        : "You can review your gift before completing the demo."}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="giving-review-amount">
                      <Heart />
                      <div>
                        <strong>{amount}</strong>
                        <span>USD · {cadence}</span>
                      </div>
                      <button type="button" onClick={() => go(0)}>
                        Edit gift
                      </button>
                    </div>
                    <p className="giving-designation">
                      For {area.toLowerCase()}
                    </p>
                    <fieldset className="giving-sample-details">
                      <legend>Sample donor details</legend>
                      <div className="giving-field-row">
                        <label>
                          First name
                          <input value="Alex" readOnly aria-readonly="true" />
                        </label>
                        <label>
                          Last name
                          <input value="Morgan" readOnly aria-readonly="true" />
                        </label>
                      </div>
                      <label>
                        Email address
                        <input
                          type="email"
                          value="alex@example.com"
                          readOnly
                          aria-readonly="true"
                        />
                      </label>
                    </fieldset>
                    <div className="giving-demo-payment">
                      <div>
                        <span>Sample payment method</span>
                        <span className="sample-tag">DEMO CARD</span>
                      </div>
                      <p className="giving-card-number">
                        •••• &nbsp; •••• &nbsp; •••• &nbsp; 4242
                      </p>
                      <span>
                        Alex Morgan <span>12 / 30</span>
                      </span>
                    </div>
                    <p className="giving-payment-note">
                      These are example details only. No card information is
                      collected and no money is transferred.
                    </p>
                    <button type="submit" className="button giving-submit">
                      Complete {amount} demo gift <Heart />
                    </button>
                    <button
                      type="button"
                      className="giving-back"
                      onClick={() => go(0)}
                    >
                      ← Back to your gift
                    </button>
                  </>
                )}
              </form>
            ) : (
              <div className="giving-thank-you">
                <motion.div
                  className="giving-success-mark"
                  initial={{
                    scale: reduced ? 1 : 0.7,
                    rotate: reduced ? 0 : -12,
                  }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: reduced ? 0 : 0.65, type: "spring" }}
                >
                  <Heart />
                  <motion.span
                    initial={{ scale: reduced ? 1 : 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: reduced ? 0 : 0.25 }}
                  >
                    ✓
                  </motion.span>
                </motion.div>
                <span className="eyebrow">Kindness has a way of growing</span>
                <h3 ref={heading} tabIndex={-1}>
                  Thank you for
                  <br />
                  <em>standing with our youth.</em>
                </h3>
                <p>Every act of support begins with someone who cares.</p>
                <div className="giving-demo-receipt">
                  <span>DEMO GIFT SUMMARY</span>
                  <dl>
                    <div>
                      <dt>From</dt>
                      <dd>Alex Morgan</dd>
                    </div>
                    <div>
                      <dt>Gift</dt>
                      <dd>
                        {amount} USD · {cadence}
                      </dd>
                    </div>
                    <div>
                      <dt>Supporting</dt>
                      <dd>{area}</dd>
                    </div>
                  </dl>
                  <p>
                    Demo complete. No charge was made and no receipt email was
                    sent.
                  </p>
                </div>
                <button
                  type="button"
                  className="button giving-submit"
                  onClick={() => go(0)}
                >
                  Explore another gift <Arrow />
                </button>
                <a className="giving-back" href="./programs.html">
                  See the work you can support
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
