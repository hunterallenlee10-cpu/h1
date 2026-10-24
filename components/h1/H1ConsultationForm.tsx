"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import {
  CHOOSE_PACKAGE_EVENT,
  type ChoosePackageEvent,
} from "@/lib/consultation";
import {
  H1_PALETTE,
  H1_PHONE,
  H1_PHONE_HREF,
  h1EquipmentSetups,
  h1Packages,
} from "@/data/h1";

const packageOptions = [
  ...h1Packages.map((pkg) => pkg.name),
  "Not sure yet — help me pick",
];

const equipmentOptions = [...h1EquipmentSetups, "Not sure yet"];

/**
 * Who is filling the form in. The person submitting is often a parent, and
 * the leading remote programs ask this first because it changes how every
 * question after it reads. It changes labels and placeholders here and is
 * sent with the request so the follow-up starts with the right person.
 */
const roles = [
  { value: "athlete", label: "I'm the athlete" },
  { value: "parent", label: "I'm a parent or guardian" },
] as const;
type Role = (typeof roles)[number]["value"];

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  athleteName: "",
  athleteAge: "",
  sport: "",
  packageInterest: "",
  equipment: "",
  goals: "",
};

type FormState = typeof emptyForm;
type FieldErrors = Partial<Record<keyof FormState | "form", string>>;

/** What happens after the button, in the order it happens. */
const nextSteps = [
  {
    title: "We read it",
    detail: "Your coaches review the athlete, the sport, the goals, and the setup.",
  },
  {
    title: "We follow up",
    detail: "We confirm your goals and help you pick the package that fits.",
  },
  {
    title: "Block one gets built",
    detail: "Your first four-week block is written around what you told us.",
  },
];

const labelClass = "mb-2 block text-sm font-semibold text-neutral-200";
const fieldClass =
  "w-full rounded-xl border px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400/60";

export function H1ConsultationForm() {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [role, setRole] = useState<Role>("athlete");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isParent = role === "parent";

  // A pricing card asked for the form with its package chosen. Only a name
  // the select actually offers is accepted, so a stale or mistyped event can
  // never put a value in the field that the visitor could not have picked.
  useEffect(() => {
    const onChoose = (event: Event) => {
      const name = (event as ChoosePackageEvent).detail;
      if (!packageOptions.includes(name)) return;
      setSubmitted(false);
      setFormData((prev) => ({ ...prev, packageInterest: name }));
      setErrors((prev) => ({ ...prev, packageInterest: undefined }));
    };
    window.addEventListener(CHOOSE_PACKAGE_EVENT, onChoose);
    return () => window.removeEventListener(CHOOSE_PACKAGE_EVENT, onChoose);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (formData.fullName.trim().length < 2)
      next.fullName = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      next.email = "Please enter a valid email address";
    const phone = formData.phone.trim();
    if (!phone || !/^[\d\s\-().+]+$/.test(phone) || phone.length < 10)
      next.phone = "Please enter a valid phone number";
    if (isParent && formData.athleteName.trim().length < 2)
      next.athleteName = "Please enter your athlete's name";
    if (!formData.sport.trim()) next.sport = "Please enter the sport you train for";
    if (!formData.packageInterest)
      next.packageInterest = "Please choose a package";
    if (formData.goals.trim().length < 10)
      next.goals = "Please tell us a little more about your goals";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // The recipient is set server side in app/api/h1-consultation/route.ts,
      // never posted from the browser.
      const response = await fetch("/api/h1-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, requesterRole: role, honeypot }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(emptyForm);
        return;
      }

      const data = await response.json().catch(() => null);
      if (data?.errors) {
        setErrors(data.errors as FieldErrors);
      } else {
        setErrors({
          form: `We couldn't send your request. Please try again, or call us directly. Reference: ${
            data?.code || "unknown"
          } · http_${response.status}`,
        });
      }
    } catch {
      setErrors({
        form: "We couldn't reach the server. Please check your connection and try again. Reference: network_error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="h1-consultation-form"
      aria-labelledby="h1-form-title"
      data-sticky-cta="hide"
      // Focusable so `goToConsultation()` can move focus here: a keyboard or
      // screen-reader user who pressed "Book" lands at the form, not back at
      // the button they pressed. -1 keeps it out of the tab order.
      tabIndex={-1}
      className="relative overflow-clip border-t py-20 focus:outline-none md:py-28"
      style={{ borderColor: H1_PALETTE.line, backgroundColor: H1_PALETTE.steel }}
    >
      <div className="h1-grid-bg opacity-50" aria-hidden="true" />

      <div className="section-container relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* What you're signing up for, and what happens next. */}
        <div className="lg:col-span-5">
          <p
            className="h1-eyebrow mb-5 flex items-center gap-3"
            style={{ color: H1_PALETTE.gold }}
          >
            <span
              className="inline-block h-px w-8"
              style={{ backgroundColor: H1_PALETTE.gold }}
              aria-hidden="true"
            />
            10 <span aria-hidden="true">/</span> Get started
          </p>
          <h2
            id="h1-form-title"
            className="heading-lg"
            style={{ color: H1_PALETTE.chalk }}
          >
            Book your free{" "}
            <span style={{ color: H1_PALETTE.gold }}>consultation.</span>
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: H1_PALETTE.muted }}
          >
            Tell us about the athlete and what you&apos;re training with. No
            payment, no commitment — we&apos;ll follow up to confirm the plan.
          </p>

          <ol className="mt-10 space-y-0">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                {i < nextSteps.length - 1 ? (
                  <span
                    className="absolute left-[1.0625rem] top-10 h-[calc(100%-2.5rem)] w-px"
                    style={{ backgroundColor: H1_PALETTE.line }}
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className="h1-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg"
                  style={{
                    borderColor: `${H1_PALETTE.gold}66`,
                    color: H1_PALETTE.gold,
                    backgroundColor: `${H1_PALETTE.gold}0F`,
                  }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p
                    className="h1-display text-2xl"
                    style={{ color: H1_PALETTE.chalk }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="mt-1 text-[0.9375rem] leading-relaxed"
                    style={{ color: H1_PALETTE.muted }}
                  >
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href={H1_PHONE_HREF}
            className="h1-nav-link mt-10 inline-flex items-center gap-2 text-sm font-semibold"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Rather talk? Call Hunter at {H1_PHONE}
          </a>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div
              className="rounded-3xl border p-10 text-center md:p-14"
              style={{
                borderColor: `${H1_PALETTE.gold}4D`,
                backgroundColor: H1_PALETTE.ink,
              }}
            >
              <CheckCircle2
                className="mx-auto mb-5 h-14 w-14"
                style={{ color: H1_PALETTE.gold }}
                aria-hidden="true"
              />
              <h3
                className="h1-display mb-3 text-4xl"
                style={{ color: H1_PALETTE.chalk }}
              >
                Request received.
              </h3>
              <p className="mb-8" style={{ color: H1_PALETTE.muted }}>
                Thank you. We&apos;ll review your goals and follow up to confirm
                your package and build your first four-week block.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-sm font-semibold underline-offset-4 hover:underline"
                style={{ color: H1_PALETTE.gold }}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-describedby="h1-form-description"
              className="relative rounded-3xl border p-6 md:p-10"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: H1_PALETTE.ink,
                boxShadow: "0 40px 80px -40px rgba(0,0,0,0.9)",
              }}
            >
              {/* Who's filling this in. A radio group styled as a segmented
                  control, so it is keyboard- and screen-reader-native. */}
              <fieldset>
                <legend className={labelClass}>Who&apos;s filling this out?</legend>
                <div
                  className="grid grid-cols-1 gap-2 rounded-xl border p-1.5 sm:grid-cols-2"
                  style={{ borderColor: H1_PALETTE.line, backgroundColor: H1_PALETTE.steel }}
                >
                  {roles.map((option) => {
                    const active = role === option.value;
                    return (
                      <label
                        key={option.value}
                        className="relative flex cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2"
                        style={
                          active
                            ? { backgroundColor: H1_PALETTE.gold, color: H1_PALETTE.ink }
                            : { color: H1_PALETTE.muted }
                        }
                      >
                        <input
                          type="radio"
                          name="requesterRole"
                          value={option.value}
                          checked={active}
                          onChange={() => {
                            setRole(option.value);
                            setErrors((prev) => ({ ...prev, athleteName: undefined }));
                          }}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <p
                id="h1-form-description"
                className="mb-7 mt-5 text-sm"
                style={{ color: H1_PALETTE.muted }}
              >
                Fields marked with an asterisk are required.{" "}
                {isParent
                  ? "Enter your own contact details first, then your athlete's information."
                  : "Parents and guardians are welcome to submit on an athlete's behalf — switch the option above."}
              </p>

              {/* Honeypot - visually hidden, ignored by real visitors */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="h1-company-fax">Leave this field empty</label>
                <input
                  id="h1-company-fax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {errors.form && (
                <p
                  role="alert"
                  className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {errors.form}
                </p>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  id="fullName"
                  label={isParent ? "Your Full Name (Parent/Guardian)" : "Your Full Name"}
                  required
                  error={errors.fullName}
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  required
                  error={errors.email}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  required
                  error={errors.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(240) 000-0000"
                  autoComplete="tel"
                />
                <Field
                  id="athleteName"
                  label="Athlete's Name"
                  required={isParent}
                  error={errors.athleteName}
                  value={formData.athleteName}
                  onChange={handleChange}
                  placeholder={isParent ? "Your athlete's name" : "Leave blank if it's you"}
                />
                <Field
                  id="athleteAge"
                  label="Athlete's Age or Grade"
                  error={errors.athleteAge}
                  value={formData.athleteAge}
                  onChange={handleChange}
                  placeholder="e.g. 16, or 10th grade"
                />
                <Field
                  id="sport"
                  label="Sport"
                  required
                  error={errors.sport}
                  value={formData.sport}
                  onChange={handleChange}
                  placeholder="e.g. Baseball, track, powerlifting"
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Select
                  id="packageInterest"
                  label="Which Package?"
                  required
                  error={errors.packageInterest}
                  value={formData.packageInterest}
                  onChange={handleChange}
                  options={packageOptions}
                />
                <Select
                  id="equipment"
                  label="What Do You Train With?"
                  error={errors.equipment}
                  value={formData.equipment}
                  onChange={handleChange}
                  options={equipmentOptions}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="goals" className={labelClass}>
                  {isParent
                    ? "What Is Your Athlete Trying to Improve?"
                    : "What Are You Trying to Improve?"}{" "}
                  <span style={{ color: H1_PALETTE.gold }} aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={4}
                  value={formData.goals}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.goals ? "true" : undefined}
                  aria-describedby={errors.goals ? "goals-error" : undefined}
                  placeholder="Getting faster, adding size, jumping higher, staying healthy through the season — whatever matters most right now"
                  className={`${fieldClass} resize-none ${
                    errors.goals ? "border-red-500/60" : "border-neutral-700"
                  }`}
                  style={{ backgroundColor: H1_PALETTE.steel }}
                />
                {errors.goals && (
                  <p id="goals-error" role="alert" className="mt-2 text-sm text-red-400">
                    {errors.goals}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h1-tap h1-btn-gold group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send My Consultation Request"}
                {!isSubmitting && (
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                )}
              </button>

              <p
                className="mt-4 text-center text-sm"
                style={{ color: H1_PALETTE.muted }}
              >
                Free and no obligation. Spots are limited.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <>
            {" "}
            <span style={{ color: H1_PALETTE.gold }} aria-hidden="true">
              *
            </span>
          </>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${fieldClass} ${error ? "border-red-500/60" : "border-neutral-700"}`}
        style={{ backgroundColor: H1_PALETTE.steel }}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectProps {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  required?: boolean;
  error?: string;
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
  required,
  error,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <>
            {" "}
            <span style={{ color: H1_PALETTE.gold }} aria-hidden="true">
              *
            </span>
          </>
        )}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass} ${error ? "border-red-500/60" : "border-neutral-700"}`}
        style={{ backgroundColor: H1_PALETTE.steel }}
      >
        <option value="">Select an option...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
