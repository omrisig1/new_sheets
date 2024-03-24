import { expect } from 'chai';
import sinon  from 'sinon';
import  S  from '../../src/modules/sheets/sheets.service'
import { Sheet, Schema } from '../../src/types/types';
import {expected_sheet, test_db, expected_new_sheet, input_schema, expected_sheet_after_set} from "../mocks/service";
import {connect as connect_sqlDb, getDB} from "../../src/db/db.connection";

describe('getSheetByID', () => {
    beforeEach(() => {
        sinon.restore();
    });
    afterEach(() => {
        sinon.restore();
    });
    context("when sheet exists",  () => {
        let result: Sheet;
        let error: unknown = null;
        let expected = expected_sheet();
        before(async () => {
            try {
                await connect_sqlDb();
                const database = getDB();
                let get_db_test = test_db();
                for (const dbTestKey in get_db_test) {
                    database[dbTestKey] = get_db_test["1"] as Sheet;
                }
                result = S.getSheetByID("1");
            } catch (err) {
                error = err;
            }
        });
        it("should return the sheet as expected", () => {
            expect(result).to.be.deep.equal(expected);
        });
        it(`should not throw error`, () => {
            expect(error).to.be.null;
        })
    });

});

describe('createSheet', () => {
    beforeEach(() => {
        sinon.restore();
    });
    afterEach(() => {
        sinon.restore();
    });
    context("when create sheet success",  () => {
        let result = "0";
        let new_sheet : Sheet;
        let error: unknown = null;
        let expected = expected_new_sheet();
        before(async () => {
            try {
                await connect_sqlDb();
                result = S.createSheet(input_schema as Schema);
                new_sheet = S.getSheetByID("1");
            } catch (err) {
                error = err;
            }
        });
        it("should return sheet id", () => {
            expect(result).to.be.deep.equal("1");
        });
        it("should return sheet as expected", () => {
            expect(new_sheet).to.be.deep.equal(expected);
        });
        it(`should not throw error`, () => {
            expect(error).to.be.null;
        })
    });

});

describe('setCell', () => {
    beforeEach(() => {
        sinon.restore();
    });
    afterEach(() => {
        sinon.restore();
    });
    context("when valid input for set cell",  () => {
        let result = "0";
        let new_sheet : Sheet;
        let error: unknown = null;
        let expected = expected_sheet_after_set();
        before(async () => {
            await connect_sqlDb();
            const database = getDB();
            let get_db_test = test_db();
            for (const dbTestKey in get_db_test) {
                database[dbTestKey] = get_db_test["1"] as Sheet;
            }
            S.setCell("1","A",{number :10, value : "aaa"})
            new_sheet = S.getSheetByID("1");
        });
        it("should return updated sheet as expected", () => {
            expect(new_sheet).to.be.deep.equal(expected);
        });
        it(`should not throw error`, () => {
            expect(error).to.be.null;
        })
    });

});