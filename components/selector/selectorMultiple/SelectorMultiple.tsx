import { DropDownArrowIcon } from "@/icons/DropDownArrowIcon";
import { MultipleSelectorProps } from "../selector.interface";
import { SCSelectorContainer, SCSelectorOptions, SCSelectorOption, SCArrowButton, SCChipsWrapper, SCSelectorWrapper, SCSelectorAndButtonWrapper, SCSearchInput, SCSearchWrapper, SCSearchButton } from "../selector.styles";
import { FC } from "react";
import { SCWrapperSpinner } from "@/components/spinner/spinner.styles";
import { SpinnerComponent } from "@/components/spinner/Spinner";
import { Chip } from '@/components/chip/Chip';
import { labels, messages } from "@/messages/messages";
import { useSelectMultiple } from "./useSelectorMultiple";
import { SearchIcon } from "@/icons/SearchIcon";



export const SelectorMultiple: FC<MultipleSelectorProps> = ({ 
  data, 
  isLoading, 
  onSelect, 
  hasMore,
  label,
  onSearch,
}) => {
const { isOpen, selectedValues, containerRef, handleToggle, handleSelect, inputRef, searchValue, handleSearchChange } = useSelectMultiple({ onSelect });
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
             $isOpen={isOpen}
             onClick={handleToggle}
           >
             <SearchIcon />
             <SCSearchInput
               ref={inputRef}
               type="text"
               value={searchValue}
               onChange={handleSearchChange}
               onKeyDown={handleKeyDown}
               onClick={(e) => e.stopPropagation()}
               placeholder={String(selectedValues) || "Buscar pokemon"}
             />
             <SCArrowButton $isCollapsed={isOpen}>
               <DropDownArrowIcon />
             </SCArrowButton>
           </SCSelectorWrapper>
           <SCSearchWrapper>
             <SCSearchButton onClick={() => onSearch?.(searchValue)}>
                {labels.search}
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