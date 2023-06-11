import React from "react"
import { LoadingOutlined } from '@ant-design/icons';
import {Spin} from "antd"
const antIcon = <LoadingOutlined style={{ fontSize: 56 }} spin />;
const StyledSpin=()=>{
    return(
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <Spin indicator={antIcon}/>
        </div>
    )
}
export default StyledSpin;