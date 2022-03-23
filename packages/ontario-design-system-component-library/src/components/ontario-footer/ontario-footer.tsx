import { Component, Prop, h, getAssetPath, State, Watch } from '@stencil/core';
import { defaultOptions, expandedTwoColumnOptions, expandedThreeColumnOptions } from './footer-option.interface';

@Component({
	tag: 'ontario-footer',
	styleUrl: 'ontario-footer.scss',
	shadow: true,
	assetsDirs: ['assets'],
})
export class OntarioFooter {
	@Prop() type: 'default' | 'partnership' | 'expanded' = 'default'; //make this determined

	@Prop() isExpandedTwoColumn: boolean = false; //make this determined

	@Prop() isExpandedThreeColumn: boolean = false; //make this determined


	@Prop() defaultOptions: defaultOptions | string = '';

	@Prop() expandedTwoColumnOptions?: expandedTwoColumnOptions | string = '';

	@Prop() expandedThreeColumnOptions?: expandedThreeColumnOptions | string = '';

	@Prop() partnershipConnection:
		| 'Licensed by Government of Ontario'
		| 'In partnership with Government of Ontario'
		| 'Funded by Government of Ontario'
		| 'Sponsored by Government of Ontario'
		| null = null;

	

	@State() private defaultState: defaultOptions;

	@State() private isDefault: boolean = true;

	@State() private expandedTwoColumnState: expandedTwoColumnOptions;

	@State() private expandedThreeColumnState: expandedThreeColumnOptions;

	private setStates() {
		if (!this.partnershipConnection && !this.expandedTwoColumnState && !this.expandedThreeColumnState){
			this.type = "default";
			this.isExpandedTwoColumn = false;
			this.isExpandedThreeColumn = false;
			console.log(1);
		} else if (this.partnershipConnection && !this.expandedTwoColumnState && !this.expandedThreeColumnState){
			this.type = "partnership";
			this.isExpandedTwoColumn = false;
			this.isExpandedThreeColumn = false;
			console.log(2);
		} else if (!this.partnershipConnection && this.expandedTwoColumnState && !this.expandedThreeColumnState){
			this.type = "expanded";
			this.isExpandedTwoColumn = true;
			this.isExpandedThreeColumn = false;
			console.log(3);
		} else if (!this.partnershipConnection && !this.expandedTwoColumnState && this.expandedThreeColumnState){
			this.type = "expanded";
			this.isExpandedTwoColumn = false;
			this.isExpandedThreeColumn = true;
			console.log(3);
		} else {
			this.type = "default";
			this.isExpandedTwoColumn = false;
			this.isExpandedThreeColumn = false;
			console.log(4);
		}
	}

	@Watch('defaultOptions')
	private parseDefaultOptions() {
		const defaultOptions = this.defaultOptions;
		if (defaultOptions) {
			if (typeof defaultOptions === 'string') this.defaultState = JSON.parse(defaultOptions);
			else this.defaultState = defaultOptions;
		} else {
			//throw 'Default Options Not Entered';
		}
	}

	@Watch('expandedTwoColumnOptions')
	private parseExpandedTwoColumnOptions() {
		const expandedTwoColumnOptions = this.expandedTwoColumnOptions;
		if (expandedTwoColumnOptions) {
			if (typeof expandedTwoColumnOptions === 'string') {
				this.expandedTwoColumnState = JSON.parse(expandedTwoColumnOptions);
				console.log(this.expandedTwoColumnState);
			} else this.expandedTwoColumnState = expandedTwoColumnOptions;
		} else {
			//throw 'Expanded Two Column Options Not Entered';
		}
	}

	@Watch('expandedThreeColumnOptions')
	private parseExpandedThreeColumnOptions() {
		const expandedThreeColumnOptions = this.expandedThreeColumnOptions;
		if (expandedThreeColumnOptions) {
			if (typeof expandedThreeColumnOptions === 'string') {
				this.expandedThreeColumnState = JSON.parse(expandedThreeColumnOptions);
				console.log(this.expandedThreeColumnState);
			} else this.expandedThreeColumnState = expandedThreeColumnOptions;
		} else {
			//throw 'Expanded Three Column Options Not Entered';
		}
	}

	componentWillLoad() {
		this.parseDefaultOptions();
		this.parseExpandedTwoColumnOptions();
		this.parseExpandedThreeColumnOptions();
		this.setStates();
	}

	private getBackgroundImagePath() {
		const backgroundImage = (this.type == "expanded") ? 'footer-expanded-supergraphic-logo.svg' : 'footer-default-supergraphic-logo.svg';
		return { '--imagePath': `url(${getAssetPath(`./assets/${backgroundImage}`)})` };
	}

	render() {
		return (
			<footer class={'ontario-footer ontario-footer--' + this.type} style={this.getBackgroundImagePath()}>
				{(this.type == "expanded") && (
					<div class="ontario-footer__expanded-top-section" style={this.getBackgroundImagePath()}>
						<div class="ontario-row">
							<div
								class={
									'ontario-columns ontario-small-12 ' +
									(this.isExpandedTwoColumn ? 'ontario-medium-6' : '') +
									(this.isExpandedThreeColumn ? 'ontario-expanded-footer__one-third-block ontario-medium-12 ontario-large-4' : '')
								}
							>
								{this.isExpandedTwoColumn && (
									<div>
										<h2 class="ontario-h4">{this.expandedTwoColumnState.firstColumn.title}</h2>
										<p>
											<div innerHTML={this.expandedTwoColumnState.firstColumn.content} />
										</p>
									</div>
								)}
								{this.isExpandedThreeColumn && (
									<div>
										<h2 class="ontario-h4">{this.expandedThreeColumnState.firstColumn.title}</h2>
										<p>
											<div innerHTML={this.expandedThreeColumnState.firstColumn.content} />
										</p>
									</div>
								)}
							</div>
							{this.isExpandedThreeColumn && (
								<div class="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block">
									<h2 class="ontario-h4">Most visited topics</h2>
									<ul class="ontario-footer__links-container ontario-footer__links-container--two-column-list">
										{this.expandedThreeColumnState.secondColumn.content.map(item => (
											<li>
												<a class="ontario-footer__link" href={item.link}>
													{item.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							)}
							<div
								class={
									'ontario-columns ontario-small-12' +
									(this.isExpandedTwoColumn ? ' ontario-medium-6' : '') +
									(this.isExpandedThreeColumn ? ' ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block' : '')
								}
							>
								{this.isExpandedTwoColumn && (
									<div>
										<h2 class="ontario-h4">{this.expandedTwoColumnState.secondColumn.title}</h2>
										<p>
											<div innerHTML={this.expandedTwoColumnState.secondColumn.content} />
										</p>
										<a class="ontario-footer__button ontario-button ontario-margin-bottom-0-!" href={this.defaultState.contactLink}>
											{this.expandedTwoColumnState.secondColumn.contactButtonText}
										</a>
									</div>
								)}
								{this.isExpandedThreeColumn && (
									<div>
										<h2 class="ontario-h4">{this.expandedThreeColumnState.thirdColumn.title}</h2>
										<p>
											<div innerHTML={this.expandedThreeColumnState.thirdColumn.content} />
										</p>
										<ul class="ontario-footer__links-container ontario-footer__links-container--social">
											{this.expandedThreeColumnState.thirdColumn.facebook && (
												<li>
													<a class="ontario-footer__link" href={this.expandedThreeColumnState.thirdColumn.facebook?.link} aria-label="Facebook">
														<ontario-icon-facebook colour="white" />
													</a>
												</li>
											)}
											{this.expandedThreeColumnState.thirdColumn.twitter && (
												<li>
													<a class="ontario-footer__link" href={this.expandedThreeColumnState.thirdColumn.twitter?.link} aria-label="Twitter">
														<ontario-icon-twitter colour="white" />
													</a>
												</li>
											)}
											{this.expandedThreeColumnState.thirdColumn.instagram && (
												<li>
													<a class="ontario-footer__link" href={this.expandedThreeColumnState.thirdColumn.instagram?.link} aria-label="Instagram">
														<ontario-icon-instagram colour="white" />
													</a>
												</li>
											)}

											{this.expandedThreeColumnState.thirdColumn.youtube && (
												<li>
													<a class="ontario-footer__link" href={this.expandedThreeColumnState.thirdColumn.youtube?.link} aria-label="Youtube">
														<ontario-icon-youtube colour="white" />
													</a>
												</li>
											)}
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				<div class={'ontario-row ' + ((this.type == "expanded") ? 'ontario-footer__expanded-bottom-section' : '')}>
					{this.isDefault && (
						<div class={'ontario-columns ontario-small-12 ' + ((this.type == "partnership") ? 'ontario-medium-7' : '')}>
							<ul class="ontario-footer__links-container ontario-footer__links-container--inline">
								<li>
									<a class="ontario-footer__link" href={this.defaultState.accessibilityLink}>
										Accessibility
									</a>
								</li>
								<li>
									<a class="ontario-footer__link" href={this.defaultState.privacyLink}>
										Privacy
									</a>
								</li>
								{!this.isExpandedTwoColumn && (
									<li>
										<a class="ontario-footer__link" href={this.defaultState.contactLink}>
											Contact us
										</a>
									</li>
								)}
							</ul>
							<div class="ontario-footer__copyright">
								<a class="ontario-footer__link" href={this.defaultState.queensPrinterLink}>
									&copy; Queen’s Printer for Ontario, <span class="ontario-nbsp">{'2012-' + String(new Date().getFullYear()).slice(-2)}</span>
								</a>
							</div>
						</div>
					)}
					{(this.type == "partnership") && (
						<div class="ontario-columns ontario-small-12 ontario-medium-5 ontario-footer__partnership-logo-container">
							<a href="https://www.ontario.ca/page/government-ontario" class="ontario-footer__ontario-logo">
								<img src={getAssetPath(`./assets/ontario-logo--partnership-footer.svg`)} alt="Government of Ontario" />
							</a>
							<p class="ontario-margin-bottom-0-!">
								{this.partnershipConnection}
							</p>
						</div>
					)}
				</div>
			</footer>
		);
	}
}
