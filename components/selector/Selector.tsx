"use client"

import { SelectorProps, SimpleSelectorProps, MultipleSelectorProps } from "./selector.interface";
import { SelectorMultiple } from "./selectorMultiple/SelectorMultiple";
import { SelectorSimple } from "./selectorSimple/SelectorSimple";

const selectByType = {
    simple: (props: SimpleSelectorProps) => {
      return <SelectorSimple {...props} />
    },
    multiple: (props: MultipleSelectorProps) => {
      return <SelectorMultiple {...props} />
    },
  }
  
export const Selector = ({ type = 'simple', ...rest }: SelectorProps) => {
    if (type === 'simple') {
      return selectByType.simple(rest as SimpleSelectorProps);
    }
    return selectByType.multiple(rest as MultipleSelectorProps);
  }