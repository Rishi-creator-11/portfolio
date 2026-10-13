import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Section } from "./SectionHeading";
import { links } from "@/data/content";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      toast({
        title: "Contact form not configured",
        description: "Add VITE_WEB3FORMS_ACCESS_KEY in Vercel environment variables.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
          subject: `Portfolio message from ${form.name.value}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Could not send message",
        description: error.message || "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = "w-full px-3 py-2 rounded-lg border border-input bg-card text-sm";
  const items = [
    { icon: Mail, label: "Email", value: links.email, href: `mailto:${links.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/rishi1111", href: links.linkedin, external: true },
    { icon: Github, label: "GitHub", value: "github.com/Rishi-creator-11", href: links.github, external: true },
    { icon: Phone, label: "Phone", value: links.phone, href: links.phoneHref },
    { icon: MapPin, label: "Location", value: "New York Metropolitan Area", href: null },
  ];

  return (
    <Section id="contact" title="Contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ul className="space-y-4">
          {items.map(({ icon: Icon, label, value, href, external }) => (
            <li key={label} className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">{label}</p>
                {href ? (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground underline underline-offset-2 hover:text-primary"
                  >
                    {value}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <form className="card space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
            <input id="name" name="name" autoComplete="name" required className={field} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required className={field} />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
            <textarea id="message" name="message" required rows={4} className={`${field} resize-none`} />
          </div>
          <button type="submit" disabled={isSubmitting} className={cn("btn btn-primary w-full")}>
            {isSubmitting ? "Sending..." : "Send message"}
            {!isSubmitting && <Send size={15} aria-hidden="true" />}
          </button>
        </form>
      </div>
    </Section>
  );
};
