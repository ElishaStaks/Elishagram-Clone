import { Colour } from './Colour.model';

export type ThemeType = 'light';

export interface Theme {
    '--primary': Colour;
    '--secondary': Colour;
    '--background': Colour;
    '--blue': Colour;
    '--red': Colour;
    '--white': Colour;
    '--border': Colour;
    'borderRadius': "4px";
}