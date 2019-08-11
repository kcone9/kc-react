import React, { Component } from "react"
import "../scss/search.scss"
import Search from "./son/Public_search"
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
            nav_container: [], nav_off: false, nav_switch: true, nav_num: 100
        }
    }
    componentWillMount() {
        this.nav_init(true)
        this.remould()
    }
    remould(){
        var list=this.state.nav_more
        var li1=["住宅", "公寓", "商住", "别墅", "洋房", "其他"]
        var li2=["在售", "待售", "售完", "现房", "尾盘"]
        for(var li of li1){
            list[0].content.push({cb:false,text:li})
        }
        for(var li of li2){
            list[1].content.push({cb:false,text:li})
        }
    }
    componentDidMount(){
        var BMap=window.BMap
        var map = new BMap.Map("phone_map");
        var point = new BMap.Point(109.507708,18.266495);
        map.centerAndZoom(point, 15);
        var marker=new BMap.Marker(point);
        map.addOverlay(marker) 
    }
    nav_init(e,key) {
        var nav = this.state.nav
        for (var n of nav) {
            n.cb = false
            n.img = "http://127.0.0.1:5050/house/icon/arr_down_gray.png"
        }
        if(!e){
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
                this.nav_init(false,key)
            } else {
                var nav_off = false
                var n = 100
                this.nav_init(true)
            }
            this.setState({  nav_off: nav_off, nav_num: n })
        } else {
            this.nav_init(false,key)
            this.setState({  nav_num: key, nav_off: true })
        }
        this.setState({ nav_container: container, nav_switch: nav_switch })
    }
    p_btn(key,keys){
        var list=this.state.nav_container
        for(var li of list[key].content){
            li.cb=false
        }
        list[key].content[keys].cb=true
        this.setState({nav_container:list})
    }
    render() {
        return (<div className="phone_map">
            <div className="header">
                <img src="http://127.0.0.1:5050/house/icon/arr_left_gary.png"></img>
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
                                        return (<p key={keys} onClick={this.p_btn.bind(this,key,keys)} className={values.cb?"p_active":""}>{values.text}</p>)
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
            <div className="map" id="phone_map">
                
            </div>
        </div>)
    }
}
export default House_map




