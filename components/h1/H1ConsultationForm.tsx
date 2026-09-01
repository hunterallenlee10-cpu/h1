"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { H1_PALETTE, h1Packages } from "@/data/h1";

const packageOptions = [
  ...h1Packages.map((pkg) => pkg.name),
  "Not sure yet — help me pick",
];

const equipmentOptions = [
  "Full weight room / commercial gym",
  "Home or garage gym",
  "Limited equipment (dumbbells, bands)",
  "School weight room during season only",
  "Not sure yet",
];

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

const labelClass = "block text-sm font-semibold text-neutral-200 mb-2";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-2.5 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400/60";

export function H1ConsultationForm() {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        body: JSON.stringify({ ...formData, honeypot }),
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
    <section id="h1-consultation-form" className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            Get Started
          </p>
          <h2 className="heading-lg mb-4 text-white">
            Book Your Free Consultation
          </h2>
          <p className="text-lg" style={{ color: H1_PALETTE.muted }}>
            Tell us about the athlete and what you&apos;re training with. No
            payment, no commitment — we&apos;ll follow up to confirm the plan.
          </p>
        </div>

        {submitted ? (
          <div
            className="mx-auto max-w-2xl rounded-xl border p-10 text-center md:p-12"
            style={{
              borderColor: `${H1_PALETTE.gold}4D`,
              backgroundColor: `${H1_PALETTE.gold}0F`,
            }}
          >
            <CheckCircle2
              className="mx-auto mb-5 h-12 w-12"
              style={{ color: H1_PALETTE.gold }}
              aria-hidden="true"
            />
            <h3 className="mb-3 text-2xl font-bold text-white">
              Consultation Request Received
            </h3>
            <p className="mb-6" style={{ color: H1_PALETTE.muted }}>
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
            className="mx-auto max-w-3xl rounded-xl border p-6 backdrop-blur-sm md:p-10"
            style={{
              borderColor: H1_PALETTE.line,
              backgroundColor: `${H1_PALETTE.chalk}05`,
            }}
          >
            <p
              id="h1-form-description"
              className="mb-8 text-sm"
              style={{ color: H1_PALETTE.muted }}
            >
              Fields marked with an asterisk are required. Parents and guardians
              are welcome to submit on an athlete&apos;s behalf — enter your own
              contact details and the athlete&apos;s information below.
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
                label="Your Full Name"
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
                error={errors.athleteName}
                value={formData.athleteName}
                onChange={handleChange}
                placeholder="Leave blank if it's you"
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

            <div className="mt-5">
              <Select
                id="packageInterest"
                label="Which Package Are You Interested In?"
                required
                error={errors.packageInterest}
                value={formData.packageInterest}
                onChange={handleChange}
                options={packageOptions}
              />
            </div>

            <div className="mt-5">
              <Select
                id="equipment"
                label="What Equipment Do You Train With?"
                error={errors.equipment}
                value={formData.equipment}
                onChange={handleChange}
                options={equipmentOptions}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="goals" className={labelClass}>
                What Are You Trying to Improve?{" "}
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
              className="h1-tap group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: H1_PALETTE.gold, color: H1_PALETTE.ink }}
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
  options: string[];
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
