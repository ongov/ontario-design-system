import React from 'react';

import type { StyleReactProps } from '../interfaces.js';

export type StencilReactExternalProps<PropType, ElementType> = PropType &
  Omit<React.HTMLAttributes<ElementType>, 'style'> &
  StyleReactProps;

export type StencilReactForwardedRef<T> = React.ForwardedRef<T>;

// Set value to unknown to avoid circular dependency
export const setRef = (ref: StencilReactForwardedRef<any> | React.Ref<any> | undefined, refValue: unknown) => {
  if (typeof ref === 'function') {
    ref(refValue);
  } else if (ref != null) {
    // Cast as a MutableRef so we can assign current
    (ref as React.MutableRefObject<any>).current = refValue;
  }
};

export const mergeRefs = (
  ...refs: (StencilReactForwardedRef<any> | React.Ref<any> | undefined)[]
): React.RefCallback<any> => {
  return (value: any) => {
    refs.forEach((ref) => {
      setRef(ref, value);
    });
  };
};

export const createForwardRef = <PropType, ElementType>(ReactComponent: any, displayName: string) => {
  // This is a workaround for TypeScript not supporting forwardRef with generics
  // and with default props at the same time
  const forwardRef: React.ForwardRefRenderFunction<ElementType, React.PropsWithoutRef<StencilReactExternalProps<PropType, ElementType>>> = (
    props,
    ref
  ) => {
    return <ReactComponent {...props} forwardedRef={ref} />;
  };
  forwardRef.displayName = displayName;

  return React.forwardRef(forwardRef);
};

export const defineCustomElement = (tagName: string, customElement: any) => {
  if (customElement !== undefined && typeof customElements !== 'undefined' && !customElements.get(tagName)) {
    customElements.define(tagName, customElement);
  }
};

export * from './attachProps.js';
export * from './case.js';
