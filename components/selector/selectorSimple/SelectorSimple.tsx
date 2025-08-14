import { DropDownArrowIcon } from "@/icons/DropDownArrowIcon";
import { SingleSelectorProps } from "../selector.interface";
import { 
  SCSelectorContainer, 
  SCSelectorButton, 
  SCSelectorOptions, 
  SCSelectorOption, 
  SCArrowButton,
  SCSearchInput,
  SCSearchButton
} from "../selector.styles";
import { SpinnerComponent } from "@/components/spinner/Spinner";
import { SCWrapperSpinner } from "@/components/spinner/spinner.styles";
import { labels, messages } from "@/messages/messages";
import { useSelectorSimple } from "./useSelectorSimple";
import { SearchIcon } from "@/icons/SearchIcon";

export const SelectorSimple = ({ 
  data, 
  isLoading, 
  onSelect, 
  hasMore,
  onSearch,
}: SingleSelectorProps & { hasMore?: boolean }) => {
  
  const { 
    isOpen, 
    selected, 
    searchValue,
    inputRef,
    containerRef, 
    handleToggle, 
    handleSelect,
    handleSearchChange, 
  } = useSelectorSimple({ onSelect });

  return (
    <SCSelectorContainer ref={containerRef}>
      <SCSelectorButton 
        type="button" 
        isOpen={isOpen} 
        onClick={handleToggle}
        hasSelection={!!selected}
      >
        <SearchIcon />
          <SCSearchInput
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            onClick={(e) => e.stopPropagation()}
            placeholder="Buscar pokemon"
            autoComplete="off"
          />
        <SCArrowButton $isCollapsed={isOpen}>
          <DropDownArrowIcon />
        </SCArrowButton>
      </SCSelectorButton>
          <SCSearchButton onClick={() => onSearch(searchValue)}>Buscar</SCSearchButton>
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
          
          {isLoading && data.length > 0 && (
            <SCSelectorOption>
              <SCWrapperSpinner>
                <SpinnerComponent size="20px" />
              </SCWrapperSpinner>
            </SCSelectorOption>
          )}
          
          {hasMore && !isLoading && data.length > 0 && (
            <SCSelectorOption>
              {messages.scroll}
            </SCSelectorOption>
          )}
        </SCSelectorOptions>
      )}
    </SCSelectorContainer>
  );
};