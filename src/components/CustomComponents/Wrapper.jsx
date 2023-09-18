const Wrapper = ({ className = "", children }) => {
  return (
    <section id="Wrapper" className={`max-w-[680px] laptop:mx-auto ${className}`}>
      {children}
    </section>
  );
};

export default Wrapper;
