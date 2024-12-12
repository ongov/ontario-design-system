import React, { useEffect, useRef, useState, useCallback, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

import { OverlayEventDetail } from './interfaces.js';
import { StencilReactForwardedRef, attachProps, dashToPascalCase, defineCustomElement, setRef } from './utils/index.js';

interface OverlayElement extends HTMLElement {
  present: () => Promise<void>;
  dismiss: (data?: any, role?: string | undefined) => Promise<boolean>;
}

export interface ReactOverlayProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onDidDismiss?: (event: CustomEvent<OverlayEventDetail>) => void;
  onDidPresent?: (event: CustomEvent<OverlayEventDetail>) => void;
  onWillDismiss?: (event: CustomEvent<OverlayEventDetail>) => void;
  onWillPresent?: (event: CustomEvent<OverlayEventDetail>) => void;
  forwardedRef?: StencilReactForwardedRef<OverlayElement>;
}

export const createOverlayComponent = <OverlayComponent extends object, OverlayType extends OverlayElement>(
  tagName: string,
  controller: { create: (options: any) => Promise<OverlayType> },
  customElement?: any
) => {
  defineCustomElement(tagName, customElement);

  const displayName = dashToPascalCase(tagName);

  const didDismissEventName = `on${displayName}DidDismiss`;
  const didPresentEventName = `on${displayName}DidPresent`;
  const willDismissEventName = `on${displayName}WillDismiss`;
  const willPresentEventName = `on${displayName}WillPresent`;

  type Props = OverlayComponent & ReactOverlayProps;

  const Overlay = React.forwardRef<OverlayType, Props>((props, forwardedRef) => {
    const { isOpen, children, onDidDismiss, onDidPresent, onWillDismiss, onWillPresent, ...cProps } = props;
    const [overlay, setOverlay] = useState<OverlayType | undefined>(undefined);
    const elRef = useRef<HTMLDivElement>(document.createElement('div'));
    const isDismissing = useRef(false);

    // Attach overlay ref to parent ref
    useImperativeHandle(forwardedRef as StencilReactForwardedRef<OverlayType>, () => overlay as OverlayType, [overlay]);

    const handleDismiss = useCallback(
      (event: CustomEvent<OverlayEventDetail<any>>) => {
        if (onDidDismiss) {
          onDidDismiss(event);
        }
        setRef(forwardedRef, null);
      },
      [forwardedRef, onDidDismiss]
    );

    const present = useCallback(async () => {
      const overlayInstance = await controller.create({
        ...cProps,
        component: elRef.current,
        componentProps: {},
        ref: forwardedRef,
        [didDismissEventName]: handleDismiss,
        [didPresentEventName]: (e: CustomEvent) => onDidPresent && onDidPresent(e),
        [willDismissEventName]: (e: CustomEvent) => onWillDismiss && onWillDismiss(e),
        [willPresentEventName]: (e: CustomEvent) => onWillPresent && onWillPresent(e),
      });

      setOverlay(overlayInstance);
      setRef(forwardedRef, overlayInstance);
      attachProps(overlayInstance, props);
      await overlayInstance.present();
    }, [cProps, forwardedRef, handleDismiss, onDidPresent, onWillDismiss, onWillPresent, props]);

    const dismiss = useCallback(async () => {
      if (overlay) {
        isDismissing.current = true;
        await overlay.dismiss();
        isDismissing.current = false;
        setOverlay(undefined);
      }
    }, [overlay]);

    // Manage overlay lifecycle
    useEffect(() => {
      if (isOpen) {
        present();
      } else if (overlay) {
        dismiss();
      }

      return () => {
        overlay?.dismiss();
      };
    }, [dismiss, isOpen, overlay, present]);

    // Update overlay props when props change
    useEffect(() => {
      if (overlay) {
        attachProps(overlay, props);
      }
    }, [overlay, props]);

    // Render portal to maintain the component's presence in the DOM during dismiss animation
    return ReactDOM.createPortal(isOpen || isDismissing.current ? children : null, elRef.current);
  });

  Overlay.displayName = displayName;

  return Overlay;
};
