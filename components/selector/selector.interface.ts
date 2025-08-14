export interface Option<T extends HTMLElement = HTMLDivElement> {
  value: string | number;
  label: string;
  id?: number;
  ref?: React.RefObject<T> | null;
}

export interface BaseSelectorProps {
  data: Option[];
  isLoading?: boolean;
  hasMore?: boolean;
  label?: string;
}

export interface SingleSelectorProps extends BaseSelectorProps {
  type: 'simple';
  value?: string;
  onSelect?: (value: string[]) => void;
}

export interface MultipleSelectorProps extends BaseSelectorProps {
  type: 'multiple';
  value?: string[];
  onSelect?: (value: string[]) => void;
}

export type SelectorProps = SingleSelectorProps | MultipleSelectorProps;
