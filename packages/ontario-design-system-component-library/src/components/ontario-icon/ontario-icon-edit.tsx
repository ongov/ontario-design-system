// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch } from '@stencil/core';
    
@Component({
    tag: 'ontario-icon-edit',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconEdit {
    /**
     * The icon width will autogenerate the height since the icons are in square format, thus preserving
     * the aspect ratio.
     */
    @Prop() iconWidth: number = 24;
    
    /**
     * Set the icon's colour.
     * Note that some icon's colour cannot be changed.
     */
    @Prop() colour: "black" | "blue" | "grey" | "white" = "black";
    
    @Watch('iconWidth')
    validateWidth() {
        const defaultWidth = 24;
            
        // If value is not a number, set the iconWidth to be 24
        if (isNaN(this.iconWidth)) {
            this.iconWidth = defaultWidth;
        }
    }

    componentWillLoad() {
        this.validateWidth();
    }

    render() {
        return (
            <div class={`ontario-icon ontario-icon--${this.colour}`} style={{ 'width': `${this.iconWidth}px` }}>
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="edit"><path d="M3 17.25V21h3.75L17.8 9.94 14.06 6.2 3 17.25zm17.7-10.2c.4-.4.4-1.02 0-1.4L18.37 3.3c-.4-.4-1.02-.4-1.4 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
