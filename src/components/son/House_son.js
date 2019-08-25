import React, { Component } from "react"
import "../son_scss/footer.scss"
class House_son extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            house: []
        }
    }
    init(t) {
        var house = []
        if (!t) {
            for (var i = 0; i < 3; i++) {
                house.push({
                    img: "http://cdn.lou86.com/public/uploads/2017-09/25/336662588aeca666a61af52cc51d93d8.jpg",
                    load: "/static/media/loading.ccf68734.gif", title: "富力湾", price: 19888, ads: "海南-三亚", room: "1室~3室   55~121㎡",
                    time: "14小时前有人咨询", label: ["品牌地产", "海景房", "报销机票"], conpon: "交2万享10万"
                })
            }
            
        } else {
            for (var i = 0; i < 3; i++) {
                house.push({
                    img: "http://cdn.lou86.com/public/uploads/2018-03/23/b8eeb75e17c97752a41a59979971f69c.png",
                    load: "/static/media/loading.ccf68734.gif", title: "融创臻园", price: 19888, ads: "海南-三亚", room: "3室~3室   82~110㎡",
                    time: "15小时前有人咨询", label: ["报销机票", "专车看房", "特价优惠"], conpon: "全款享97折优惠"
                })
            }
        }
        this.setState({ house: house })
    }
    componentWillMount() {
        this.init()
    }
    componentWillReceiveProps(p) {
        // console.log(p.change)
        if (p.change) {
            this.init()
        } else {
            this.init(true)
        }
    }
    render() {
        return (<div className="inde">
            {
                this.state.house.map((value, key) => {
                    return (<div className="indes" key={key}>
                        <div className="top">
                            <img src={value.img} data-id={key}></img>
                            <div className="info">
                                <div className="titles">{value.title}</div>
                                <div className="price">{value.price<1000?value.price+"万/套":value.price+"元/㎡"}</div>
                                <div className="address">{value.ads}</div>
                                <div className="room">{value.room}</div>
                            </div>
                            <div className="call">
                                <img src="http://cdn.lou86.com/public/static/phone/img/icons/tel.gif"></img>
                            </div>
                        </div>
                        <div className="mid">
                            <div className="infor"><span>{value.time}</span></div>
                            {
                                value.label.map((values, keys) => {
                                    return (<span className="dis" key={keys}>{values}</span>)
                                })
                            }
                        </div>
                        <div className="bottom">
                            <div className="bottoms">
                                <div className="discount">惠</div><span>{value.conpon}</span>
                            </div>

                        </div>
                    </div>)
                })
            }
        </div>)
    }
}
export default House_son;





