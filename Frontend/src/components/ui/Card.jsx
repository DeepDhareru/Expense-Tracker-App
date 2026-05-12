import { useTheme } from "../../context/ThemeContext";

export default function Card({
  children,
  className,
}) {

  const { darkMode } = useTheme();

  return (

    <div
      className={`rounded-3xl shadow-lg p-6 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      } ${className}`}
    >
      {children}
    </div>
  );
}