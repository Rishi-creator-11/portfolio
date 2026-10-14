import { Section } from "./SectionHeading";
import { Timeline } from "./Timeline";
import { RoleCards } from "./RoleCards";

/** Home-page experience: an interactive timeline for orientation, then every role in full. */
export const ExperienceSection = () => (
  <Section id="experience" title="Experience" theme="dark">
    <Timeline />
    <div className="mt-14">
      <RoleCards />
    </div>
  </Section>
);
