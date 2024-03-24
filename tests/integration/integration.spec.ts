import axios, { AxiosResponse } from 'axios';
import ExpressApp from '../../src/express.app';
import {expect} from "chai";

describe('Integration Tests', () => {
    let serverUrl: string;
    let err = null;
    before(async () => {
        // Start the server before running the tests
        ExpressApp.start().catch(console.log);
        serverUrl = `http://localhost:3030`;
    });
    context("when creating valid sheet", () => {
        let error: unknown = null;
        let response: AxiosResponse<any, any>;
        before(async () => {
            try {
                response = await axios.post(`${serverUrl}/api/sheets`, {
                    "columns" : [
                        {"name":"A", "type":"boolean"},
                        {"name": "B", "type" : "string"}
                    ]
                });
            } catch (error) {
                err = error;
            }
        });
        it(`should not throw error`, () => {
            expect(error).to.be.null;
        })
        it(`should return response with valid status`, () => {
            expect(response["data"]["status"]).to.be.equal(200);
        })
        it(`should return response with valid status`, () => {
            expect(response["data"]["data"]["sheet_id"]).to.be.equal("1");
        })
    });

    context("when creating sheet with invalid schema", () => {
        let error: unknown = null;
        let response: AxiosResponse<any, any>;
        before(async () => {
            try {
                response = await axios.post(`${serverUrl}/api/sheets`, {
                    "columns" : [
                        {"name":"A"},
                        {"name": "B", "type" : "string"}
                    ]
                });
            } catch (err) {
                error = err;
            }
        });
        it(`should throw error with expected message`, () => {
            // @ts-ignore
            expect(error["response"]["data"]["message"]).to.be.equal("Field {\"name\":\"A\"} is missing name or type keys.");
        })
        it(`should throw error with expected status`, () => {
            // @ts-ignore
            expect(error["response"]["data"]["status"]).to.be.equal(400);
        })
    });

    context("when getting none-existing sheet", () => {
        let error: unknown = null;
        let response: AxiosResponse<any, any>;
        before(async () => {
            try {
                response = await axios.get(`${serverUrl}/api/sheets/2`);
            } catch (err) {
                error = err;
            }
        });
        it(`should throw error`, () => {
            // @ts-ignore
            expect(error).to.not.be.null;
        })
        it(`should error status be as expected`, () => {
            // @ts-ignore
            expect(error["response"]["data"]["status"]).to.be.equal(400);
        })
        it(`should error message be as expected`, () => {
            // @ts-ignore
            expect(error["response"]["data"]["message"]).to.be.equal("Sheet 2 does not exists.");
        })
    });

    context("when getting existing sheet", () => {
        let error: unknown = null;
        let response: AxiosResponse<any, any>;
        let expected = {"data": {
                "schema": {
                    "columns": [
                        {
                            "name": "A",
                            "type": "boolean"
                        },
                        {
                            "name": "B",
                            "type": "string"
                        }
                    ]
                }
            },
            "message": "Sheet has been fetched successfully.",
            "status": 200}
        before(async () => {
            try {
                response = await axios.get(`${serverUrl}/api/sheets/1`);
            } catch (err) {
                error = err;
            }
        });
        it(`should not throw error`, () => {
            // @ts-ignore
            expect(error).to.be.null;
        })
        it(`should response be as expected`, () => {
            // @ts-ignore
            expect(response["data"]).to.be.deep.equal(expected);
        })
    });

    context("when setting valid Cell", () => {
        let error: unknown = null;
        let response: AxiosResponse<any, any>;
        let expected = {
            "status": 200,
            "message": "Cell Set Successfully",
            "data": {
                "schema": {
                    "columns": [
                        {
                            "name": "A",
                            "type": "boolean"
                        },
                        {
                            "name": "B",
                            "type": "string"
                        }
                    ]
                },
                "columns": [
                    {
                        "name": "A",
                        "cells": [
                            {
                                "number": "6",
                                "value": true,
                                "view_value": true
                            }
                        ]
                    }
                ]
            }
        }
        before(async () => {
            try {
                response = await axios.put(`${serverUrl}/api/sheets/1`, {
                    "name":"A",
                    "number":"6",
                    "value": true
                });            }
            catch (err) {
                error = err;
            }
        });
        it(`should not throw error`, () => {
            // @ts-ignore
            expect(error).to.be.null;
        })
        it(`should response be as expected`, () => {
            // @ts-ignore
            expect(response["data"]).to.be.deep.equal(expected);
        })
    });
    context("when setting wrong typed Cell", () => {
        let error: unknown = null;
        let response: AxiosResponse<any, any>;
        let expected = {
            "status": 200,
            "message": "Cell Set Successfully",
            "data": {
                "schema": {
                    "columns": [
                        {
                            "name": "A",
                            "type": "boolean"
                        },
                        {
                            "name": "B",
                            "type": "string"
                        }
                    ]
                },
                "columns": [
                    {
                        "name": "A",
                        "cells": [
                            {
                                "number": "6",
                                "value": true,
                                "view_value": true
                            }
                        ]
                    }
                ]
            }
        }
        before(async () => {
            try {
                response = await axios.put(`${serverUrl}/api/sheets/1`, {
                    "name":"A",
                    "number":"7",
                    "value": "not boolean value"
                });            }
            catch (err) {
                error = err;
            }
        });
        it(`should throw error`, () => {
            // @ts-ignore
            expect(error).to.not.be.null;
        })
        it(`should throw error with expected message`, () => {
            // @ts-ignore
            expect(error["response"]["data"]["message"]).to.be.equal("Field value not boolean value is not allowed in this column, should be of type :  boolean.");
        })
        it(`should throw error with expected status`, () => {
            // @ts-ignore
            expect(error["response"]["data"]["status"]).to.be.equal(400);
        })
    });

    context("when setting lookup cells", () => {
        let error: unknown = null;
        let response: AxiosResponse<any, any>;
        let id_res: AxiosResponse<any, any> ;
        let expected = {
            "status": 200,
            "message": "Cell Set Successfully",
            "data": {
                "schema": {
                    "columns": [
                        {
                            "name": "A",
                            "type": "boolean"
                        },
                        {
                            "name": "B",
                            "type": "string"
                        }
                    ]
                },
                "columns": [
                    {
                        "name": "A",
                        "cells": [
                            {
                                "number": "6",
                                "value": true,
                                "view_value": true
                            }
                        ]
                    }
                ]
            }
        }
        let id: string ;
        before(async () => {
            try {
                id_res = await axios.post(`${serverUrl}/api/sheets`, {
                    "columns" : [
                        {"name":"A", "type":"boolean"},
                        {"name": "B", "type" : "string"}
                    ]
                });
                id =  id_res["data"]["data"]["sheet_id"];

                response = await axios.put(`${serverUrl}/api/sheets/${id}`, {
                    "name":"A",
                    "number":"1",
                    "value": true
                });
                response = await axios.put(`${serverUrl}/api/sheets/${id}`, {
                    "name":"A",
                    "number":"2",
                    "value": "lookup('A',1)"
                });
                // response = await axios.put(`${serverUrl}/api/sheets/${id}`, {
                //     "name":"A",
                //     "number":"3",
                //     "value": "lookup('A',2)"
                // });
            }
            catch (err) {
                error = err;
            }
        });
        it(`should not throw error`, () => {
            // @ts-ignore
            expect(error).to.be.null;
        })
        it(`should return new sheet id`, () => {
            // @ts-ignore
            expect(id).to.be.equal("2");
        })
        // it(`should throw error with expected message`, () => {
        //     // @ts-ignore
        //     expect(error).to.be.equal("Field value not boolean vd in this column, should be of type :  boolean.");
        // })
        // it(`should throw error with expected message`, () => {
        //     // @ts-ignore
        //     expect(error["response"]["data"]["message"]).to.be.equal("Field value not boolean vd in this column, should be of type :  boolean.");
        // })
        // it(`should throw error with expected status`, () => {
        //     // @ts-ignore
        //     expect(error["response"]["data"]["status"]).to.be.equal(400);
        // })
    });

    context("when setting circular reference cells", () => {
        let error: unknown = null;
        let response: AxiosResponse<any, any>;
        let id_res: AxiosResponse<any, any> ;
        let expected = {
            "status": 200,
            "message": "Cell Set Successfully",
            "data": {
                "schema": {
                    "columns": [
                        {
                            "name": "A",
                            "type": "boolean"
                        },
                        {
                            "name": "B",
                            "type": "string"
                        }
                    ]
                },
                "columns": [
                    {
                        "name": "A",
                        "cells": [
                            {
                                "number": "6",
                                "value": true,
                                "view_value": true
                            }
                        ]
                    }
                ]
            }
        }
        let id: string ;
        before(async () => {
            try {
                response = await axios.put(`${serverUrl}/api/sheets/2`, {
                    "name":"A",
                    "number":"1",
                    "value": "lookup('A',2)"
                });
            }
            catch (err) {
                error = err;
            }
        });
        it(`should throw error`, () => {
            // @ts-ignore
            expect(error).to.not.be.null;
        })
        it(`should throw error with expected message`, () => {
            // @ts-ignore
            expect(error["response"]["data"]["message"]).to.be.equal("Circular Reference found.");
        })
        it(`should throw error with expected status`, () => {
            // @ts-ignore
            expect(error["response"]["data"]["status"]).to.be.equal(400);
        })
    });

});

