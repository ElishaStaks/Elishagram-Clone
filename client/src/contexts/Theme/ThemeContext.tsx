import React, { createContext, useState, useContext } from 'react';
import { THEMES } from './Theme.config';
import { Theme, ThemeType } from './Theme.model';

interface ThemeContextProps {
    themeType: ThemeType;
    theme: Theme;
    setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
    themeType: 'light',
    theme: THEMES['light'],
} as ThemeContextProps);

// provides the theme to the context provider
export const ThemeProvider: React.FC = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')

    return (
        <ThemeContext.Provider value={{ themeType: currentTheme, theme: THEMES[currentTheme], setCurrentTheme}}>
            { children }
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);