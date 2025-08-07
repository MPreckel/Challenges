import { Option } from "../selector.interface";
import { SCSelectorContainer, SCSelectorButton, SCSelectorOptions, SCSelectorOption } from "../selector.styles";
import { useRef, useState, useEffect } from "react";

interface SelectorMultipleProps {
  data: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const SelectorMultiple = ({ data, value = [], onChange }: SelectorMultipleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: Option) => {
    const newValue = value.includes(option.value as string)
      ? value.filter(v => v !== option.value)
      : [...value, option.value as string];
    onChange?.(newValue);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SCSelectorContainer ref={containerRef}>
      <SCSelectorButton isOpen={isOpen} onClick={handleToggle}>
        {value.length > 0 ? value.map(v => data.find(d => d.value === v)?.label).join(', ') : "Seleccionar"}
        <span>▼</span>
      </SCSelectorButton>
      <SCSelectorOptions isOpen={isOpen}>
        {data.map((option) => (
          <SCSelectorOption
            key={option.value}
            isSelected={value.includes(option.value as string)}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </SCSelectorOption>
        ))}
      </SCSelectorOptions>
    </SCSelectorContainer>
  );
};