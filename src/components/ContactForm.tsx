import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { contactDetails, contactSubjects } from "../data/contact";
import { Arrow } from "./Arrow";
import { ScrollTrigger } from "../hooks/useMotion";
import { scrollToPosition } from "../lib/scroll";

export function ContactForm() {
  const [ready, setReady] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [reviewing, setReviewing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setReady(true);
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (contactSubjects.some(([value]) => value === topic)) {
      setValues((current) => ({ ...current, subject: topic! }));
    }
  }, []);
  useEffect(() => {
    ScrollTrigger.refresh();
    if (reviewing && preview.current) {
      preview.current.focus({ preventScroll: true });
      scrollToPosition(
        preview.current.getBoundingClientRect().top + window.scrollY - 120,
      );
    }
  }, [reviewing]);

  const update = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setCopied(false);
    setCopyError(false);
  };
  const review = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReviewing(true);
  };
  const subject =
    contactSubjects.find(([value]) => value === values.subject)?.[1] ??
    "General inquiry";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `STYED inquiry: ${subject}\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}${values.phone.trim() ? `\nPhone: ${values.phone.trim()}` : ""}\n\n${values.message.trim()}`,
      );
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <>
      <div className="contact-preview-note" id="contact-preview-note">
        <span>Form preview</span>
        <p>
          Online messages aren’t available yet. You can try the form below;
          nothing is sent or saved. To contact us, email{" "}
          <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.
        </p>
      </div>
      <form
        onSubmit={review}
        hidden={reviewing}
        aria-describedby="contact-preview-note"
      >
        <fieldset disabled={!ready} className="contact-fields">
          <legend className="sr-only">
            Your contact information and message
          </legend>
          <label htmlFor="contact-name">
            Full name <span aria-hidden="true">*</span>
            <input
              ref={firstField}
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Your full name"
              required
              maxLength={100}
              value={values.name}
              onChange={(e) => {
                e.target.setCustomValidity(
                  e.target.value.trim() ? "" : "Please enter your name.",
                );
                update("name", e.target.value);
              }}
            />
          </label>
          <label htmlFor="contact-email">
            Email address <span aria-hidden="true">*</span>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              maxLength={254}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>
          <label htmlFor="contact-phone">
            Phone number <small>(optional)</small>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Your phone number"
              maxLength={40}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </label>
          <label htmlFor="contact-subject">
            I’m reaching out about <span aria-hidden="true">*</span>
            <select
              id="contact-subject"
              name="subject"
              required
              value={values.subject}
              onChange={(e) => update("subject", e.target.value)}
            >
              <option value="" disabled>
                Select a subject
              </option>
              {contactSubjects.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="contact-field-wide" htmlFor="contact-message">
            Your message <span aria-hidden="true">*</span>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Tell us a little about how we can help."
              required
              maxLength={3000}
              value={values.message}
              onChange={(e) => {
                e.target.setCustomValidity(
                  e.target.value.trim() ? "" : "Please enter a message.",
                );
                update("message", e.target.value);
              }}
            />
          </label>
          <div className="contact-submit-row contact-field-wide">
            <button className="button button-orange" type="submit">
              Preview message <Arrow direction="right" />
            </button>
            <span>* Required fields</span>
          </div>
        </fieldset>
      </form>
      <noscript>
        <p>
          This preview needs JavaScript. Contact details will be published here
          when available.
        </p>
      </noscript>
      {reviewing && (
        <div
          className="contact-message-preview"
          ref={preview}
          tabIndex={-1}
          aria-labelledby="message-preview-title"
        >
          <span className="eyebrow">Your message / preview only</span>
          <h3 id="message-preview-title">{subject}</h3>
          <dl>
            <div>
              <dt>From</dt>
              <dd>{values.name.trim()}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{values.email.trim()}</dd>
            </div>
            {values.phone.trim() && (
              <div>
                <dt>Phone</dt>
                <dd>{values.phone.trim()}</dd>
              </div>
            )}
          </dl>
          <p className="contact-message-body">{values.message.trim()}</p>
          <p className="contact-preview-reminder">
            This message has not been sent. You can copy it to keep for later.
          </p>
          <div className="contact-review-actions">
            <button
              className="button button-orange"
              type="button"
              onClick={() => void copy()}
            >
              {copied ? "Message copied" : "Copy message"}
              <Arrow direction="right" />
            </button>
            <button
              className="quiet-link"
              type="button"
              onClick={() => {
                setReviewing(false);
                requestAnimationFrame(() =>
                  firstField.current?.focus({ preventScroll: true }),
                );
              }}
            >
              Edit message
            </button>
          </div>
          <p role="status" className="contact-copy-status">
            {copied
              ? "Copied to your clipboard. Nothing has been sent."
              : copyError
                ? "Copy is unavailable. You can select and copy the text above."
                : ""}
          </p>
        </div>
      )}
    </>
  );
}
