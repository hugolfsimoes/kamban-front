import { ColorType } from "./types";

const colorStyles: Record<ColorType, string> = {
    primary: 'bg-primary-100 fill-primary-100 text-white',
    secondary: 'bg-secondary-100 fill-secondary-100 text-white',
    danger: 'bg-red-400 fill-red-400 text-white',
    alert: 'bg-aviso-100 fill-aviso-100 text-white',
};

export { colorStyles };