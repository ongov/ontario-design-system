// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch } from '@stencil/core';
    
@Component({
    tag: 'ontario-icon-transport-walk',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconTransportWalk {
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
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="transport-walk"><path d="M13.326 5.407a1.96 1.96 0 0 0 1.954-1.953A1.96 1.96 0 0 0 13.326 1.5a1.96 1.96 0 0 0-1.953 1.953 1.96 1.96 0 0 0 1.954 1.953zm-3.614 3.32L6.977 22.5h2.05l1.758-7.814 2.05 1.954v5.86h1.954v-7.326l-2.05-1.953.586-2.93c1.27 1.465 3.026 2.442 5.174 2.442V10.78c-1.856 0-3.22-.977-4.002-2.344l-.977-1.563c-.39-.586-.977-.977-1.66-.977-.193 0-.56.005-.78.098L6 8.142v4.59h1.953v-3.32l1.758-.684z"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
