import React, { Component } from "react"
import "../scss/search.scss"
import Search from "./son/Public_search"
import {Redirect} from "react-router-dom"
class House_map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [{ text: "区域" }, { text: "均价" }, { text: "特色" }, { text: "更多" }],
            nav_one: ["吉阳区", "海棠区", "天涯区", "崖州区"],
            nav_two: ["不限", "1万以下", "1万~1.5万", "1.5万~2万", "2万以上"],
            nav_three: ["不限", "住宅", " 复式", "露台", "低总价", "返租", "不限购", "刚需", "学区房"],
            nav_more: [{ text: "物业类型", content: [] },
            { text: "销售状态", content: [] }],
            nav_container: [], nav_off: false, nav_switch: true, nav_num: 100,jump:false
        }
    }
    componentWillMount() {
        this.nav_init(true)
        this.remould()
    }
    remould() {
        var list = this.state.nav_more
        var li1 = ["住宅", "公寓", "商住", "别墅", "洋房", "其他"]
        var li2 = ["在售", "待售", "售完", "现房", "尾盘"]
        for (var li of li1) {
            list[0].content.push({ cb: false, text: li })
        }
        for (var li of li2) {
            list[1].content.push({ cb: false, text: li })
        }
    }
    componentDidMount() {
        this.get_map()
    }
    get_map() {
        var BMap = window.BMap
        var map = new BMap.Map("phone_map");
        function SquareOverlay(center, width, height, text1, text2, btn) {
            this._center = center;
            this._width = width;
            this._height = height
            this._text1 = text1
            this._text2 = text2
            this._btn = btn
        }
        SquareOverlay.prototype = new BMap.Overlay();
        SquareOverlay.prototype.initialize = function (map) {
            this._map = map;
            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.width = this._width + "px";
            div.style.height = this._height + "px";
            div.style.whiteSpace = "nowrap"
            div.style.color = "#fff"
            div.style.display = "flex"
            div.style.flexDirection = "column"
            div.style.alignItems = "center"
            var p1 = document.createElement("p")
            p1.style.borderTopLeftRadius = "4px"
            p1.style.borderTopRightRadius = "4px"
            p1.style.width = this._width + "px"
            p1.style.backgroundColor = "#56a444"
            p1.style.color = "#fff"
            p1.style.fontSize = '0.9rem'
            p1.innerText = this._text1
            p1.style.margin = "0"
            p1.style.textAlign = "center"
            p1.style.padding = "0.1rem 0"
            var p2 = document.createElement("p")
            p2.style.borderBottomLeftRadius = "4px"
            p2.style.borderBottomRightRadius = "4px"
            p2.style.width = this._width + "px"
            p2.style.backgroundColor = "#56a444"
            p2.style.color = "#fff"
            p2.style.fontSize = '0.9rem'
            p2.innerText = this._text2
            p2.style.textAlign = "center"
            p2.style.margin = "0"
            p2.style.padding = "0.1rem 0"
            var arr = document.createElement("p")
            arr.style.margin = "0"
            arr.style.width = "14px"
            arr.style.height = "14px"
            arr.style.borderWidth = "7px"
            arr.style.borderStyle = "solid"
            arr.style.borderColor = "rgba(77,166,53,.9) transparent transparent transparent"
            arr.style.boxSizing = "border-box"
            div.appendChild(p1)
            div.appendChild(p2)
            div.appendChild(arr)
            map.getPanes().markerPane.appendChild(div);
            this._div = div;
            div.addEventListener("click", (e) => {
                console.log(this._btn)
            })
            return div;
        }
        SquareOverlay.prototype.draw = function () {
            var position = this._map.pointToOverlayPixel(this._center);
            this._div.style.left = position.x - this._width / 2 + "px";
            this._div.style.top = position.y - this._height + "px";
        }
        var point = new BMap.Point(109.511661, 18.256092);
        map.centerAndZoom(point, 16);
        map.addControl(new BMap.NavigationControl({ anchor: "BMAP_ANCHOR_BOTTOM_RIGHT", type: "BMAP_NAVIGATION_CONTROL_ZOOM" }))
        // map.addControl(new BMap.GeolocationControl());
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            console.log(r)
            console.log(789, this.getStatus())
            if (this.getStatus() == "BMAP_STATUS_SUCCESS") {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point); //通过坐标跳转到指定位置
                console.log('您的位置：' + r.point.lng + ',' + r.point.lat)
            }
            else {
                console.log('failed' , this.getStatus())
            }
        })
        function myFun(result) {
            var cityName = result.name;
            // map.setCenter(cityName); 通过名字，跳转到指定城市
            console.log("ip定位城市:" + cityName)
        }
        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
        var width = 140
        var height = 52
        map.addOverlay(new SquareOverlay(map.getCenter(), width, height, "碧桂园", "24000/rmb", "碧桂园"));
        map.addOverlay(new SquareOverlay(new BMap.Point(109.514185, 18.255233), width, height, "华庭国际商务中心", "28000元/平米", "华庭国际商务中心"));
        map.addOverlay(new SquareOverlay(new BMap.Point(109.518605, 18.256057), width, height, "天悦湖畔", "28000元/平米", "天悦湖畔"));
        map.disableDragging()
        map.addEventListener("touchmove", (e) => {
            map.enableDragging()
        })
        map.addEventListener("touchend", (e) => {
            map.disableDragging()
        })
    }
    nav_init(e, key) {
        var nav = this.state.nav
        for (var n of nav) {
            n.cb = false
            n.img = "http://127.0.0.1:5050/house/icon/arr_down_gray.png"
        }
        if (!e) {
            nav[key].cb = true
            nav[key].img = "http://127.0.0.1:5050/house/icon/arr_down_select.png"
        }
        return nav
    }
    nav_btn(key) {
        var num = this.state.nav_num
        if (key === 0) {
            var container = this.state.nav_one
            var nav_switch = true
        } else if (key === 1) {
            var container = this.state.nav_two
            var nav_switch = true
        } else if (key === 2) {
            var container = this.state.nav_three
            var nav_switch = true
        } else if (key === 3) {
            var container = this.state.nav_more
            var nav_switch = false
        }
        if (num === key) {
            if (!this.state.nav_off) {
                var nav_off = true
                var n = key
                this.nav_init(false, key)
            } else {
                var nav_off = false
                var n = 100
                this.nav_init(true)
            }
            this.setState({ nav_off: nav_off, nav_num: n })
        } else {
            this.nav_init(false, key)
            this.setState({ nav_num: key, nav_off: true })
        }
        this.setState({ nav_container: container, nav_switch: nav_switch })
    }
    p_btn(key, keys) {
        var list = this.state.nav_container
        for (var li of list[key].content) {
            li.cb = false
        }
        list[key].content[keys].cb = true
        this.setState({ nav_container: list })
    }
    back(){
        // this.setState({jump:true})
        this.props.history.go(-1)
    }
    render() {
        if(this.state.jump){
            return (<Redirect to="/"></Redirect>)
        }
        return (<div className="phone_map">
            <div className="header">
                <img onClick={this.back.bind(this)} src="http://127.0.0.1:5050/house/icon/arr_left_gary.png"></img>
                <p>三亚</p><span>--</span>
            </div>
            <Search text="请输入楼盘名称/关键词"></Search>
            <div className="nav">
                {
                    this.state.nav.map((value, key) => {
                        return (<div onClick={this.nav_btn.bind(this, key)} key={key} className={value.cb ? "active" : ""}><span>{value.text}</span><img className={value.cb ? "img" : ""} src={value.img}></img></div>)
                    })
                }
            </div>
            <div className={this.state.nav_off ? "nav_select" : "nav_select nav_active"} >
                {
                    this.state.nav_switch ? this.state.nav_container.map((value, key) => {
                        return (<div className="item" key={key}><span>{value}</span></div>)
                    }) : this.state.nav_container.map((value, key) => {
                        return (<div className="more" key={key}>
                            <div className="title">{value.text}</div>
                            <div className="content">
                                {
                                    value.content.map((values, keys) => {
                                        return (<p key={keys} onClick={this.p_btn.bind(this, key, keys)} className={values.cb ? "p_active" : ""}>{values.text}</p>)
                                    })
                                }
                            </div>
                        </div>)
                    })
                }
                {
                    !this.state.nav_switch ? <div className="select_btn">
                        <button>确定</button>
                    </div> : ""
                }
            </div>
            <div className="map_container">
                <div className="map" id="phone_map">
                </div>
            </div>
        </div>)
    }
}
export default House_map




