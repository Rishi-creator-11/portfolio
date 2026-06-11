import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "JavaScript", level: 90, category: "languages" },
  { name: "TypeScript", level: 90, category: "languages" },
  { name: "Python", level: 85, category: "languages" },
  { name: "Java", level: 85, category: "languages" },
  { name: "SQL", level: 80, category: "languages" },

  { name: "React", level: 90, category: "frameworks" },
  { name: "Next.js", level: 80, category: "frameworks" },
  { name: "Node.js", level: 88, category: "frameworks" },
  { name: "Express", level: 85, category: "frameworks" },
  { name: ".NET", level: 70, category: "frameworks" },

  { name: "AWS", level: 82, category: "devops" },
  { name: "Docker", level: 80, category: "devops" },
  { name: "Kubernetes", level: 70, category: "devops" },
  { name: "CI/CD", level: 85, category: "devops" },
  { name: "Git", level: 92, category: "devops" },

  { name: "PostgreSQL", level: 85, category: "databases" },
  { name: "MongoDB", level: 82, category: "databases" },
];

const categories = ["all", "languages", "frameworks", "devops", "databases"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-base">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left"
                  style={{ width: skill.level + "%" }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
