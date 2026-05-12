import {
  createContext,
  useContext,
  useState,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({
  children,
}) => {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {

    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );
  };

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext);