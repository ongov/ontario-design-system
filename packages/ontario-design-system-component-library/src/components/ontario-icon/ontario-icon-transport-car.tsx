// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch } from '@stencil/core';
import { Icon } from './icon.interface';
import { IconColour } from './ontario-icon.enum';

@Component({
    tag: 'ontario-icon-transport-car',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconTransportCar implements Icon {
    /**
     * The icon width will autogenerate the height since the icons are in square format, thus preserving
     * the aspect ratio.
     */
    @Prop() iconWidth: number = 24;
    
    /**
     * Set the icon's colour.
     * Note that some icon's colour cannot be changed.
     */
    @Prop() colour: IconColour = IconColour.black;
    
    /**
     * Watch for changes in the `iconWidth` variable for validation purpose
     */
    @Watch('iconWidth')
    validateWidth() {
        const defaultWidth = 24;

        // if value is not a number, set the iconWidth to be 24
        if (isNaN(this.iconWidth)) {
            this.iconWidth = defaultWidth;
        }
    }

    /**
	 * Stencil API that doesn't return anything. Implementation is optional.
	 */
    componentWillLoad() {
        this.validateWidth();
    }

    /**
	 * Returns the HTML code to be rendered into a custom element. Implementation is mandatory.
	 */
    render() {
        return (
            <div class={`ontario-icon ontario-icon--${this.colour}`} style={{ 'width': `${this.iconWidth}px` }}>
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="transport-car"><path d="M18.92 6c-.2-.6-.76-1-1.42-1h-11c-.66 0-1.2.42-1.42 1L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-6zM6.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 1 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 1 1 0 3zM5 11l1.5-4.5h11L19 11H5z"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
