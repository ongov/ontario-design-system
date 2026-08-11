import {
    OntarioInPageNavigation,
    OntarioInPageNavigationItem,
} from '@ongov/ontario-design-system-component-library-react/next';
import { Grid } from '../../grid';

export default function OntarioInPageNavigationPage() {
    return (
        <main>
            <Grid>
                <div>
                    <h1>ontario-in-page-navigation</h1>

                    {/*
                    Stencil reference (original)

                    <ontario-in-page-navigation heading="On this page" heading-level="h3">
                        <ontario-in-page-navigation-item label="About the program" href="#about-program"></ontario-in-page-navigation-item>
                        <ontario-in-page-navigation-item label="Eligibility" href="#eligibility"></ontario-in-page-navigation-item>
                    </ontario-in-page-navigation>

                    <ontario-in-page-navigation heading="On this page" heading-level="h3" no-top-border>
                        <ontario-in-page-navigation-item label="Overview" href="#overview"></ontario-in-page-navigation-item>
                    </ontario-in-page-navigation>
                    */}

                    <div>
                        <h2 id="in-page-navigation">In-page navigation</h2>

                        <p>In-page navigation - default</p>

                        <OntarioInPageNavigation heading="On this page" headingLevel="h3">
                            <OntarioInPageNavigationItem label="About the program" href="#about-program"></OntarioInPageNavigationItem>
                            <OntarioInPageNavigationItem label="Eligibility" href="#eligibility"></OntarioInPageNavigationItem>
                            <OntarioInPageNavigationItem
                                label="Available funding"
                                href="#available-funding"
                            ></OntarioInPageNavigationItem>
                            <OntarioInPageNavigationItem label="Program guide" href="#program-guide"></OntarioInPageNavigationItem>
                            <OntarioInPageNavigationItem label="Contact us" href="#contact-us"></OntarioInPageNavigationItem>
                        </OntarioInPageNavigation>

                        <div className="ontario-margin-top-24-!">
                            <h3 id="about-program" className="ontario-h4">
                                About the program
                            </h3>
                            <p>Use in-page navigation to give people quick access to key sections in long content.</p>
                            <h3 id="eligibility" className="ontario-h4">
                                Eligibility
                            </h3>
                            <p>Make sure each navigation label matches the destination heading text as closely as possible.</p>
                            <h3 id="available-funding" className="ontario-h4">
                                Available funding
                            </h3>
                            <p>Use the component before the content it references so people can orient themselves early.</p>
                            <h3 id="program-guide" className="ontario-h4">
                                Program guide
                            </h3>
                            <p>Keep link text short and descriptive so people can scan the list quickly.</p>
                            <h3 id="contact-us" className="ontario-h4">
                                Contact us
                            </h3>
                            <p>Use meaningful destinations so the list behaves like a clear table of contents.</p>
                        </div>

                        <p>In-page navigation - no top border</p>

                        <OntarioInPageNavigation heading="On this page" headingLevel="h3" noTopBorder>
                            <OntarioInPageNavigationItem label="Overview" href="#overview"></OntarioInPageNavigationItem>
                            <OntarioInPageNavigationItem
                                label="The law (cancellations)"
                                href="#the-law"
                            ></OntarioInPageNavigationItem>
                            <OntarioInPageNavigationItem
                                label="What to include in your contract"
                                href="#contract-details"
                            ></OntarioInPageNavigationItem>
                            <OntarioInPageNavigationItem label="Before you buy" href="#before-you-buy"></OntarioInPageNavigationItem>
                        </OntarioInPageNavigation>

                        <div className="ontario-margin-top-24-!">
                            <h3 id="overview" className="ontario-h4">
                                Overview
                            </h3>
                            <p>This version removes the top border so it can sit within a smaller content section.</p>
                            <h3 id="the-law" className="ontario-h4">
                                The law (cancellations)
                            </h3>
                            <p>Use valid in-page anchors so the navigation can move people to the intended section.</p>
                            <h3 id="contract-details" className="ontario-h4">
                                What to include in your contract
                            </h3>
                            <p>Longer item labels should still remain readable and wrap naturally within the list.</p>
                            <h3 id="before-you-buy" className="ontario-h4">
                                Before you buy
                            </h3>
                            <p>Keep related sections grouped so the navigation reflects the structure of the page.</p>
                        </div>
                    </div>
                </div>
            </Grid>
        </main>
    );
}
