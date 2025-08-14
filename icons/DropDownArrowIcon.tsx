import { FC } from "react"
import { IconsProps } from "./icons.interface"

export const DropDownArrowIcon: FC<IconsProps> = ({
    color = '#000',
    size = '24px',
  }) => {
    return (
      <svg
        id='DropDownArrowIcon'
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M6 9L12 15L18 9'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6 9L12 15L18 9'
          stroke={color}
          strokeOpacity='0.2'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  }