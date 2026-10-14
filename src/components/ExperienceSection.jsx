import { Section } from "./SectionHeading";
import { Timeline } from "./Timeline";

/** Home-page experience: one interactive timeline. Select an entry for its measurable impact. */
export const ExperienceSection = () => (
  <Section id="experience" title="Experience" theme="dark">
    <Timeline />
  </Section>
);
