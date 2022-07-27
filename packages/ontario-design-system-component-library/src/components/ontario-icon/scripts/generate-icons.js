/**
 * With `ontario-design-system-component-library` being your active directory, run the `npm run generate:icons` command in your terminal.
 *
 * This script is used to generate the individual icon component files (`ontario-icon-*.tsx`).
 * The components are generated by reading and parsing each icon's SVG file into a JSON object using `svgson`, a 3rd party module.
 * The parsed JSON object is then consumed to generate each icon component by using a pre-defined template.
 * This approach follows the DRY (don't repeat yourself) concept and reduces the maintenance effort for the icon components.
 */
const {readdir, readFile, writeFile} = require('fs/promises');
const path = require('path');
const { parse, stringify } = require('svgson');

const iconDirectory = './src/components/ontario-icon/assets';
const iconNamePrefix = 'ontario-icon-';
const iconsWithoutColour = [
	`${iconNamePrefix}alert-error`,
	`${iconNamePrefix}alert-information`,
	`${iconNamePrefix}alert-success`,
	`${iconNamePrefix}alert-warning`,
	`${iconNamePrefix}dropdown-arrow`,
	`${iconNamePrefix}interac-en`,
	`${iconNamePrefix}interac-fr`,
	`${iconNamePrefix}interac-en-alt`,
	`${iconNamePrefix}interac-fr-alt`,
	`${iconNamePrefix}mastercard`,
	`${iconNamePrefix}mastercard-alt`,
    `${iconNamePrefix}visa`,
];

/**
 * Transform name of icon to remove the `ontario-icon-` prefix
 * @param {*} iconName name of icon
 * @returns name of icon without the `ontario-icon-` prefix to be used as an id
 */
const getId = (iconName) => {
	return iconName.startsWith(iconNamePrefix) ? iconName.replace(iconNamePrefix, '') : iconName;
};

/**
 * Transform a string into Pascal case
 * @param {*} string a string to be operated on
 * @returns a string in Pascal case
 */
const toPascalCase = (string) => (' ' + string).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {return chr.toUpperCase()});

/**
 * Determine if the `colour` property and related variables and functions are being used
 * @param {*} iconName name of the icon in `ontario-icon-name` format
 * @returns a boolean to indicate whether the icon uses the `colour` property
 */
const useIconColour = (iconName) => {
    return !iconsWithoutColour.includes(iconName);
}

/**
 * Generate the icon component template
 * @param {*} svgObject svg content in JSON object notation
 * @param {*} iconName name of the icon
 * @returns template to be used to create the icon component (`.tsx`) files
 */
const getIconComponentTemplate = (svgObject, iconName) => {
	const svgElement = stringify(svgObject);
    const hasColour = useIconColour(iconName);
	return `// content automatically generated by \`generate-icons.js\` begins
import { Component, Prop, h, Watch, State${hasColour ? '' : `, Element`} } from '@stencil/core';
import { ${hasColour ? 'IconWithColour' : 'Icon'} } from './icon.interface';
import { IconSize${hasColour ? `, IconColour, IconColours ` : ``} } from './icon.types';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';${hasColour ? `
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';` : ''}

@Component({
    tag: '${iconName}',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class ${toPascalCase(iconName)} implements ${hasColour ? 'IconWithColour' : 'Icon'} {
  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth: IconSize = 24;

  /**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 */
  @State() iconWidthState: number;

  /**
   * Watch for changes in the \`iconWidth\` variable for validation purpose.
   * If the user input is not a number or is a negative number then \`iconWidth\` will be set to its default (24).
   */
  @Watch('iconWidth')
  validateWidth() {
  if (isNaN(this.iconWidth) || (!isNaN(this.iconWidth) && this.iconWidth <= 0)) {
    const message = new ConsoleMessageClass();
          message
              .addDesignSystemTag()
              .addMonospaceText(' icon-width ')
              .addRegularText('on')
              .addMonospaceText(' <${iconName}> ')
              .addRegularText(\`\${isNaN(this.iconWidth) ? 'was set to a non-numeric value' : 'was set to a negative number'}; only a positive number is allowed. The default size of\`)
              .addMonospaceText(' 24px ')
              .addRegularText('was assumed.')
              .printMessage();
    this.iconWidthState = 24;
  } else {
    this.iconWidthState = this.iconWidth;
  }
  }
  ${hasColour ? `
  /**
   * Set the icon's colour.
   */
  @Prop() colour: IconColour = 'black';

  /**
	 * Mutable variable, for internal use only.
	 * Set the icon's colour based on validation result.
	 */
  @State() iconColourState: string;

  /**
   * Watch for changes in the \`colour\` variable for validation purpose.
   * If the user input doesn't match one of the enum values then \`colour\` will be set to its default (\`black\`).
   * If a match is found in one of the enum values then \`colour\` will be set to the matching enum value.
   */
  @Watch('colour')
  validateColour() {
    const isValid = validateValueAgainstArray(this.colour, IconColours);
    if (isValid) {
      this.iconColourState = this.colour;
    } else {
      this.iconColourState = this.warnDefaultColour();
    }
  }

  /**
   * Print the invalid colour warning message
   * @returns default colour (black)
   */
  private warnDefaultColour(): IconColour{
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' colour ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-icon-accessibility> ')
			.addRegularText('was set to an invalid colour; only')
			.addMonospaceText(' black, blue, grey or white ')
			.addRegularText('are supported. The default colour')
			.addMonospaceText(' black ')
			.addRegularText('is assumed.')
			.printMessage();
		return 'black';
	}
    ` : `
    /**
     * Reference to the host element
     * Use to check if the host element has the \`colour\` attribute set
     */
    @Element() host: HTMLElement;

    /**
     * Validate that the \`colour\` attribute is not set by users
     * Prints a warning message if the \`colour\` attribute is set
     */
    validateColour() {
        if (this.host.hasAttribute('colour')) {
            const message = new ConsoleMessageClass();
            message
                .addDesignSystemTag()
                .addMonospaceText(' colour ')
                .addRegularText('on')
                .addMonospaceText(' <${iconName}> ')
                .addRegularText('cannot be set. The provided colour is ignored.')
                .printMessage();
        }
    }
    `}
	/**
	 * Stencil component lifecycle method that is called once after the component is first connected to the DOM.
	 */
    componentWillLoad() {
        this.validateColour();
        this.validateWidth();
    }

    /**
	 * Returns the HTML code to be rendered into a custom element.
	 */
    render() {
        return (
            <div class=${hasColour ? `{\`ontario-icon ontario-icon--\${this.iconColourState}\`}` : `'ontario-icon'`} style={{ 'width': \`\${this.iconWidthState}px\` }}>
                ${svgElement}
            </div>
        );
    }
};
// content automatically generated by \`generate-icons.js\` ends
`;
};

/**
 * Create an icon component for each icon presented in the `iconDirectory`
 */
const createIconComponents = async () => {
    const iconFiles = await readdir(iconDirectory);

    for (const iconFile of iconFiles) {

        // proceed with icon generation process if the file extension is `.svg` and the filename starts with the string `ontario-icon-`.
        if (iconFile.includes('.svg') && iconFile.startsWith(iconNamePrefix)) {

            // strip the path data and file extension from `iconFilename` and store the resulting value in `iconName`
            const iconName = path.basename(iconFile, '.svg');

            // the array.slice() function is used to remove the `./` from the `iconDirectory` variable
            // NodeJS's `readFile` resolves path relative to the current working directory and hence absolute path is used to ensure everyone can execute this script.
            // a environment variable `__dirname` is used to retrieve the absolute path to the folder containing this script.
            // because the icons are stored in the node_modules, the `../../../../` is required to traverse up to the node_modules folder for `path.join` to create an absolute path to the icons folder.
            const iconFilePath = path.join(__dirname, `../../../../${iconDirectory.slice(2)}/${iconFile}`);
            const iconFileContent = await readFile(iconFilePath, {encoding: 'utf-8'});
            const iconObject = await parse(iconFileContent, {
                transformNode: (node) => {
                    // transform `node` object to rename `viewbox` property to `viewBox` for HTML consumption.
                    if (node.attributes['viewbox'] && !node.attributes['viewBox']) {
                        const defaultDescriptor = {
                            value: '0 0 24 24',
                            writable: true,
                            enumerable: true,
                            configurable: true
                        };
                        Object.defineProperty(node.attributes, 'viewBox', Object.getOwnPropertyDescriptor(node.attributes, 'viewbox') ?? defaultDescriptor);
                        delete node.attributes['viewbox'];
                    };

                    // transform `node` object to add an `id` attribute to the parent `<svg>`.
                    node.attributes.id = getId(iconName);
                    return node;
                },
            });

            // generate the template
            const iconComponentTemplate = getIconComponentTemplate(iconObject, iconName);

            // create `ontario-icon-*.tsx` file
            await writeFile(`./src/components/ontario-icon/${iconName}.tsx`, iconComponentTemplate);
        }
    }
};

createIconComponents();
