import React, { Component } from "react"
import "../scss/search.scss"
import Roll from "./son/Dynamic_roll"
import "../css/eight8.css"
class Bighouse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [{ text: "区域" }, { text: "总价" }, { text: "户型" }, { text: "更多" }],
            nav_select: [{ text: "不限" }, { text: "吉阳区" }, { text: "海棠区" }, { text: "天涯区" }, { text: "崖州区" }],
            nav_more: [{ title: "洋房", content: ["不限", "住宅", "公寓", "商住", "别墅", "洋房", "其他"] },
            { title: "旅游景点", content: ["不限", "学区房", "别墅", "商住", "别墅", "养老", "商住", "投资", "温泉社区", "海景房"] },
            { title: "代售", content: ["不限", "在售", "待售", "售完", "现房", "尾盘", "其他"] }], nav_off: true, nav_num: 100, nav_close: "none",
            nav_win: false,load_data:[],load_off:true,load_text:"正在加载",load_close:"block"
            
        }
    }
    componentWillMount() {
        this.nav_init(true)
        var list=this.state.load_data
        for(var i=0;i<3;i++){
            list.push({key:i,video:true,title:"富力湾",price:"均价约：19888元/㎡",address:"地址：陵水县香水湾旅游度假区B区南段",offer:"全款享94折"})
        }
        list[2].video=false
        this.setState({load_data:list})
        //video:true,title:"富力湾",price:"均价约：19888元/㎡",address:"地址：陵水县香水湾旅游度假区B区南段",offer:"全款享94折"
    }
    componentDidMount(){
        this.loading()
    }
    loading=()=>{
        var inter=new IntersectionObserver(
            (element)=>{
                if(element[0].isIntersecting){
                    // console.log(this.state.load_off)
                    if(this.state.load_off){
                        this.load_add()
                    }
                    
                }
            }
        )
        inter.observe(this.refs.load)
    }
    load_add=()=>{
        this.setState({load_off:false})
        var list=this.state.load_data
        console.log(list)
        var num=list.length
        if(num>= 20){
            var load=false
            this.setState({load_text:"没有更多数据了",load_close:"none"})
        }else{
            for(var i=num;i<num+2;i++){
                list.push({key:i,video:true,title:"富力湾",price:"均价约：19888元/㎡",address:"地址：陵水县香水湾旅游度假区B区南段",offer:"全款享94折"})
            }
            var load=true
        }
        setTimeout(()=>{
            this.setState({load_data:list,load_off:load})
        },800)
    }
    nav_init = (e, i) => {
        var list = this.state.nav
        for (var li of list) {
            li.img = "http://127.0.0.1:5050/house/icon/arr_down_gray.png"
            li.cb = false
        }
        if (e !== true) {
            list[i].cb = true
            list[i].img = "http://127.0.0.1:5050/house/icon/arr_down_select.png"
        }
        this.setState({ nav: list })
    }
    nav_close_bth = () => {
        this.nav_init(true)
        this.nav_overflow(false)
        this.setState({ nav_close: "none", nav_win: false, nav_num: 100 })
    }
    nav_overflow=(e)=>{
        var body=document.querySelector("body")
        if(e){
            body.style.overflowY="hidden"
        }else{
            body.style.overflowY="scroll"
        }
    }
    nav_btn = function (e) {
       
        var num = this.state.nav_num
        var win = this.state.nav_win
        if (e === 0) {
            var off = true
            var list = [{ text: "不限" }, { text: "吉阳区" }, { text: "海棠区" }, { text: "天涯区" }, { text: "崖州区" }]
        } else if (e === 1) {
            var off = true
            var list = [{ text: "6-7千" }, { text: "7-8千" }, { text: "8千-1万" }, { text: "1万-1.3万" }, { text: "1.3-1.5万" }, { text: "1.5-2万" }, { text: "2万以上" }]
        } else if (e === 2) {
            var off = true
            var list = [{ text: "不限" }, { text: "一居" }, { text: "二居" }, { text: "三居" }, { text: "四居" }, { text: "五居" }, { text: "五居以上" }]
        } else if (e === 3) {
            var off = false
        }
        if (num === e) {
            if (win) {
                this.nav_init(true)
                this.nav_overflow(false)
                this.setState({ nav_close: "none", nav_win: false, nav_num: 100 })
            } else {
                this.nav_init(false, e)
                this.nav_overflow(true)
                this.setState({ nav_close: "block", nav_win: true, nav_num: e })
            }
        } else {
            this.nav_init(false, e)
            this.nav_overflow(true)
            this.setState({ nav_close: "block", nav_win: true, nav_num: e })
        }
        this.setState({ nav_select: list, nav_off: off })
    }
    render() {
        return (<div className="bighouse_total" >
            <div className="header">
                <img src="http://127.0.0.1:5050/house/icon/arr_left_gary.png"></img>
                <span>大楼盘列表</span>
                <p></p>
            </div>
            <div className="search">
                <div className="pad">
                    <input placeholder="请输入楼盘名"></input><div className="right"><span></span><img src="http://127.0.0.1:5050/house/icon/search.png"></img></div>
                </div>
            </div>
            <Roll></Roll>
            <div className="nav_down">
                {
                    this.state.nav.map((value, key) => {
                        return (<div key={key} onClick={this.nav_btn.bind(this, key)} className={value.cb ? "font_act" : ""}><span>{value.text}</span><img className={value.cb ? "img_act" : ""} src={value.img}></img></div>)
                    })
                }
            </div>
            <div className="rise" style={{ display: this.state.nav_close }}>
                <div className="close"><img onClick={this.nav_close_bth} src="http://127.0.0.1:5050/house/icon/close.png"></img></div>
                {
                    this.state.nav_off ? this.state.nav_select.map((value, key) => {
                        return (<div className="item" key={key}><span>{value.text}</span></div>)
                    }) : this.state.nav_more.map((value, key) => {
                        return (<div className="more" key={key}>
                            <div className="title">{value.title}</div>
                            <div className="content">
                                {
                                    value.content.map((values, keys) => {
                                        return (<div className="son" key={keys}>{values}</div>)
                                    })
                                }

                            </div>

                        </div>)
                    })
                }
                {
                    this.state.nav_off ? "" : <div className="bottom"><button className="first">重置条件</button><button className="last">确定</button></div>
                }
            </div>
            <ul className="bighouse_list">
                {
                    this.state.load_data.map((value,key)=>{
                        return (<li key={key}>
                            <div className="list_main">
                                <div className="abs"><span>在售</span></div>
                                <div className={value.video?"outer":"outer active"}>
                                    <img src="http://cdn.lou86.com/public/static/phone/image/icons/splist14.png"></img>
                                </div>
                                <div className="inter">
                                    <div className="inter_top"><div>{value.title}</div><div className="right">{value.price}</div></div>
                                    <div className="inter_bottom"><span>{value.address}</span></div>
                                </div>
                                <img src="http://cdn.lou86.com/public/uploads/2017-10/13/6d28658876d90199d8eff06102c3efbf.jpg"></img>
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <img src="http://cdn.lou86.com/public/static/phone/image/icons/unts.png"></img><span>{value.offer}</span>
                                </div><button>获取优惠</button>
                            </div>
                        </li>)
                    })
                }
                
            </ul>
            <div className="bighouse_loading" ref="load">
                <div className="loader" style={{display:this.state.load_close}}></div><span>{this.state.load_text}</span>
            </div>
        </div>)
    }
}
export default Bighouse



