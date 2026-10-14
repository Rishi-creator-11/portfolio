import { usePageMeta } from "@/hooks/use-page-meta";
import { ContactPanel } from "@/components/ContactPanel";

export default function Contact() {
  usePageMeta(
    "Contact — Rishi Kumar",
    "Get in touch with Rishi Kumar about software engineering and AI application roles: email, LinkedIn, GitHub, or the contact form."
  );
  return (
    <>
      <section className="on-dark bg-navy-900 pb-12 pt-28 text-white md:pb-16 md:pt-36">
        <div className="container">
          <h1 className="text-[clamp(2.25rem,4.3vw,3.6rem)] font-semibold leading-[1.04]">Let's talk.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            I'm looking for software engineering roles building AI applications and production software. Email is the fastest way to reach me; you can also use the form below.
          </p>
        </div>
      </section>
      <section aria-label="Contact details and form" className="bg-background py-16 md:py-24">
        <div className="container">
          <ContactPanel />
        </div>
      </section>
    </>
  );
}
