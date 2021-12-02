/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface OntarioButton {
        /**
          * Overrides the default value of the aria-label attribute.
         */
        "ariaLabel": string;
        /**
          * Sets the native HTML button type attribute.
         */
        "htmlType": 'button' | 'reset' | 'submit';
        /**
          * Sets text to display within the button. This will override the text provided through the Element Content.
         */
        "label": string;
        /**
          * Sets the type of button that the Ontario Design System uses.
         */
        "type": 'primary' | 'secondary' | 'tertiary';
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLOntarioButtonElement extends Components.OntarioButton, HTMLStencilElement {
    }
    var HTMLOntarioButtonElement: {
        prototype: HTMLOntarioButtonElement;
        new (): HTMLOntarioButtonElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "ontario-button": HTMLOntarioButtonElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface OntarioButton {
        /**
          * Overrides the default value of the aria-label attribute.
         */
        "ariaLabel"?: string;
        /**
          * Sets the native HTML button type attribute.
         */
        "htmlType"?: 'button' | 'reset' | 'submit';
        /**
          * Sets text to display within the button. This will override the text provided through the Element Content.
         */
        "label"?: string;
        /**
          * Sets the type of button that the Ontario Design System uses.
         */
        "type"?: 'primary' | 'secondary' | 'tertiary';
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "ontario-button": OntarioButton;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "ontario-button": LocalJSX.OntarioButton & JSXBase.HTMLAttributes<HTMLOntarioButtonElement>;
        }
    }
}
