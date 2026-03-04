/**
 * CardGlow — top glow line that appears on card hover.
 * Replaces the 5× duplicated glow div across cards and sections.
 */
const CardGlow = () => (
  <div
    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{
      background:
        "linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)",
    }}
  />
);

export default CardGlow;
