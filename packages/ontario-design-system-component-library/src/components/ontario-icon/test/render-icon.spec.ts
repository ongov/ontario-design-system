import { vi } from 'vitest';
import { warnIconDeprecated, warnIsDecorativeDeprecated } from '../render-icon';

vi.mock('@stencil/core', () => ({ Build: { isDev: false }, h: vi.fn() }));

describe('icon deprecation warnings', () => {
    afterEach(() => vi.restoreAllMocks());

    it('warns once when isDecorative is used, outside development builds too', () => {
        const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        warnIsDecorativeDeprecated();
        warnIsDecorativeDeprecated();

        expect(warning).toHaveBeenCalledOnce();
        expect(warning.mock.calls[0][0]).toContain('Ontario Design System');
        expect(warning.mock.calls[0][0]).toContain('isDecorative');
        expect(warning.mock.calls[0][0]).toContain('label');
    });

    it('warns once per deprecated icon tag and includes replacement guidance', () => {
        const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        warnIconDeprecated(
            'ontario-icon-search-white',
            'ontario-icon-search',
            'Set colour="white" to preserve the white icon.',
        );
        warnIconDeprecated(
            'ontario-icon-search-white',
            'ontario-icon-search',
            'Set colour="white" to preserve the white icon.',
        );
        warnIconDeprecated('ontario-icon-test-old', 'ontario-icon-test-new');
        warnIconDeprecated('ontario-icon-test-old', 'ontario-icon-test-new');

        expect(warning).toHaveBeenCalledTimes(2);
        expect(warning).toHaveBeenNthCalledWith(
            1,
            '<ontario-icon-search-white> is deprecated. Use <ontario-icon-search> instead. Set colour="white" to preserve the white icon.',
        );
        expect(warning).toHaveBeenNthCalledWith(
            2,
            '<ontario-icon-test-old> is deprecated. Use <ontario-icon-test-new> instead.',
        );
    });

    it('warns without a replacement when none is provided', () => {
        const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        warnIconDeprecated('ontario-icon-test-unreplaced');

        expect(warning).toHaveBeenCalledExactlyOnceWith('<ontario-icon-test-unreplaced> is deprecated.');
    });
});