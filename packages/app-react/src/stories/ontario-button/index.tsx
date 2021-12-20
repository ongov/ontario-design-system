import React from "react";
import { OntarioButton } from "ontario-design-system-component-library-react";

export default () => {
    return <div>
        <OntarioButtonPrimary />
        <OntarioButtonSecondary />
        <OntarioButtonTertiary />
    </div>
}

const OntarioButtonPrimary = () => <OntarioButton label="Click me." type="primary" />;

const OntarioButtonSecondary = () => <OntarioButton label="Click me." type="secondary" />;

const OntarioButtonTertiary = () => <OntarioButton label="Click me." type="tertiary" />;

