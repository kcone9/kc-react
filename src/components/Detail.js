import React, { Component } from "react"
import "../scss/detail.scss"
import House from "./son/House_son"
import url from "url"
import Footer from "./son/Footer"
import axios from "axios"
import {Redirect,Link} from "react-router-dom"
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [{text:"主页",to:"/detail"},{text:"详情",to:"/info/"},{text:"户型",to:"/info/type"}, 
            {text:"配套",to:"/info/mating"}, {text:"问答",to:"/info/answer"}], 
            fold: "10rem", fold_text: "查看更多",
            domain: "http://cdn.lou86.com",
            mating: [{ img: "/public/static/phone/img/icons/ico_44.png", text: "学校" },
            { img: "/public/static/phone/img/icons/ico_45.png", text: "医院" },
            { img: "/public/static/phone/img/icons/ico_46.png", text: "交通" },
            { img: "/public/static/phone/img/icons/ico_47.png", text: "餐饮" },
            { img: "/public/static/phone/img/icons/ico_48.png", text: "娱乐" },
            { img: "/public/static/phone/img/icons/ico_49.png", text: "娱乐" },
            { img: "/public/static/phone/img/icons/ico_50.png", text: "银行" }],
            son: false, son_arr: [{ text: "推荐楼盘", cb: true }, { text: "热销楼盘", cb: false }],
            jump:false,jump_from:"",detail_info:[],house_type:[],house_advantage:[],house_dynamic:[],
            house_image:[],house_answer:[],house_swiper:[]
        }
    }
    componentWillMount() {
        document.getElementById("root").scrollIntoView(true)
        var list = this.state.nav
        for (var i = 0; i < list.length; i++) {
            if (i === 0) {
                list[i].cb=true
            } else {
                list[i].cb=false
            }
        }
        this.setState({ nav: list })
        var rid=parseInt(url.parse(this.props.location.search,true).query.rid)
        if(!rid) rid=1
        this.get_data(rid)
        this.get_image(rid)
    }
    get_data(rid){
        axios.get(this.props.domain+"/details/house_detail?rid="+rid).then((res)=>{
            if(res.data.code===1){
                var list=res.data.data.detail
                function deal_date(str){
                    str=str.split("T")[0]
                    str=str.split("-")
                    str[0]=str[0]+"年"
                    str[1]=str[1]+"月"
                    str[2]=str[2]+"日"
                    var strs=""
                    for(var s of str){
                        strs=strs+s
                    }
                    return strs
                }
                list[0].update_time=deal_date(list[0].update_time)
                list[0].label=res.data.data.detail_label
                var answer=res.data.data.answer
                for(var item of answer){
                    item.cb=false
                    item.height="2.2rem"
                    item.time=deal_date(item.time)
                }
                this.setState({detail_info:list,house_type:res.data.data.type,
                    house_advantage:res.data.data.advantage,house_dynamic:res.data.data.dynamic,
                    house_answer:answer,house_swiper:res.data.data.swiper})
            }
        })
    }
    componentWillUpdate(){
        // console.log(233)
    }
    answer_btn(key){
        var list=this.state.house_answer
        if(!list[key].cb){
            list[key].cb=!list[key].cb
            list[key].height=""
        }else{
            list[key].cb=!list[key].cb
            list[key].height="2.2rem"
        }

        this.setState({house_answer:list})

    }
    get_image(rid){
        axios.get(this.props.domain+"/details/house_detail_image?rid="+rid).then(res=>{
            if(res.data.code===1){
                this.setState({house_image:res.data.reg})
            }
        })
    }
    componentDidMount() {
        var BMap=window.BMap
        var map = new BMap.Map("map");
        var point = new BMap.Point(109.507708,18.266495);
        map.centerAndZoom(point, 15);
        var marker=new BMap.Marker(point);
        map.addOverlay(marker) 
    }
    fold = () => {
        if (this.state.fold == "10rem") {
            var num = ""
            var text = "收起"
        } else {
            var num = "10rem"
            var text = "查看更多"
        }
        this.setState({ fold: num, fold_text: text })
    }
    son = (e) => {
        var list = this.state.son_arr
        for (var li of list) {
            li.cb = false
        }
        if (e) {
            var change = true
            list[0].cb = true
        } else {
            var change = false
            list[1].cb = true
        }
        this.setState({ son: change, son_arr: list })
    }
    jump_info=function(e){
        var list=this.state.nav
        for(var li of list){
            li.cb=false
        }
        list[e].cb=true
        
        if(e!==0){
            var jump=true
            var jump_from=list[e].to
        }else{
            var jump=false
            var jump_from=list[e].to
        }
        this.setState({nav:list,jump:jump,jump_from:jump_from})
    }
    render() {
        if(this.state.jump){
            return <Redirect to={this.state.jump_from}/>
        }
        return (<div>
            <div className="detail_header">
                <Link className="back" to="/">
                    <img src="http://127.0.0.1:5050/house/icon/back.png"></img>
                </Link>
                <div className="aside">
                    <img src="http://127.0.0.1:5050/house/icon/aside.png"></img>
                </div>
            </div>
            <div className="detail_firstimg">
                {
                    this.state.house_swiper.map((value,key)=>{
                        return(<img src={value.img} key={key}></img>)
                    })
                }
                
            </div>
            <div className="detail_nav">
                {
                    this.state.nav.map((value, key) => {
                        return (<button key={key} className={value.cb ? "active" : ""} onClick={this.jump_info.bind(this,key)}>{value.text}</button>)
                    })
                }
            </div>
            <div className="detail_body">{
                this.state.detail_info.map((value,key)=>{
                    return (<div className="detail_body_pad" key={key}>
                    <div className="header">
                        <div className="pad">
                            <div className="left">
                                <div className="title"><span>{value.title}</span><i>在售</i></div>
                                <div className="label">
                                    {value.label.map((values,keys)=>{
                                        return (<span key={keys}>{values.text}</span>)
                                    })}
                                </div>
                            </div>
                            <div className="right">
                                <div className="join"><img src="http://cdn.lou86.com/public/static/phone/img/icons/team.png"></img>报名团购</div>
                            </div>
                        </div>
                    </div>
                    <div className="intro">
                        <div className="price">
                            <div className="left">
                                <span className="title">总价约:</span><span className="content">{value.price<1000?value.price+"万/套":value.price+"元/㎡"}</span>
                            </div>
                            <div className="right"><span>房贷计算器</span><img src="http://cdn.lou86.com/public/static/phone/img/icons/right.png"></img></div>
                        </div>
                        <div className="date">
                            <div className="title">更新：</div>
                            <div className="time">{value.update_time}</div>
                        </div>
                        <div className="loan">
                            <div className="left"><div className="title">预算：</div>
                                <div className="content">咨询首付及贷款明细</div></div>
                            <div className="right">
                                <img src="http://cdn.lou86.com/public/static/phone/img/icons/right.png"></img>
                            </div>
                        </div>
                    </div>
                    <div className="join">
                        <div className="left">
                            <img src="http://cdn.lou86.com/public/static/phone/img/icons/liwu2.png"></img>
                            <div className="con">
                                <span className="top">全款享99折优惠</span>
                                <p>距离结束剩余<span>2</span>天<span>741</span>人已报名</p>
                            </div>
                        </div>
                        <div className="right">
                            <button>立即报名</button>
                        </div>
                    </div>
                </div>)})}
            </div>
            <div className="detail_call">
                <img src="http://cdn.lou86.com/public/static/phone/img/icons/tel3.gif"></img>
                <div><span>0898-32287843</span></div>
            </div>
            <div className="detail_info">
                {this.state.detail_info.map((value,key)=>{
                    return (<div className="pad" key={key}>
                    <div className="title">
                        <span className="info">楼盘信息</span><div><span>查看全部</span><img src="http://cdn.lou86.com/public/static/phone/img/icons/right.png"></img></div>
                    </div>
                    <div className="table"><span className="t_title">{value.mean_t}</span><span className="info">{value.price<1000?value.price+"万/套":value.price+"元/㎡"}</span></div>
                    <div className="table"><span className="t_title">{value.finish_t}</span><span className="info">{value.finish}</span></div>
                    <div className="table"><span className="t_title">{value.types_t}</span><span className="info">{value.types}</span></div>
                    <div className="table"><span className="t_title">{value.ptime_t}</span><span className="info">{value.ptime}</span></div>
                    <div className="table"><span className="t_title">{value.real_t}</span><span className="info">{value.reals}</span></div>
                    <div className="table"><span className="t_title">{value.adds_t}</span><span className="info">{value.adds}</span></div>
                    <div className="head">
                        <img className="one" src="http://cdn.lou86.com/public/uploads/zhiye/20190429/f2372ff3e70b89a92e0741994c373716.jpg"></img>
                        <img className="two" src="http://cdn.lou86.com/public/static/phone/img/icons/yuyin.gif"></img>
                    </div>
                    <div className="inform">
                        <button className="drop">
                            <img src="http://cdn.lou86.com/public/static/phone/img/icons/zoushi.jpg"></img> 降价通知我</button>
                        <button className="open"><img src="http://cdn.lou86.com/public/static/phone/image/tongzhi.png"></img> 开盘通知我</button>
                    </div>
                </div>)
                })}

            </div>
            <div className="detall_phone">
                <div className="left">
                    <span className="one">售楼热线：0898-32287843</span>
                    <span className="two">最新开盘、户型及优惠信息、详情请致电咨询</span>
                </div>
                <img src="http://cdn.lou86.com/public/static/home/image/v2.0/tel.gif"></img>
            </div>
            <div className="detail_explain">
                <div className="pad">
                    <div className="title">
                        <span className="left">户型介绍</span>
                        <div className="right">
                            <span>全部户型</span>
                            <img src="http://cdn.lou86.com/public/static/phone/img/icons/right.png"></img>
                        </div>
                    </div>
                    <div className="content">
                        {
                            this.state.house_type.map((value,key)=>{
                                return (<div className="each" key={key}>
                                <img src={value.img}></img>
                                <p className="type">{value.text}<span>在售</span></p>
                                <p className="area">{value.area}</p>
                                <p className="price">{value.price}</p>
                            </div>)
                            })
                        }
                    </div>
                    <div className="call">
                        <div className="left">
                            <img src="http://cdn.lou86.com/public/uploads/zhiye/20190429/f2372ff3e70b89a92e0741994c373716.jpg"></img>
                            <div className="call_con">
                                <p className="name">蔡海东 <span>行业资深顾问</span></p>
                                <p className="num"> 咨询人数 : <span>632</span>人</p>
                            </div>
                        </div><div className="right">
                            <button>户型讲解</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail_adv">
                <div className="pad">
                    <div className="pad_title">
                        <span>楼盘优势</span>
                    </div>
                    <ul style={{ height: this.state.fold }}>
                        <div className="abs"></div>
                        {
                            this.state.house_advantage.map((value,key)=>{
                                return (<li key={key}>
                                    <div className="title">{value.title}</div>
                                    <p>{value.text}</p>
                                </li>)
                            })
                        }
                    </ul>
                    <button onClick={this.fold}>{this.state.fold_text}</button>
                </div>
            </div>
            <div className="detail_join">
                <div className="pad">
                    <div className="content">一线海景精装别墅特惠总价仅270万/套起欲购从速！现来电报名更享尊属优惠，并有全岛免费专车接送看房服务，详情欢迎来电咨询！</div>
                    <div className="abs"><input type="text" placeholder="请输入您的手机号"></input><div></div>
                    </div>
                </div>
            </div>
            <div className="detail_dynamic">
                <div className="pad">
                    <div className="title">
                        <span className="left">楼盘动态</span>
                        <div className="right">
                            <span>查看全部</span>
                            <img src="http://cdn.lou86.com/public/static/phone/img/icons/right.png"></img>
                        </div>
                    </div>
                    <ul>
                        <div className="abs"></div>
                        {
                            this.state.house_dynamic.map((value,key)=>{
                                return (<li key={key} className={value.label==="优惠"?"yellow":""}>
                                    <div className="time"><p className={value.label==="优惠"?"yellow":(value.label==="施工"?"site":"")}>{value.label}</p><span>2019.07.29 11:13</span></div>
                                    <div className="title">{value.title}</div>
                                    <div className="content"><span>{value.text}</span></div>
                                    <div className={value.label==="优惠"?"garden gerden_yellow":(value.label==="施工"?"garden gerden_site":"garden")}></div>
                                </li>)
                            })
                        }
                    </ul>
                    <div className="btn">
                        <button><img src="http://cdn.lou86.com/public/static/phone/image/dingyue.png"></img> 最新动态通知我</button>
                    </div>
                </div>
            </div>
            <div className="detail_real">
                <div className="pad">
                    <div className="left">
                        <img src="http://cdn.lou86.com/public/static/phone/img/video.jpg"></img>
                        <div className="right">
                            <p>视频看房 真实体验</p>
                            <span>深入了解房子面貌，获取真实房源信息！</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>立即领取</button>
                        <span>已有741人领取</span>
                    </div>
                </div>
            </div>
            <div className="detail_ask">
                <div className="pad">
                    <div className="title">
                        <span>买房问大家</span>
                    </div>
                    <ul>{
                        this.state.house_answer.map((value,key)=>{
                            return (<li key={key}>
                            <div className="ask">
                                <img src="http://cdn.lou86.com/public/static/phone/img/icons/question.png"></img>
                                <span>{value.problem}</span>
                            </div>
                            
                            <div className="answer">
                                <div className="left">
                                    <img src={value.head}></img>
                                    <div className="right">
                                        <p className="top">{value.author}<span>{value.babel}</span></p>
                                        <p className="bottom">咨询人数：<span>569</span>次</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <img src="http://cdn.lou86.com/public/static/phone/img/icons/wei.jpg" className="message"></img>
                                    <img src="http://cdn.lou86.com/public/static/phone/img/icons/tel2.gif" className="phone"></img>
                                </div>
                            </div>
                            <div className="content">
                                <img src="http://cdn.lou86.com/public/static/phone/img/icons/answer.png"></img>
                                <div className="des">
                                    <p className="text" style={{height:value.height}}><span style={{height:value.height}}>{value.text}</span></p>
                                    <p className="spread" onClick={this.answer_btn.bind(this,key)}>[展开全文]</p>
                                    <p className="time">{value.time}</p>
                                </div>
                            </div>
                        </li>)})}
                    </ul>
                    <button className="more"><img src="http://cdn.lou86.com/public/static/phone/img/icons/more2.png"></img>查看更多回答</button>
                </div>
            </div>
            <div className="photo">
                <div className="pad">
                    <div className="title">
                        <span className="left">楼盘相册</span>
                        <div className="right">
                            <span>查看全部</span>
                            <img src="http://cdn.lou86.com/public/static/phone/img/icons/right.png"></img>
                        </div>
                    </div>
                    <div className="content">
                        {this.state.house_image.map((value,key)=>{
                            return (<div className="each" key={key}>
                            <img src={value.img}></img>
                            <span>{value.text}</span>
                        </div>)
                        })}
                    </div>
                </div>
            </div>
            <div className="detail_mating">
                <div className="pad">
                    <div className="title">
                        <span>买房问大家</span>
                    </div>
                    <div className="map_all">
                        <div className="map" id="map"></div>
                        <div className="abs">
                            <div className="icon"></div>
                            <div className="text">
                                <span>海南省三亚陵水国际旅游岛先行试验区滨海度假区</span>
                            </div>
                            <div className="right"></div>
                        </div>
                    </div>
                    <div className="sunds">
                        {
                            this.state.mating.map((value, key) => {
                                return (<div className="event" key={key}><img src={this.state.domain + value.img}></img>
                                    <span>{value.text}</span></div>)
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="detail_real">
                <div className="pad">
                    <div className="left">
                        <img src={this.state.domain + "/public/static/phone/img/peitao.jpg"}></img>
                        <div className="right">
                            <p>区域配套</p>
                            <span>获取学区购物等配套信息</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>前往领取</button>
                        <span>已有741人领取</span>
                    </div>
                </div>
            </div>
            <div className="detail_jump">
                <div className="pad">
                    {this.state.son}
                    <div className="nav">
                        {
                            this.state.son_arr.map((value, key) => {
                                if (key == 0) {
                                    return (<div key={key} className={value.cb ? "active first" : "first"} onClick={() => { this.son(true) }}>{value.text}</div>)
                                } else {
                                    return (<div key={key} onClick={() => { this.son(false) }} className={value.cb ? "active" : ""}>{value.text}</div>)
                                }
                            })
                        }
                    </div>
                    <House change={this.state.son}></House>
                </div>
            </div>
            <Footer />
        </div>)
    }
}
export default Detail;





