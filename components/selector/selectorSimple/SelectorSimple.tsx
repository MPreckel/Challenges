import { DropDownArrowIcon } from "@/icons/DropDownArrowIcon";
import { SingleSelectorProps } from "../selector.interface";
import { SCSelectorContainer, SCSelectorButton, SCSelectorOptions, SCSelectorOption, SCArrowButton } from "../selector.styles";
import { SpinnerComponent } from "@/components/spinner/Spinner";
import { SCWrapperSpinner } from "@/components/spinner/spinner.styles";
import { labels, messages } from "@/messages/messages";
import { useSelectorSimple } from "./useSelectorSimple";



export const SelectorSimple = ({ 
  data, 
  isLoading, 
  onSelect, 
  hasMore 
}: SingleSelectorProps & { hasMore?: boolean }) => {
  
const { isOpen, selected, containerRef, handleToggle, handleSelect } = useSelectorSimple({ onSelect });
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
              {labels.loading}
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
          
          {isLoading && data.length && (
            <SCSelectorOption>
              <SCWrapperSpinner>
                <SpinnerComponent size="20px" />
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
    </SCSelectorContainer>
  );
};