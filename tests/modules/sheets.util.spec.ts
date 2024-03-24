import { expect } from 'chai';
import sinon, { SinonSandbox }  from 'sinon';
import {getFunctionParameters, isLookUp} from '../../src/modules/sheets/sheets.util'
import {UTIL} from "../mocks/util";

describe('isLookUp', () => {
    let sandbox: SinonSandbox;

    beforeEach(() => {
        // Create a sandbox for stubs, spies, and mocks
        //sinon.restore();
        sandbox = sinon.createSandbox();

    });
    afterEach(() => {
        // Restore the sandbox to make sure all stubs are reset
        sandbox.restore();
    });
    context("when valid input for lookup", () => {
        let result = false;
        before(() => {
            // Arrange
            const input = UTIL.isLookUp.input.valid_look_up;
            // Act
            result = isLookUp(input);
        });
        it("should return true for lookup regex found", () => {
            expect(result).to.be.true;
        });
    });

    context("when valid input for look up function", () => {
        let result = false;
        before(() => {
            // Arrange
            const input = UTIL.isLookUp.input.valid_look_up_2;
            // Act
            result = isLookUp(input);
        });
        it("should return true for lookup regex found", () => {
            expect(result).to.be.true;
        });
    });

    context("when no look_up input", () => {
        let result = true;
        before(() => {
            // Arrange
            const input = UTIL.isLookUp.input.not_valid_look_up_withoutlookup;
            // Act
            result = isLookUp(input);
        });
        it("should return false for no lookup regex", () => {
            expect(result).to.be.false;
        });
    });

    context("when only one param as input for look up", () => {
        let result = true;
        before(() => {
            // Arrange
            const input = UTIL.isLookUp.input.not_valid_look_up_one_param;
            // Act
            result = isLookUp(input);
        });
        it("should return false for only one param", () => {
            expect(result).to.be.false;
        });
    });

    context("when first param not alphabetic", () => {
        let result = true;
        before(() => {
            // Arrange
            const input = UTIL.isLookUp.input.not_valid_look_up_first_param;
            // Act
            result = isLookUp(input);
        });
        it("should return false for first param not alphabetic", () => {
            expect(result).to.be.false;
        });
    });

    describe('getFunctionParameters', () => {
        beforeEach(() => {
            // Create a sandbox for stubs, spies, and mocks
            sinon.restore();
        });
        afterEach(() => {
            // Restore the sandbox to make sure all stubs are reset
            sinon.restore();
        });
        context("when valid lookupregex", () => {
            let result = false;
            const expected = UTIL.getFunctionParameters.input.valid_input.result;
            before(() => {
                // Arrange
                const input = UTIL.getFunctionParameters.input.valid_input.input;
                // Act
                result = getFunctionParameters(input);
            });
            it("should return parameters as expected", () => {
                expect(result).to.be.deep.equal(expected);
            });
        });
        context("when valid regex for lookup", () => {
            let result = false;
            const expected = UTIL.getFunctionParameters.input.valid_input_2.result;
            before(() => {
                // Arrange
                const input = UTIL.getFunctionParameters.input.valid_input_2.input;
                // Act
                result = getFunctionParameters(input);
            });
            it("should return parameters of lookup as expected", () => {
                expect(result).to.be.deep.equal(expected);
            });
        });
    });


});
