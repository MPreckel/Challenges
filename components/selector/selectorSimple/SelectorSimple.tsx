import { DropDownArrowIcon } from "@/icons/DropDownArrowIcon";
import { Option, SingleSelectorProps } from "../selector.interface";
import { SCSelectorContainer, SCSelectorButton, SCSelectorOptions, SCSelectorOption, SCArrowButton } from "../selector.styles";
import { useRef, useState, useEffect } from "react";
import { SpinnerComponent } from "@/components/spinner/Spinner";
import { SCWrapperSpinner } from "@/components/spinner/spinner.styles";



export const SelectorSimple = ({ 
  data, 
  isLoading, 
  onSelect, 
  hasMore 
}: SingleSelectorProps & { hasMore?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number>('');
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
        {selected.toString().charAt(0).toUpperCase() + selected.toString().slice(1) || "Seleccionar"}
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
            </SCSelectorOption>
          ))}
          
          {true && data.length > 0 && (
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
    </SCSelectorContainer>
  );
};