import React,{Component} from "react"
class Main extends React.Component {
    constructor(props){
        super(props)
        this.state={
            info:["低总价","海景房","报销机票","专车看房","免费接机","度假","别墅"]
        }
    }
    render(){
        return (<div className="info_route_main">
            <div className="pad">
                <div className="house_info">
                    <div className="title">怡海湾别墅</div>
                    <div className="item">
                        <span className="left">均　　价：</span>
                        <span className="right">33800元/平米</span>
                    </div>
                    <div className="item">
                        <span className="left">总　　价：</span>
                        <span className="right">270万元/套</span>
                    </div>
                    <div className="item">
                        <span className="left">物业类型：</span>
                        <span className="right">别墅</span>
                    </div>
                    <div className="spec">
                        <span>楼盘特色：</span>
                        {
                            this.state.info.map((value,key)=>{
                                <div key={key} className="ccolor">{value}</div>
                            })
                        }
                         
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default Main