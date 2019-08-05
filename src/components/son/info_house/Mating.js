import React, { Component } from "react"
class Mating extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        var BMap=window.BMap
        var map = new BMap.Map("map");
        var point = new BMap.Point(109.507708,18.266495);
        map.centerAndZoom(point, 15);
        var infor=new BMap.InfoWindow("怡海湾别墅")
        map.openInfoWindow(infor,map.getCenter())   
    }
    render() {
        return (<div className="info_mating">
            <div className="mating_map">
                <div className="title">
                    <span>怡海湾别墅周边配套</span>
                </div>
                <div className="map" id="map">
                </div>
            </div>
            <div className="mating_info">
                <div className="title">交通路线</div>
                <div className="item">
                幼儿园：红黄蓝国际幼儿园综合商场：第三时间商业街其他：海南生态软件园、万达影院、银行、医院，学校，菜市场、超市。小区内部配套：会所、运动场地
                </div>
            </div>
            <div className="mating_traffic">
                <div className="title">交通线路</div>
                <div className="item">公交：项目1公里范围内有两个公交站，57、59、11、10路公交车经过。其中57、59路公交车可直达海口。
自驾：项目地处于南海大道和海南环岛高速交汇处的西北侧。
（1）海口市美兰机场出发，沿绕城高速-老城镇-欣龙路到达项目；
（2）海口市中心出发，沿南海大道-欣龙路-南一环路到达项目；
（3）沿滨海大道，经过海湾大桥到达项目。</div>
            </div>
        </div>)
    }
}
export default Mating