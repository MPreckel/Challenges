import { DropDownArrowIcon } from "@/icons/DropDownArrowIcon";
import { Option, MultipleSelectorProps } from "../selector.interface";
import { SCSelectorContainer, SCSelectorButton, SCSelectorOptions, SCSelectorOption, SCArrowButton, SCChipsWrapper } from "../selector.styles";
import { useRef, useState, useEffect, FC } from "react";
import { SCWrapperSpinner } from "@/components/spinner/spinner.styles";
import { SpinnerComponent } from "@/components/spinner/Spinner";
import { Chip } from '@/components/chip/Chip';



export const SelectorMultiple: FC<MultipleSelectorProps> = ({ 
  data, 
  isLoading, 
  onSelect, 
  hasMore,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
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
    const optionValue = option.value as string;
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
      
    setSelectedValues(newSelectedValues);
    
    if (onSelect) {
      onSelect(newSelectedValues);
    }
  };
  
  const handleRemoveChip = (valueToRemove: string) => {
    const newSelectedValues = selectedValues.filter(v => v !== valueToRemove);
    setSelectedValues(newSelectedValues);
    
    if (onSelect) {
      onSelect(newSelectedValues);
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
      <SCSelectorButton 
        isOpen={isOpen} 
        onClick={handleToggle}
      >
       {label}
        <SCArrowButton $isCollapsed={isOpen}>
          <DropDownArrowIcon />
        </SCArrowButton>
      </SCSelectorButton>
      {isOpen && (
        <SCSelectorOptions>
          {isLoading && !data.length && (
            <SCSelectorOption>
              Cargando...
            </SCSelectorOption>
          )}
          
          {data.map((option) => (
            <SCSelectorOption
              key={option.value}
              onClick={() => handleSelect(option)}
              ref={option.ref || null}
            >
              {option.label}
              {selectedValues.includes(option.value as string) && (
                <span style={{ position: 'absolute', right: '12px' }}>✓</span>
              )}
            </SCSelectorOption>
          ))}
          
          {isLoading && data.length && (
            <SCSelectorOption>
              <SCWrapperSpinner>
                <SpinnerComponent size="20px" color="" />
              </SCWrapperSpinner>
            </SCSelectorOption>
          )}
          
          {hasMore && !isLoading && data.length && (
            <SCSelectorOption>
              Desplázate para cargar más
            </SCSelectorOption>
          )}
        </SCSelectorOptions>
      )}
      <SCChipsWrapper>

       {selectedValues.length > 0 && (
         selectedValues.map(value => {
           const selectedOption = data.find(opt => opt.value === value);
           return (
             <Chip
             key={value}
             label={selectedOption?.label || value}
             onDelete={() => handleRemoveChip(value)}
             variant="outlined"
             size="small"
             />
            );
          })
        )}
      </SCChipsWrapper>
    </SCSelectorContainer>
  );
};