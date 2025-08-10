import { ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

export type ChipProps = {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  icon?: ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
};

 type ChipVariant = 'filled' | 'outlined';
 type ChipSize = 'small' | 'medium' | 'large';

 interface CustomTheme extends DefaultTheme {
  palette?: {
    [key: string]: {
      main: string;
      dark?: string;
      light?: string;
      contrastText?: string;
    };
  };
  typography?: {
    fontFamily?: string;
  };
}

export type StyledChipProps = {
  $variant?: ChipVariant;
  $size?: ChipSize;
  $color?: string;
  theme?: CustomTheme;
};