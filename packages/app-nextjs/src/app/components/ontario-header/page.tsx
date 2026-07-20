import { Grid } from '../../grid';
import { OntarioHeader } from '@ongov/ontario-design-system-component-library-react';

const menuItems = [
	{ title: 'Item 1', href: '/item-1' },
	{ title: 'Item 2', href: '/item-2' },
	{ title: 'Item 3', href: '/item-3' },
];

const signInMenuItems = [
	{ title: 'Profile', href: '/profile' },
	{ title: 'Sign out', href: '/sign-out' },
];

export default function OntarioHeaderPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-header</h1>

				<h2>"type" Prop Variants</h2>

				<h3>Ontario header</h3>
				<OntarioHeader
					id="ontario-header-ontario"
					type="ontario"
					disableDynamicMenu={true}
					menuItems={JSON.stringify(menuItems)}
				></OntarioHeader>

				<h3>Ontario header with sign-in menu items</h3>
				<OntarioHeader
					id="ontario-header-ontario-signin"
					type="ontario"
					disableDynamicMenu={true}
					menuItems={JSON.stringify(menuItems)}
					signInMenuItems={JSON.stringify(signInMenuItems)}
				></OntarioHeader>

				<h3>Application header</h3>
				<OntarioHeader
					id="ontario-header-application"
					type="application"
					applicationHeaderInfo={JSON.stringify({ title: 'Application name', href: '/application-homepage' })}
					menuItems={JSON.stringify(menuItems)}
				></OntarioHeader>

				<h3>ServiceOntario header</h3>
				<OntarioHeader
					id="ontario-header-service-ontario"
					type="serviceOntario"
					applicationHeaderInfo={JSON.stringify({ title: 'ServiceOntario Service' })}
				></OntarioHeader>
			</Grid>
		</main>
	);
}
