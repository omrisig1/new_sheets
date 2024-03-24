import { expect } from 'chai';
import sinon  from 'sinon';
import  S  from '../../src/modules/sheets/sheets.service'
import { Schema } from '../../src/types/types';
import {connect as connect_sqlDb } from "../../src/db/db.connection";
import {
    validateCellType,
    validateLookUp,
    validateSheetIndex,
    validateSheetSchema
} from "../../src/middleware/sheets.middle";
import {req_base_schema} from "../mocks/middleware";
import { Response, Request } from 'express';
import validationException from "../../src/exceptions/validation.exception";

describe('validateSheetSchema', () => {
    beforeEach(() => {
        sinon.restore();
    });
    afterEach(() => {
        sinon.restore();
    });
    context("when valid schema as input",  () => {
        let error: unknown = null;

        before(async () => {
            try {
                await connect_sqlDb();
                let request = req_base_schema();
                await validateSheetSchema(request as unknown as Request, {} as Response, ()=>{});
            } catch (err) {
                error = err;
            }
        });
        it(`should not throw error`, () => {
            expect(error).to.be.null;
        })
    });

    context("when missing column under schema",  () => {
        let error: unknown = null;

        before(async () => {
            try {
                await connect_sqlDb();
                let request = {body : {}};
                await validateSheetSchema(request as unknown as Request, {} as Response, ()=>{});
            } catch (err) {
                error = err;
            }
        });
        it(`should throw error as expected`, () => {
            expect(error).to.be.deep.equal(new validationException(
                400,
                `Field columns does not exist or not an array.`
            ));
        })
    });

});

describe('validateCellType', () => {
    beforeEach(() => {
        sinon.restore();
    });
    afterEach(() => {
        sinon.restore();
    });
    context("when cell type valid",  () => {
        let error: unknown = null;

        before(async () => {
            try {
                await connect_sqlDb();
                let schema = req_base_schema();
                const id = S.createSheet(schema.body as Schema);
                const request = {
                    params: {"id" : "1"},
                    body : {
                        "name":"A",
                        "number":"6",
                        "value": "bbb",
                    }
                }
                await validateCellType(request as unknown as Request, {} as Response, ()=>{});
            } catch (err) {
                error = err;
            }
        });
        it(`should not throw error`, () => {
            expect(error).to.be.null;
        })
    });

    context("when cell type not valid",  () => {
        let error: unknown = null;

        before(async () => {
            try {
                await connect_sqlDb();
                let schema = req_base_schema();
                const id = S.createSheet(schema.body as Schema);
                const request = {
                    params: {"id" : "1"},
                    body : {
                        "name":"A",
                        "number":"6",
                        "value": true,
                    }
                }
                await validateCellType(request as unknown as Request, {} as Response, ()=>{});
            } catch (err) {
                error = err;
            }
        });
        it(`should throw error as expected`, () => {
            expect(error).to.be.deep.equal(new validationException(
                400,
                `Field value true is not allowed in this column, should be of type :  string.`
            ))
        })
    });

});

describe('validateSheetIndex', () => {
    beforeEach(() => {
        sinon.restore();
    });
    afterEach(() => {
        sinon.restore();
    });
    context("when sheet by index exists",  () => {
        let error: unknown = null;

        before(async () => {
            try {
                await connect_sqlDb();
                let schema = req_base_schema();
                const id = S.createSheet(schema.body as Schema);
                const request = {
                    params : {id:"1"}
                }
                await validateSheetIndex(request as unknown as Request, {} as Response, ()=>{});
            } catch (err) {
                error = err;
            }
        });
        it(`should not throw error`, () => {
            expect(error).to.be.null;
        })
    });

    context("when sheet by index does not exists",  () => {
        let error: unknown = null;

        before(async () => {
            try {
                await connect_sqlDb();
                let schema = req_base_schema();
                const id = S.createSheet(schema.body as Schema);
                const request = {
                    params : {id:"2"}
                }
                await validateSheetIndex(request as unknown as Request, {} as Response, ()=>{});
            } catch (err) {
                error = err;
            }
        });
        it(`should throw error as expected`, () => {
            expect(error).to.be.deep.equal( new validationException(
                400,
                `Sheet 2 does not exists.`
            ))
        })
    });

});

describe('validateLookUp', () => {
    beforeEach(() => {
        sinon.restore();
    });
    afterEach(() => {
        sinon.restore();
    });
    context("when lookup is valid",  () => {
        let error: unknown = null;

        before(async () => {
            try {
                await connect_sqlDb();
                let schema = req_base_schema();
                const id = S.createSheet(schema.body as Schema);
                const request = {
                    params: {"id" : "1"},
                    body : {
                        "name":"A",
                        "number":6,
                        "value": "bbb",
                    }
                }
                const request2 = {
                    params: {"id" : "1"},
                    body : {
                        "name":"A",
                        "number":7,
                        "value": "lookup('A',6)",
                    }
                }
                const request3 = {
                    params: {"id" : "1"},
                    body : {
                        "name":"A",
                        "number":8,
                        "value": "lookup('A',7)",
                    }
                }
                S.setCell("1","A",request.body)
                S.setCell("1","A",request2.body)

                await validateLookUp(request3 as unknown as Request, {} as Response, ()=>{});
            } catch (err) {
                error = err;
            }
        });
        it(`should not throw error`, () => {
            expect(error).to.be.null;
        })
    });

    context("when lookup is not valid",  () => {
        let error: unknown = null;

        before(async () => {
            try {
                await connect_sqlDb();
                let schema = req_base_schema();
                const id = S.createSheet(schema.body as Schema);
                const request = {
                    params: {"id" : "1"},
                    body : {
                        "name":"A",
                        "number":6,
                        "value": "bbb",
                    }
                }
                const request2 = {
                    params: {"id" : "1"},
                    body : {
                        "name":"A",
                        "number":7,
                        "value": "lookup('A',6)",
                    }
                }
                const request3 = {
                    params: {"id" : "1"},
                    body : {
                        "name":"A",
                        "number":6,
                        "value": "lookup('A',7)",
                    }
                }
                S.setCell("1","A",request.body)
                S.setCell("1","A",request2.body)

                await validateLookUp(request3 as unknown as Request, {} as Response, ()=>{});
            } catch (err) {
                error = err;
            }
        });
        it(`should throw error`, () => {
            expect(error).to.be.deep.equal(new validationException(
                400,
                `Circular Reference found.`
            ));
        })
    });


});



