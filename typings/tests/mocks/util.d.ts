export declare const UTIL: {
    isLookUp: {
        input: {
            valid_look_up: string;
            valid_look_up_2: string;
            not_valid_look_up_first_param: string;
            not_valid_look_up_withoutlookup: string;
            not_valid_look_up_one_param: string;
        };
    };
    getFunctionParameters: {
        input: {
            valid_input: {
                input: string;
                result: string[];
            };
            valid_input_2: {
                input: string;
                result: string[];
            };
            missing_open_bracket: string;
            missing_close_bracket: string;
            missing_comma: string;
        };
        expected_error_message: string;
    };
};
