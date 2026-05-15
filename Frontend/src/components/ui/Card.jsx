export default function Card({

  children,
  className = "",

}) {

  return (

    <div
      className={`w-full rounded-3xl p-4 md:p-6 shadow-md ${
        className
      }`}
    >

      {children}

    </div>
  );
}