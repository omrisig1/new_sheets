import {Sheet} from "../../src/types/types";
export let test_db = (): { [key: string]: Sheet } => ({
    "1": {
        schema: {
            columns: [
                {
                    name: "A",
                    type: "string"
                }
            ]
        },
        columns: [
            {
                name: "A",
                cells: [
                    {
                        number: 10,
                        value: "abc",
                        view_value: "abc"
                    }
                ]
            }
        ]
    }
});

export let expected_sheet = () => ({
    schema: {
        columns: [
            {
                name: "A",
                type: "string"
            }
        ]
    },
    columns: [
        {
            name: "A",
            cells: [
                {
                    number: 10,
                    value: "abc"
                }
            ]
        }
    ]
})

export const input_schema = {
    columns: [
        {
            name: "A",
            type: "string"
        }
    ]
}

export let expected_new_sheet = () => ({
    columns: undefined,
    schema: {
        columns: [
            {
                name: "A",
                type: "string"
            }
        ]
    }
})

export let expected_sheet_after_set = () => ({
    schema: {
        columns: [
            {
                name: "A",
                type: "string"
            }
        ]
    },
    columns: [
        {
            name: "A",
            cells: [
                {
                    number: 10,
                    value: "aaa"
                }
            ]
        }
    ]
})
