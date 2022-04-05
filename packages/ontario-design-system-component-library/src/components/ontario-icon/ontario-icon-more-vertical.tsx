// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch } from '@stencil/core';
    
@Component({
    tag: 'ontario-icon-more-vertical',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconMoreVertical {
    /**
     * The icon width will autogenerate the height since the icons are in square format, thus preserving
     * the aspect ratio.
     */
    @Prop() iconWidth: number = 24;
    
    /**
     * Set the icon's colour.
     * Note that some icon's colour cannot be changed.
     */
    @Prop() colour: "black" | "blue" | "grey" = "black";
    
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
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="more-vertical"><path d="M12 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2zm0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2zm0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
