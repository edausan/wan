import "./animations.css";

const Slideup = ({ close = false, children }) => {
  return (
    <section id="slideUp" className={`slide-up-wrapper ${close ? "fade-out" : ""}`}>
      <article className={`bottom-0 slide-up ${close ? "slide-down" : ""}`}>{children}</article>
    </section>
  );
};

export default Slideup;
