import { LoadingCircularProgress } from "@sapo-presentation/sapo-ui-components";
import '../../style/processing.scss';
import { useSelector } from "react-redux";

function Processing (props) {

    const positionApis = useSelector(state => state.env.positionApi) || []

    const listProcessing = positionApis.filter(item => item === 'crawlProduct' 
        || item === 'quickMap' 
        || item === 'quickCreate'
        || item === 'printOrder'
    );

    const renderItem = (item) => {
        var label = "";
        if (item === 'crawlProduct') {
            label = 'Cập nhật dữ liệu sản phẩm';
        }
        if (item === 'quickMap') {
            label = 'Liên kết sản phẩm';
        }
        if (item === 'quickCreate') {
            label = 'Khởi tạo sản phẩm';
        }
        if (item === 'printOrder') {
            label = 'In đơn hàng';
        }
        return (
            <div className="processing-item">
                <div>{label}</div>
                <LoadingCircularProgress size="md"/>
            </div>
        )
    }
    if (listProcessing.length === 0) return null;
    return (
        <div className="processing-wrapper">
            {
                listProcessing.map((item, index) => {
                    return renderItem(item);
                })
            }
        </div>
    )

}
export default Processing;