import React, { Component } from "react"
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            infos: ["低总价", "海景房", "报销机票", "专车看房", "免费接机", "度假", "别墅"]
        }
    }
    render() {
        return (<div className="info_route_main">

            <div className="house_info">
                <div className="pad">
                    <div className="title">怡海湾别墅</div>
                    <div className="item">
                        <span >均　　价：</span>
                        <span >33800元/平米</span>
                    </div>
                    <div className="item">
                        <span >总　　价：</span>
                        <span >270万元/套</span>
                    </div>
                    <div className="item">
                        <span >物业类型：</span>
                        <span >别墅</span>
                    </div>
                    <div className="spec">
                        <span>楼盘特色：</span>
                        {
                            this.state.infos.map((value, key) => {
                                return <span key={key} className="color">{value}</span>
                            })
                        }
                    </div>
                    <div className="item">
                        <span >建筑形式：</span>
                        <span >独栋别墅 叠拼别墅 双拼别墅</span>
                    </div>
                    <div className="item active">
                        <span >装修状况：</span>
                        <span >毛坯</span>
                    </div>
                </div>
            </div>
            <div className="house_info">
                <div className="pad">
                    <div className="title">基本信息</div>
                    <div className="item">
                        <span >占地面积：</span>
                        <span >99900平方米</span>
                    </div>
                    <div className="item">
                        <span >容积率</span>
                        <span >0.5</span>
                    </div>
                    <div className="item">
                        <span >绿化率</span>
                        <span >55%</span>
                    </div>
                    <div className="item">
                        <span >总栋数</span>
                        <span >暂无资料</span>
                    </div>
                    <div className="item">
                        <span >停车位</span>
                        <span >暂无资料</span>
                    </div>
                    <div className="item">
                        <span >产权年限：</span>
                        <span >70年</span>
                    </div>
                    <div className="item">
                        <span >户　　型：</span>
                        <span >（80~285平）精装别墅</span>
                    </div>
                    <div className="item">
                        <span >开发商</span>
                        <span >香港怡丰集团发展有限公司 </span>
                    </div>
                    <div className="item">
                        <span >物业费</span>
                        <span >暂无资料</span>
                    </div>
                    <div className="item">
                        <span >物业公司：</span>
                        <span >绿城物业</span>
                    </div>
                    <div className="spec">
                        <span>楼盘地址：</span>
                        <span>海南省三亚陵水国际旅游岛先行试验区滨海度假区</span>
                    </div>
                    <div className="item active">
                        <span >楼层状况：</span>
                        <span >暂无资料</span>
                    </div>
                </div>
            </div>
            <div className="sell">
                <div className="pad">
                    <div className="title">项目介绍</div>
                    <div className="item">10公里海岸线，距离海岸约150米。项目总占地约150亩，容积率0.5，绿化覆盖率55%，建筑密度15%，倾力打造成大三亚区域一线海景高端纯别墅项目。以回赠这块较美的海岸线。</div>
                    <div className="item">在园林设计上，使用不同的层次营造多样性空间，在植物选材上，选用上百钟热带植物互补互助。从线性空间，开敞空间，私密空间，入户空间，多方面打造，在不同的环境条件下与其它园林要素有机组合来创造景观，使之构成一幅即符合生物学特性又具有美学价值的生物立体画，供人们观赏、游憩。</div>
                    <div className="item active">作为三亚陵水的高端品质项目，为了打造较独特的归心社区，绿城物业为怡海湾项目度身打造不可复制的“六心云服务”：安心、赏心、精心、省心、悦心、爱心。绿城物业服务集团成立于1998年，服务于全国123座城市多个高端项目，多年获得“中国物业服务百强满意度领先企业”第一名，得到业内高度认可。</div>
                </div>
            </div>
            <div className="meting">
                <div className="pad">
                    <div className="title">项目配套</div>
                    <div className="item">小区内部配套：沙滩运动公园、蓝熙健康、无边际泳池、活动广场、特色廊架、健康跑道、室外会客厅、健身房、儿童乐园、花海、椰林等。<br></br>
                    项目周边配套：海韵广场、海风小镇9万平米商业街（待政府统一招商）、伯明顿大酒店、中州大酒店、威斯汀酒店、莱弗士酒店海洋欢乐世界、黎安海风风情小镇、中央民族大学海南分校、南海博物馆、游艇码头等。</div>
                    
                </div>
            </div>
            <div className="meting">
            <div className="pad">
                    <div className="title">交通状况</div>
                    <div className="item">交通：距陵水县城6公里，距陵水高铁站12公里，距三亚市区55公里 </div>
                </div>
            </div>
        </div>)
    }
}
export default Main