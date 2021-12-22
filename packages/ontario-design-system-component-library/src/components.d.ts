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
          * Overrides the default value of the `aria-label` HTML attribute.
         */
        "ariaLabel"?: string | null;
        /**
          * The unique identifier of the button
         */
        "buttonId"?: string | undefined;
        /**
          * The native HTML button type the button should use.
         */
        "htmlType"?: 'button' | 'reset' | 'submit';
        /**
          * Text to be displayed within the button. This will override the text provided through the Element Content.
          * @example <ontario-button label="Label Text">Text</ontario-button>  The resulting button will have the label `"Label Text"`.
         */
        "label"?: string | null;
        /**
          * The type of button to render.
         */
        "type": 'primary' | 'secondary' | 'tertiary';
    }
    interface OntarioInput {
        /**
          * The aria-desribedBy value if the input has hint text associated with it.
         */
        "describedBy"?: string;
        /**
          * The unique identifier of the input. If no ID is passed, one will be autogenerated.
         */
        "inputId"?: string;
        /**
          * The width of the input field. If no value is assigned, it will present as the default input width.
         */
        "inputWidth"?: '2-char-width' | '3-char-width' | '4-char-width' | '5-char-width' | '7-char-width' | '10-char-width' | '20-char-width' | 'default';
        /**
          * The name assigned to the input.The name value is used to reference form data after a form is submitted.
         */
        "name": string;
        /**
          * Used to define whether the input field is required or not. If required, the value passed should be 'required'.
         */
        "required"?: boolean;
        /**
          * The input type value.
         */
        "type"?: 'text' | 'tel' | 'email' | 'password';
        /**
          * The input content value.
         */
        "value"?: string | null | undefined;
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
    interface HTMLOntarioInputElement extends Components.OntarioInput, HTMLStencilElement {
    }
    var HTMLOntarioInputElement: {
        prototype: HTMLOntarioInputElement;
        new (): HTMLOntarioInputElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "ontario-button": HTMLOntarioButtonElement;
        "ontario-input": HTMLOntarioInputElement;
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
          * Overrides the default value of the `aria-label` HTML attribute.
         */
        "ariaLabel"?: string | null;
        /**
          * The unique identifier of the button
         */
        "buttonId"?: string | undefined;
        /**
          * The native HTML button type the button should use.
         */
        "htmlType"?: 'button' | 'reset' | 'submit';
        /**
          * Text to be displayed within the button. This will override the text provided through the Element Content.
          * @example <ontario-button label="Label Text">Text</ontario-button>  The resulting button will have the label `"Label Text"`.
         */
        "label"?: string | null;
        /**
          * The type of button to render.
         */
        "type"?: 'primary' | 'secondary' | 'tertiary';
    }
    interface OntarioInput {
        /**
          * The aria-desribedBy value if the input has hint text associated with it.
         */
        "describedBy"?: string;
        /**
          * The unique identifier of the input. If no ID is passed, one will be autogenerated.
         */
        "inputId"?: string;
        /**
          * The width of the input field. If no value is assigned, it will present as the default input width.
         */
        "inputWidth"?: '2-char-width' | '3-char-width' | '4-char-width' | '5-char-width' | '7-char-width' | '10-char-width' | '20-char-width' | 'default';
        /**
          * The name assigned to the input.The name value is used to reference form data after a form is submitted.
         */
        "name"?: string;
        /**
          * Emitted when the input loses focus.
         */
        "onBlurEvent"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted when a keyboard input occurred.
         */
        "onChangeEvent"?: (event: CustomEvent<KeyboardEvent>) => void;
        /**
          * Used to define whether the input field is required or not. If required, the value passed should be 'required'.
         */
        "required"?: boolean;
        /**
          * The input type value.
         */
        "type"?: 'text' | 'tel' | 'email' | 'password';
        /**
          * The input content value.
         */
        "value"?: string | null | undefined;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "ontario-button": OntarioButton;
        "ontario-input": OntarioInput;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "ontario-button": LocalJSX.OntarioButton & JSXBase.HTMLAttributes<HTMLOntarioButtonElement>;
            "ontario-input": LocalJSX.OntarioInput & JSXBase.HTMLAttributes<HTMLOntarioInputElement>;
        }
    }
}
