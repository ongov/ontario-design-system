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
    interface OntarioTextarea {
        /**
          * The aria-desribedBy value if the textarea has hint text associated with it
         */
        "describedBy"?: string;
        /**
          * The name value for the textarea
         */
        "name": string;
        /**
          * If `true`, the user must fill in a value before submitting a form.
         */
        "required": boolean;
        /**
          * The unique identifier of the textarea
         */
        "textareaId": string;
        /**
          * The value of the input.
         */
        "value"?: string | null;
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
    interface HTMLOntarioTextareaElement extends Components.OntarioTextarea, HTMLStencilElement {
    }
    var HTMLOntarioTextareaElement: {
        prototype: HTMLOntarioTextareaElement;
        new (): HTMLOntarioTextareaElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "ontario-button": HTMLOntarioButtonElement;
        "ontario-textarea": HTMLOntarioTextareaElement;
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
    interface OntarioTextarea {
        /**
          * The aria-desribedBy value if the textarea has hint text associated with it
         */
        "describedBy"?: string;
        /**
          * The name value for the textarea
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
          * If `true`, the user must fill in a value before submitting a form.
         */
        "required"?: boolean;
        /**
          * The unique identifier of the textarea
         */
        "textareaId"?: string;
        /**
          * The value of the input.
         */
        "value"?: string | null;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "ontario-button": OntarioButton;
        "ontario-textarea": OntarioTextarea;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "ontario-button": LocalJSX.OntarioButton & JSXBase.HTMLAttributes<HTMLOntarioButtonElement>;
            "ontario-textarea": LocalJSX.OntarioTextarea & JSXBase.HTMLAttributes<HTMLOntarioTextareaElement>;
        }
    }
}
