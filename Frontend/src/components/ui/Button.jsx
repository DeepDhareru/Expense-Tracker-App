export default function Button({
  children,
  onClick,
  className,
  type = "button",
}) {

  return (

    <button
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:scale-[1.02] transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}