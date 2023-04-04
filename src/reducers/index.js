import { combineReducers } from "redux";
import setting from "./setting";
import env from "./env";
import channelProduct from "./channelProducts";
import tiktokOrders from "./tiktokOrders";
import swProduct from "./swProduct";

var reducer = combineReducers({
    setting,
    env,
    channelProduct,
    tiktokOrders,
    swProduct
});
export default reducer;