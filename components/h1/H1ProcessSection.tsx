import { H1_PALETTE, h1ProcessSteps } from "@/data/h1";

export function H1ProcessSection() {
  return (
    <section
      className="border-y py-20 md:py-28"
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: H1_PALETTE.steel,
      }}
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="text-sm font-semibold tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            HOW IT WORKS
          </span>
          <h2 className="heading-lg mb-4 mt-3 text-white">
            From Request to First Block
          </h2>
          <p className="text-lg" style={{ color: H1_PALETTE.muted }}>
            Four steps, no facility to drive to, and no long-term contract to
            sign before you know it fits.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {h1ProcessSteps.map((step) => (
            <li
              key={step.id}
              className="h1-live rounded-xl border p-7"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: `${H1_PALETTE.chalk}05`,
              }}
            >
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  backgroundColor: `${H1_PALETTE.gold}1F`,
                  color: H1_PALETTE.gold,
                }}
                aria-hidden="true"
              >
                {step.step}
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
