import { vi } from 'vitest';
import { warnIsDecorativeDeprecated } from '../render-icon';

vi.mock('@stencil/core', () => ({ Build: { isDev: false }, h: vi.fn() }));

describe('icon deprecation warning', () => {
	it('warns once across calls even outside development builds', () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		try {
			warnIsDecorativeDeprecated();
			warnIsDecorativeDeprecated();

			expect(warning).toHaveBeenCalledOnce();
			expect(warning.mock.calls[0][0]).toContain('Ontario Design System');
			expect(warning.mock.calls[0][0]).toContain('isDecorative');
			expect(warning.mock.calls[0][0]).toContain('label');
		} finally {
			warning.mockRestore();
		}
	});
});
