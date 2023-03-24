import { combineReducers } from "redux";
import setting from "./setting";
import env from "./env";
import channelProduct from "./channelProducts";

var reducer = combineReducers({
    setting,
    env,
    channelProduct
});
export default reducer;