import { DropDownArrowIcon } from "@/icons/DropDownArrowIcon";
import { SingleSelectorProps } from "../selector.interface";
import { SpinnerComponent } from "@/components/spinner/Spinner";
import { SCWrapperSpinner } from "@/components/spinner/spinner.styles";
import { labels, messages } from "@/messages/messages";
import { useSelectorSimple } from "./useSelectorSimple";
import { SearchIcon } from "@/icons/SearchIcon";
import {
  SCArrowButton,
  SCSearchButton,
  SCSearchInput,
  SCSearchWrapper,
  SCSelectorAndButtonWrapper,
  SCSelectorContainer,
  SCSelectorOption,
  SCSelectorOptions,
  SCSelectorWrapper,
} from "../selector.styles";

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
  } = useSelectorSimple({ onSelect, data });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      const value = searchValue.trim();
      if (value) onSearch?.(value);
    }
  };

  return (
    <SCSelectorContainer ref={containerRef}>
      <SCSelectorAndButtonWrapper>
        <SCSelectorWrapper
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
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            placeholder={String(selected) || "Buscar pokemon"}
          />
          <SCArrowButton $isCollapsed={isOpen}>
            <DropDownArrowIcon />
          </SCArrowButton>
        </SCSelectorWrapper>
        <SCSearchWrapper>
          <SCSearchButton onClick={() => onSearch?.(searchValue)}>
            Buscar
          </SCSearchButton>
        </SCSearchWrapper>
      </SCSelectorAndButtonWrapper>
      {isOpen && (
        <SCSelectorOptions>
          {isLoading && !data.length && (
            <SCSelectorOption>{labels.loading}</SCSelectorOption>
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
            <SCSelectorOption>{messages.scroll}</SCSelectorOption>
          )}
        </SCSelectorOptions>
      )}
    </SCSelectorContainer>
  );
};
