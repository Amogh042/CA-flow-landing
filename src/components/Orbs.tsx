import ChartsBackground from "./ChartsBackground";

const Orbs = () => (
  <>
    <div className="orbs" aria-hidden="true">
      <div className="orb orb-purple" />
      <div className="orb orb-teal" />
    </div>
    <div className="grid-bg" aria-hidden="true" />
    <ChartsBackground />
  </>
);

export default Orbs;
