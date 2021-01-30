import { Colour } from "./Colour.model";
import { ThemeType } from "./Theme.model";
import { Theme } from './Theme.model';

export const THEMES: Record<ThemeType, Theme> = {
    light: {
        '--primary': Colour.VERY_DARK_GREY,
        '--secondary': Colour.GREY,
        '--background': Colour.EXTREME_LIGHT_GREY,
        '--blue': Colour.PURE_BLUE,
        '--red': Colour.SOFT_RED,
        '--white': Colour.WHITE,
        '--border': Colour.VERY_LIGHT_GREY,
        'borderRadius': '4px'
    }
};