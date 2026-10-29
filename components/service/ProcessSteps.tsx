export function ProcessSteps({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; text: string }[];
}) {
  return (
    <section className="mt-14" aria-labelledby="process-heading">
      <h2 id="process-heading" className="font-serif text-h2">
        {title}
      </h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step.title} className="border border-line bg-card p-4">
            <p className="text-sm text-mute">0{index + 1}</p>
            <h3 className="mt-2 font-serif text-h3">{step.title}</h3>
            <p className="mt-2 text-sm leading-6">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
