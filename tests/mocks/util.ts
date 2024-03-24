
export const UTIL = {
    isLookUp : {
        input : {
            valid_look_up : "lookup('A',10)",
            valid_look_up_2 : "lookup('BBB',10)",
            not_valid_look_up_first_param : "lookup(20,10)",
            not_valid_look_up_withoutlookup : "('A',10)",
            not_valid_look_up_one_param : "lookup(10)",
        }
    },
    getFunctionParameters: {
        input : {
            valid_input : {
                input :"lookup('A',10)",
                result: ['\'A\'',"10"]
            },
            valid_input_2 : {
                input :"lookup('BBB',10)",
                result: ['\'BBB\'',"10"]
            } ,
            missing_open_bracket : "lookup'BBB',10)",
            missing_close_bracket : "(lookup'BBB',10",
            missing_comma : "(lookup'BBB'10",
        },
        expected_error_message : "Error getting function parameters."
    }
}


