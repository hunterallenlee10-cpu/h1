import { H1_PALETTE, h1ProgramFeatures } from "@/data/h1";

export function H1ProgramSection() {
  return (
    <section
      id="h1-program"
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
            WHAT&apos;S INSIDE
          </span>
          <h2 className="heading-lg mb-4 mt-3 text-white">
            The Program, In Full
          </h2>
          <p className="text-lg" style={{ color: H1_PALETTE.muted }}>
            Every day is built for athletes who want a clear plan, accountability,
            and visible results. All of it personalized, all of it delivered
            remotely.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {h1ProgramFeatures.map((feature) => (
            <div
              key={feature.id}
              className="h1-live rounded-xl border p-7"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: `${H1_PALETTE.chalk}05`,
              }}
            >
              <div
                className="h1-accent mb-4 h-1 w-10 rounded-full"
                style={{ backgroundColor: H1_PALETTE.gold }}
              />
              <h3 className="mb-3 text-lg font-bold text-white">
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
