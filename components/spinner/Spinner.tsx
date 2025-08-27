import { FC } from 'react'
import { SCSpinner } from './spinner.styles'
import { TSpinnerComponentProps } from './spinner.interface'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors?: {
      primary?: string
    }
  }
}

export const SpinnerComponent: FC<Partial<TSpinnerComponentProps>> = ({
  size = '24px',
  color,
}) => {

  const spinnerColor = color || '#000000'
  return <SCSpinner $spinnerColor={spinnerColor} size={size} />
}
