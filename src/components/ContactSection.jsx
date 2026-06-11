import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";

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

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          title="Get In"
          highlight="Touch"
          subtitle="Open to full-time opportunities and collaborations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6 text-left">
            {[
              { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/rishi1111", href: "https://www.linkedin.com/in/rishi1111", external: true },
              { icon: Mail, label: "Email", value: "hrishitkumar.cs@gmail.com", href: "mailto:hrishitkumar.cs@gmail.com" },
              { icon: Phone, label: "Phone", value: "(914) 446-0465", href: "tel:+19144460465" },
              { icon: MapPin, label: "Location", value: "Stony Brook, NY", href: null },
            ].map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form className="surface-card p-6 space-y-4 text-left" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
              <input id="name" name="name" required className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
              <textarea id="message" name="message" required rows={4} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Hi Rishi..." />
            </div>
            <button type="submit" disabled={isSubmitting} className={cn("cosmic-button w-full")}>
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <Send size={15} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
