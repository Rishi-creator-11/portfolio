import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);

      const newStars = [];
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 2 + 0.5,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.4 + 0.15,
          animationDuration: Math.random() * 4 + 3,
        });
      }
      setStars(newStars);
    };

    const generateMeteors = () => {
      const count = 6;
      const newMeteors = [];
      for (let i = 0; i < count; i++) {
        newMeteors.push({
          id: i,
          size: Math.random() * 1.5 + 0.6,
          x: Math.random() * 100,
          y: Math.random() * 20,
          delay: Math.random() * 10,
          animationDuration: Math.random() * 2 + 5,
        });
      }
      setMeteors(newMeteors);
    };

    generateStars();
    generateMeteors();
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 site-glow" />

      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 40 + "px",
            height: meteor.size + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
            animationFillMode: "backwards",
          }}
        />
      ))}
    </div>
  );
};
