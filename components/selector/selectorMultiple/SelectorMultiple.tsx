import { DropDownArrowIcon } from "@/icons/DropDownArrowIcon";
import { MultipleSelectorProps } from "../selector.interface";
import { SCSelectorContainer, SCSelectorButton, SCSelectorOptions, SCSelectorOption, SCArrowButton, SCChipsWrapper } from "../selector.styles";
import { FC } from "react";
import { SCWrapperSpinner } from "@/components/spinner/spinner.styles";
import { SpinnerComponent } from "@/components/spinner/Spinner";
import { Chip } from '@/components/chip/Chip';
import { messages } from "@/messages/messages";
import { useSelectMultiple } from "./useSelectorMultiple";



export const SelectorMultiple: FC<MultipleSelectorProps> = ({ 
  data, 
  isLoading, 
  onSelect, 
  hasMore,
  label,
}) => {
const { isOpen, selectedValues, containerRef, handleToggle, handleSelect, handleRemoveChip } = useSelectMultiple({ onSelect });

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
              {messages.scroll}
            </SCSelectorOption>
          )}
        </SCSelectorOptions>
      )}

      <SCChipsWrapper>
       {!!selectedValues.length && (
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