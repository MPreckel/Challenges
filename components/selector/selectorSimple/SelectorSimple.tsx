import { DropDownArrowIcon } from "@/icons/DropDownArrowIcon";
import { Option, SimpleSelectorProps } from "../selector.interface";
import { SCSelectorContainer, SCSelectorButton, SCSelectorOptions, SCSelectorOption, SCArrowButton } from "../selector.styles";
import { useRef, useState, useEffect } from "react";



export const SelectorSimple = ({ data, value, isLoading, onSelect }: SimpleSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number>('')
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
    setSelected(option.value as string);
    handleToggle();
    if (onSelect) {
      onSelect(option.value as string);
    }
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
        {selected || "Seleccionar"}
        <SCArrowButton $isCollapsed={isOpen}>
          <DropDownArrowIcon />
        </SCArrowButton>
      </SCSelectorButton>
      <SCSelectorOptions isOpen={isOpen}>
        {isLoading && (
          <SCSelectorOption>
            Cargando...
          </SCSelectorOption>
        )}
        {!isLoading && data.map((option) => (
          <SCSelectorOption
            key={option.value}
            isSelected={option.value === value}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </SCSelectorOption>
        ))}
      </SCSelectorOptions>
    </SCSelectorContainer>
  );
};