import {formatCurrency} from "../scripts/utils/money.js"

// naming test-suite
describe('test suit: formatCurrency', () => {
    // creation of test
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('works with rounding', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
        expect(formatCurrency(2000.4)).toEqual('20.00')
    });
});
