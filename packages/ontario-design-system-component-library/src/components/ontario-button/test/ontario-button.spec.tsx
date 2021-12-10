import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { OntarioButton } from '../ontario-button';

/**
 * test that the component builds and does not return null or undefined as the result
 */
describe('ontario-button', () => {
	it('builds', async () => {
		expect(new OntarioButton()).toBeTruthy();
	});
});

/**
 * test possible variations of ontario-button without setting the label and ariaLabel properties
 */
describe('ontario-button without setting label and ariaLabel', () => {
	it('renders the default button', async () => {
		const page = await newSpecPage({
			components: [OntarioButton],
			html: `<ontario-button></ontario-button>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--secondary" type="button"></button>
        </mock:shadow-root>
      </ontario-button>
    `);
	});

	it('renders the primary button', async () => {
		const type = 'primary';
    const htmlType = 'button';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--primary" type="button"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});

  it('renders the primary submit button', async () => {
		const type = 'primary';
    const htmlType = 'submit';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--primary" type="submit"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});

  it('renders the primary reset button', async () => {
		const type = 'primary';
    const htmlType = 'reset';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--primary" type="reset"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});


  it('renders the secondary button', async () => {
		const type = 'secondary';
    const htmlType = 'button';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--secondary" type="button"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});

  it('renders the secondary submit button', async () => {
		const type = 'secondary';
    const htmlType = 'submit';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--secondary" type="submit"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});

  it('renders the secondary reset button', async () => {
		const type = 'secondary';
    const htmlType = 'reset';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--secondary" type="reset"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});

  it('renders the tertiary button', async () => {
		const type = 'tertiary';
    const htmlType = 'button';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--tertiary" type="button"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});

  it('renders the tertiary submit button', async () => {
		const type = 'tertiary';
    const htmlType = 'submit';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--tertiary" type="submit"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});

  it('renders the tertiary reset button', async () => {
		const type = 'tertiary';
    const htmlType = 'reset';
		const page = await newSpecPage({
			components: [OntarioButton],
			template: () => (<ontario-button type={type} htmlType={htmlType}></ontario-button>),
		});
		expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <button aria-label="" class="ontario-button ontario-button--tertiary" type="reset"></button>
        </mock:shadow-root>
      </ontario-button>    
    `);
	});
});

/**
 * test possible variations of ontario-button with only element content specified
 */
describe('ontario-button with element content specified', () => {
  it('renders the default button', async () => {
    const content = 'Next';
    const page = await newSpecPage({
      components: [OntarioButton],
      template: () => (<ontario-button>{content}</ontario-button>),
    });
    expect(page.root).toEqualHtml(`
    <ontario-button>
      <mock:shadow-root>
        <button aria-label="Next" class="ontario-button ontario-button--secondary" type="button">Next</button>
      </mock:shadow-root>
      Next
    </ontario-button>  
    `);
  });

  it('renders primary button', async () => {
    const type = 'primary';
    const htmlType = 'button';
    const content = 'Next';
    const page = await newSpecPage({
      components: [OntarioButton],
      template: () => (<ontario-button type={type} htmlType={htmlType}>{content}</ontario-button>),
    });
    expect(page.root).toEqualHtml(`
    <ontario-button>
      <mock:shadow-root>
        <button aria-label="Next" class="ontario-button ontario-button--primary" type="button">Next</button>
      </mock:shadow-root>
      Next
    </ontario-button> 
    `);
  });

  it('renders primary submit button', async () => {
    const type = 'primary';
    const htmlType = 'submit';
    const content = 'Submit';
    const page = await newSpecPage({
      components: [OntarioButton],
      template: () => (<ontario-button type={type} htmlType={htmlType}>{content}</ontario-button>),
    });
    expect(page.root).toEqualHtml(`
    <ontario-button>
      <mock:shadow-root>
        <button aria-label="Submit" class="ontario-button ontario-button--primary" type="submit">Submit</button>
      </mock:shadow-root>
      Submit
    </ontario-button> 
    `);
  });

  it('renders primary reset button', async () => {
    const type = 'primary';
    const htmlType = 'submit';
    const content = 'Reset';
    const page = await newSpecPage({
      components: [OntarioButton],
      template: () => (<ontario-button type={type} htmlType={htmlType}>{content}</ontario-button>),
    });
    expect(page.root).toEqualHtml(`
    <ontario-button>
      <mock:shadow-root>
        <button aria-label="Reset" class="ontario-button ontario-button--primary" type="submit">Reset</button>
      </mock:shadow-root>
      Reset
    </ontario-button> 
    `);
  });

  it('renders secondary button', async () => {
    const type = 'primary';
    const htmlType = 'submit';
    const content = 'Reset';
    const page = await newSpecPage({
      components: [OntarioButton],
      template: () => (<ontario-button type={type} htmlType={htmlType}>{content}</ontario-button>),
    });
    expect(page.root).toEqualHtml(`
    <ontario-button>
      <mock:shadow-root>
        <button aria-label="Reset" class="ontario-button ontario-button--primary" type="submit">Reset</button>
      </mock:shadow-root>
      Reset
    </ontario-button> 
    `);
  });
});
