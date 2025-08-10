import { StyledChip, ChipIcon, ChipDelete } from './chip.styles';
import { ChipProps } from './chip.interface';
import { FC } from 'react';



export const Chip: FC<ChipProps> = ({
  label,
  variant = 'filled',
  size = 'medium',
  color = 'primary',
  icon,
  onDelete,
  onClick,
  className,
  style,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <StyledChip
      $variant={variant}
      $size={size}
      $color={color}
      onClick={onClick}
      className={className}
      style={style}
      role="button"
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {icon && <ChipIcon>{icon}</ChipIcon>}
      {label}
      {onDelete && (
        <ChipDelete 
          onClick={handleDelete} 
          aria-label={`Remove ${label}`}
          type="button"
        >
          ×
        </ChipDelete>
      )}
    </StyledChip>
  );
};

export default Chip;