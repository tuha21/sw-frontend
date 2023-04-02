import { combineReducers } from "redux";
import setting from "./setting";
import env from "./env";
import channelProduct from "./channelProducts";
import tiktokOrders from "./tiktokOrders";

var reducer = combineReducers({
    setting,
    env,
    channelProduct,
    tiktokOrders
});
export default reducer;