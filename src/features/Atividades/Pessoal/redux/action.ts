import {UPDATE_LIST} from "./types";
import {KindList} from "./reducer";

export const updateList = (list: KindList) => {
    return {
        type: UPDATE_LIST,
        payload: {
            list,
        }
    };
};
