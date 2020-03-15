const Loader = () => {
  return (
    <>
      <div className="loader" />
      <style jsx>{`
        .loader {
          border: 0.1em solid #f3f3f3;
          border-top: 0.1em solid #3498db;
          border-radius: 50%;
          width: 1em;
          height: 1em;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;
