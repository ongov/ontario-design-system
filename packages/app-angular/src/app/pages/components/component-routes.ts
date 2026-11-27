import { Routes } from '@angular/router';

export const COMPONENT_ROUTES: Routes = [
	{
		path: 'language-sync',
		loadComponent: () => import('./language-sync/language-sync.component').then((m) => m.LanguageSyncPageComponent),
		title: 'language-sync | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-accordion',
		loadComponent: () =>
			import('./ontario-accordion/ontario-accordion.component').then((m) => m.OntarioAccordionPageComponent),
		title: 'ontario-accordion | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-aside',
		loadComponent: () => import('./ontario-aside/ontario-aside.component').then((m) => m.OntarioAsidePageComponent),
		title: 'ontario-aside | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-back-to-top',
		loadComponent: () =>
			import('./ontario-back-to-top/ontario-back-to-top.component').then((m) => m.OntarioBackToTopPageComponent),
		title: 'ontario-back-to-top | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-back-to-top/page-en',
		loadComponent: () =>
			import('./ontario-back-to-top/page-en/page-en.component').then((m) => m.OntarioBackToTopPageEnPageComponent),
		title: 'ontario-back-to-top page-en | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-back-to-top/page-fr',
		loadComponent: () =>
			import('./ontario-back-to-top/page-fr/page-fr.component').then((m) => m.OntarioBackToTopPageFrPageComponent),
		title: 'ontario-back-to-top page-fr | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-badge',
		loadComponent: () => import('./ontario-badge/ontario-badge.component').then((m) => m.OntarioBadgePageComponent),
		title: 'ontario-badge | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-blockquote',
		loadComponent: () =>
			import('./ontario-blockquote/ontario-blockquote.component').then((m) => m.OntarioBlockquotePageComponent),
		title: 'ontario-blockquote | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-button',
		loadComponent: () => import('./ontario-button/ontario-button.component').then((m) => m.OntarioButtonPageComponent),
		title: 'ontario-button | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-callout',
		loadComponent: () =>
			import('./ontario-callout/ontario-callout.component').then((m) => m.OntarioCalloutPageComponent),
		title: 'ontario-callout | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-card',
		loadComponent: () => import('./ontario-card/ontario-card.component').then((m) => m.OntarioCardPageComponent),
		title: 'ontario-card | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-card-collection',
		loadComponent: () =>
			import('./ontario-card-collection/ontario-card-collection.component').then(
				(m) => m.OntarioCardCollectionPageComponent,
			),
		title: 'ontario-card-collection | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-checkbox',
		loadComponent: () =>
			import('./ontario-checkbox/ontario-checkbox.component').then((m) => m.OntarioCheckboxPageComponent),
		title: 'ontario-checkbox | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-critical-alert',
		loadComponent: () =>
			import('./ontario-critical-alert/ontario-critical-alert.component').then(
				(m) => m.OntarioCriticalAlertPageComponent,
			),
		title: 'ontario-critical-alert | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-date-input',
		loadComponent: () =>
			import('./ontario-date-input/ontario-date-input.component').then((m) => m.OntarioDateInputPageComponent),
		title: 'ontario-date-input | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-dropdown-list',
		loadComponent: () =>
			import('./ontario-dropdown-list/ontario-dropdown-list.component').then((m) => m.OntarioDropdownListPageComponent),
		title: 'ontario-dropdown-list | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-fieldset',
		loadComponent: () =>
			import('./ontario-fieldset/ontario-fieldset.component').then((m) => m.OntarioFieldsetPageComponent),
		title: 'ontario-fieldset | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-footer',
		loadComponent: () => import('./ontario-footer/ontario-footer.component').then((m) => m.OntarioFooterPageComponent),
		title: 'ontario-footer | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-form-container',
		loadComponent: () =>
			import('./ontario-form-container/ontario-form-container.component').then(
				(m) => m.OntarioFormContainerPageComponent,
			),
		title: 'ontario-form-container | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-header',
		loadComponent: () => import('./ontario-header/ontario-header.component').then((m) => m.OntarioHeaderPageComponent),
		title: 'ontario-header | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-hint-expander',
		loadComponent: () =>
			import('./ontario-hint-expander/ontario-hint-expander.component').then((m) => m.OntarioHintExpanderPageComponent),
		title: 'ontario-hint-expander | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-hint-text',
		loadComponent: () =>
			import('./ontario-hint-text/ontario-hint-text.component').then((m) => m.OntarioHintTextPageComponent),
		title: 'ontario-hint-text | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-icon',
		loadComponent: () => import('./ontario-icon/ontario-icon.component').then((m) => m.OntarioIconPageComponent),
		title: 'ontario-icon | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-in-page-navigation',
		loadComponent: () =>
			import('./ontario-in-page-navigation/ontario-in-page-navigation.component').then(
				(m) => m.OntarioInPageNavigationPageComponent,
			),
		title: 'ontario-in-page-navigation | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-input',
		loadComponent: () => import('./ontario-input/ontario-input.component').then((m) => m.OntarioInputPageComponent),
		title: 'ontario-input | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-language-toggle',
		loadComponent: () =>
			import('./ontario-language-toggle/ontario-language-toggle.component').then(
				(m) => m.OntarioLanguageTogglePageComponent,
			),
		title: 'ontario-language-toggle | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-loading-indicator',
		loadComponent: () =>
			import('./ontario-loading-indicator/ontario-loading-indicator.component').then(
				(m) => m.OntarioLoadingIndicatorPageComponent,
			),
		title: 'ontario-loading-indicator | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-loading-indicator/full-screen',
		loadComponent: () =>
			import('./ontario-loading-indicator/full-screen/full-screen.component').then(
				(m) => m.OntarioLoadingIndicatorFullScreenPageComponent,
			),
		title: 'ontario-loading-indicator full-screen | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-page-alert',
		loadComponent: () =>
			import('./ontario-page-alert/ontario-page-alert.component').then((m) => m.OntarioPageAlertPageComponent),
		title: 'ontario-page-alert | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-radio-buttons',
		loadComponent: () =>
			import('./ontario-radio-buttons/ontario-radio-buttons.component').then((m) => m.OntarioRadioButtonsPageComponent),
		title: 'ontario-radio-buttons | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-search-box',
		loadComponent: () =>
			import('./ontario-search-box/ontario-search-box.component').then((m) => m.OntarioSearchBoxPageComponent),
		title: 'ontario-search-box | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-step-indicator',
		loadComponent: () =>
			import('./ontario-step-indicator/ontario-step-indicator.component').then(
				(m) => m.OntarioStepIndicatorPageComponent,
			),
		title: 'ontario-step-indicator | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-summary-list',
		loadComponent: () =>
			import('./ontario-summary-list/ontario-summary-list.component').then((m) => m.OntarioSummaryListPageComponent),
		title: 'ontario-summary-list | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-table',
		loadComponent: () => import('./ontario-table/ontario-table.component').then((m) => m.OntarioTablePageComponent),
		title: 'ontario-table | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-task',
		loadComponent: () => import('./ontario-task/ontario-task.component').then((m) => m.OntarioTaskPageComponent),
		title: 'ontario-task | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-task-list',
		loadComponent: () =>
			import('./ontario-task-list/ontario-task-list.component').then((m) => m.OntarioTaskListPageComponent),
		title: 'ontario-task-list | Ontario Design System Angular demo',
	},
	{
		path: 'ontario-textarea',
		loadComponent: () =>
			import('./ontario-textarea/ontario-textarea.component').then((m) => m.OntarioTextareaPageComponent),
		title: 'ontario-textarea | Ontario Design System Angular demo',
	},
];
