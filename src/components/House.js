import React from "react"
import "../scss/house.scss"
import "../css/swiper.min.css"
import Swiper from "swiper"
import axios from "axios"
import Roll from "./son/Dynamic_roll"
import $ from "jquery"
class House extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            localhost: "http://m.lou86.com",
            label: [{ img: "/public/static/phone/img/icons/nav_1.png", title: "全部楼盘" },
            { img: "/public/static/phone/img/icons/nav_2.png", title: "活动专区" },
            { img: "/public/static/phone/img/icons/nav_3.png", title: "航怕看房" },
            { img: "/public/static/phone/img/icons/nav_4.png", title: "特价房" }],
            swiper: [], swipers: true,
            select: [{ title: "区域" }, { title: "价格" }, { title: "户型" }, { title: "更多" }],
            pile: [], pileall: null, pilemore: false, pileclose: 4, piledis: "flex", house: [], 
            house_page: 2, adv: [],hot: [], scroll: [], scroll_sw: true, scroll_close: "flex", 
            scroll_text:"正在加载",lazy: true, lazy_length: 0, scroll_top: 0
        }
    }
    componentWillMount() {
        var list = this.state.label
        for (var li of list) {
            li.img = this.state.localhost + li.img
        }
        var select = this.state.select
        for (var i = 0; i < select.length; i++) {
            select[i].img = "http://127.0.0.1:5050/house/icon/arr_down_gray.png"
            select[i].color = "#333"
            select[i].cb = false
        }
        select[0].img = "http://127.0.0.1:5050/house/icon/arr_down_select.png"
        select[0].color = "#4da635"
        select[0].cb = true
        axios.get("http://127.0.0.1:5050/details/house_data?label=house_swiper").then(res => {
            this.setState({ swiper: res.data.reg })
        })
        axios.get("http://127.0.0.1:5050/details/house_data?label=select").then(res => {
            var list = res.data
            for (var li of list.more) {
                for (var l of li.reg) {
                    l.cb = false
                }
            }
            for (var i = 0; i < list.more.length; i++) {
                for (var j = 0; j < li.reg.length; j++) {
                    if (j === 0) {
                        list.more[i].reg[j].cb = true
                    } else list.more[i].reg[j].cb = false
                }
            }
            this.setState({ pile: res.data.area, pileall: res.data })
        })
        axios.get("http://127.0.0.1:5050/details/house_data?label=house_hot").then(res => {
            this.setState({ hot: res.data.reg })
        })
    }
    componentDidMount(option) {
        // 加载更多触发条件
        var that = this
        var inter = new IntersectionObserver(
            function (element) {
                if (element[0].isIntersecting) {
                    that.house_scroll()
                }
            }
        )
        inter.observe(document.querySelector(".scrollfooter"))
        axios.get("http://127.0.0.1:5050/details/house_data?label=adv").then(res => {
            this.setState({ adv: res.data.reg })
        })
        if (this.state.swiper.length > 0) {
            if (this.state.swipers) {
                var mySwiper = new Swiper('.swiper-container', {
                    // direction: 'vertical', 
                    // loop: true, 
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    autoplay: {
                        stopOnLastSlide: true
                    }
                })
                this.setState({ swipers: false })
            }
        }
        this.scroll_exce()
        this.house_data(true)
    }
    componentDidUpdate(a,b) {
        // console.log(a,b)
    }
    house_data(init, page) {
        if (init) {
            get_data(init,1)
            get_data(init,2)
        } else {
            var page=this.state.house_page
            page=page+1
            this.setState({house_page:page})
            get_data(init,page)
        }
        var that = this
        function get_data(init,page){
            axios.get("http://127.0.0.1:5050/details/house_list?page=" + page).then(res => {
                if (res.data.code === 1) {
                    for(var li of res.data.reg){
                        li.virtual="/static/media/loading.ccf68734.gif"
                    }
                    if(init){
                        var list = that.state.house
                        list = list.concat(res.data.reg)
                        var num=that.state.lazy_length
                        num=num+1
                        that.setState({ house: list,lazy_length:num})
                        if(num===2){
                            var row=[]
                            for(var i=9;i<=11;i++){
                                row.push(list[i])
                            }
                            that.setState({ scroll: row,lazy_length:12})
                            that.lazy(true)
                        }
                    }else{
                        var list = that.state.scroll
                        list = list.concat(res.data.reg)
                        that.setState({ scroll: list,scroll_sw: true  })
                        that.lazy(false)
                    }
                } else {
                    that.setState({ scroll_sw: false ,scroll_close:"none",scroll_text:"没有更多了"})
                }
            })
        }
    }
    btn_select = (e) => {
        var list = this.state.select
        if (e == 0) {
            var num = this.state.pileall.area
        } else if (e == 1) {
            var num = this.state.pileall.price
        } else if (e == 2) {
            var num = this.state.pileall.type
        } else if (e == 3) {
            var num = this.state.pileall.more
            var more = true
        }
        for (var li of list) {
            li.color = "#333"
            li.img = "http://127.0.0.1:5050/house/icon/arr_down_gray.png"
            li.cb = false
        }
        if (this.state.pileclose == e) {
            var n = 4
            var display = "none"

        } else {
            var n = e
            var display = "flex"
            list[e].color = "#4da635"
            list[e].img = "http://127.0.0.1:5050/house/icon/arr_down_select.png"
            list[e].cb = true
        }
        if (e < 3) {
            var more = false
        }
        this.setState({ select: list, pile: num, pilemore: more, pileclose: n, piledis: display })
    }
    son_btn(key, keys) {
        var list = this.state.pile
        for (var li of list[key].reg) {
            li.cb = false
        }
        list[key].reg[keys].cb = true
        this.setState({ pile: list })
    }
    house_scroll() {
        if (this.state.scroll_sw) {
            this.setState({ scroll_sw: false })// 立即关闭，防止多次触发
            setTimeout(() => {
                this.house_data(false)
            }, 1000)
        }
    }
    lazy(boolean, ele) {
        var that = this
        if (boolean) {
            lazy_start(boolean)
        } else {
            lazy_start(boolean)
        }
        function lazy_start(boolean){
            var list=that.state.house
            var scroll=that.state.scroll
            var inter = new IntersectionObserver( (changes)=> {
                for (var it of changes) {
                    if (it.isIntersecting) {
                        if (it.target.getAttribute("src") === "/static/media/loading.ccf68734.gif") {
                            var id=parseInt(it.target.getAttribute("data-id"))
                            if(id<9){
                                list[id].virtual=list[id].img
                                setTimeout(() => {
                                    that.setState({house:list})
                                }, 1000)
                            }else{
                                if(id>8 && id<12){
                                    list[id].virtual=list[id].img
                                     scroll=[]
                                    for(var i=9;i<12;i++){
                                        scroll.push(list[i])
                                    }
                                }else{
                                    var j=id-12+3
                                    scroll[j].virtual=scroll[j].img
                                }
                                setTimeout(()=>{
                                    that.setState({scroll:scroll})
                                },1000)
                            }
                        }
                    }
                }
            })
            var item = document.querySelectorAll(".indes>.top>.img>img")
            if(boolean){
                var num=12
                var start=0
            }else{
                var start=that.state.lazy_length
                var num=item.length
                that.setState({lazy_length:num})
            }
            for (var i=start;i<num;i++) {
                item[i].setAttribute("data-id",i)
                inter.observe(item[i])
            }
        }
    }
    scroll_exce() {
        var exce = new IntersectionObserver((ex) => {
            if (ex[0].isIntersecting) {
                var num = 0
            } else {
                var num = 1
            }
            this.setState({ scroll_top: num })
        })
        exce.observe(this.refs.exce)
    }
    scroll_top(e) {
        e.preventDefault()
        $("html,body").animate({ scrollTop: "0px" })
    }
    render() {
        return (<div className="house_main">
            <div className="house_footer">
                <div className="fav">
                    <img src="http://m.lou86.com/public/static/phone/img/icons/liwu.png"></img>
                    <span>优惠</span>
                </div>
                <div className="left">
                    <button><img src="http://m.lou86.com/public/static/phone/img/icons/zixun.png"></img>
                        <span>在线咨询</span>
                    </button>

                </div>
                <div className="right">
                    <button><img src="http://m.lou86.com/public/static/phone/img/icons/tel.png"></img>
                        <span>免费电话</span>
                    </button>
                </div>
            </div>
            <div className="house_input" name="top" ref="exce">
                <div className="content">
                    <input></input>
                    <img src="http://127.0.0.1:5050/house/icon/search.png"></img>
                </div>
            </div>
            <div className="hydrid">
                <div className="infinite" >
                    <div className="swiper-container" >
                        <div className="swiper-wrapper">
                            {
                                this.state.swiper.map((value, key) => {
                                    return (<div className="swiper-slide" key={key}><img src={value}></img></div>)
                                })
                            }
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>
                <div className="label">
                    {this.state.label.map((value, key) => {
                        return (<div key={key}>
                            <img src={value.img}></img>
                            <span>{value.title}</span>
                        </div>)
                    })}
                </div>
                <Roll></Roll>
            </div>
            <div className="hr"></div>
            <div className="select">
                {this.state.select.map((value, key) => {
                    return (<div onClick={() => { this.btn_select(key) }} key={key} className={value.cb ? "select_active" : "select"}>
                        <span style={{ color: value.color }}>{value.title}</span>
                        <img src={value.img} className={value.cb ? "img_active" : ""}></img></div>)
                })}
            </div>
            <div className="pile" style={{ display: this.state.piledis }}>
                {
                    this.state.pile.map((value, key) => {
                        if (!this.state.pilemore) {
                            var element = <div className="common" key={key}><span>{value.text}</span></div>
                        } else {
                            var element = <div className="more" key={key}>
                                <div className="title"><span>{value.title}</span></div>
                                <div className="content">
                                    {
                                        value.reg.map((values, keys) => {
                                            return (<div className={values.cb ? "son son_active" : "son"} key={keys} onClick={this.son_btn.bind(this, key, keys)}><span>{values.text}</span></div>)
                                        })
                                    }
                                </div></div>
                        }
                        return (element)
                    })
                }
                {
                    this.state.pilemore ? <div className="btn"><button>确定</button></div> : ""
                }
            </div>
            <div className="hr"></div>
            <div className="inde">
                {
                    this.state.house.map((value, key) => {
                        if (key < 3) return (<div className="indes" key={key}>
                            <div className="top">
                                <div className="img">
                                    <img src={value.virtual} data-src={value.img}></img>
                                    <div className={value.play===1?"play play_act":"play"} >
                                        <img src="http://m.lou86.com/public/static/phone/image/play-circle.png"></img>
                                    </div>
                                    <span className={value.activity===1?"activity activity_act":"activity"}>折扣</span>
                                </div>
                                <div className="info">
                                    <div className="title">{value.title}</div>
                                    <div className="price">{value.price<1000?value.price+"万/套":value.price+"元/㎡"}</div>
                                    <div className="address">{value.ads}</div>
                                    <div className="room">{value.room}</div>
                                </div>
                                <div className="call">
                                    <img src="http://cdn.lou86.com/public/static/phone/img/icons/tel.gif"></img>
                                    <img className={value.fav_img===1?"red red_active":"red"} src="http://m.lou86.com/public/static/phone/img/icons/hot.jpg"></img>
                                </div>
                            </div>
                            <div className="mid">
                                <div className="infor"><span>{value.time}</span></div>
                                {
                                    value.label.map((values, keys) => {
                                        return (<span className="dis" key={keys}>{values.text}</span>)
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
            </div>
            <div className="adv">
                <div className="describe">
                    <img className="abs" src="http://cdn.lou86.com/public/static/home/image/pinpai/p_6.png"></img>
                    <span>购房优选 知名房地产企业-房地产开发商品牌</span>
                </div>
                <div className="brand">
                    {
                        this.state.adv.map((value, key) => {
                            return (<img src={value.img} key={key}></img>)
                        })
                    }
                </div>
                <div className="sell">
                    <div className="title">
                        <span className="img">楼盘导购</span><span>海南臻园打造运动美宅目前洋房在售中</span>
                    </div>
                    <div className="threeimg">
                        <img src="http://cdn.lou86.com/Uploads/newsimg/image/20190605/1559700665935598.png"></img>
                        <img src="http://cdn.lou86.com/Uploads/newsimg/image/20190605/1559700665175383.png"></img>
                        <img src="http://cdn.lou86.com/Uploads/newsimg/image/20190605/1559700665580343.png"></img>
                    </div>
                </div>
            </div>
            <div className="three">
                {
                    this.state.house.map((value, key) => {
                        if (key > 2 && key < 6) return (<div className="indes" key={key}>
                            <div className="top">
                                {/* <img src={value.img} data-src={value.img} data-id={key}></img> */}
                                <div className="img">
                                    <img src={value.virtual} data-src={value.img} ></img>
                                    <div className={value.play===1?"play play_act":"play"} >
                                        <img src="http://m.lou86.com/public/static/phone/image/play-circle.png"></img>
                                    </div>
                                    <span className={value.activity===1?"activity activity_act":"activity"}>折扣</span>
                                </div>
                                <div className="info">
                                    <div className="title">{value.title}</div>
                                    <div className="price">{value.price<1000?value.price+"万/套":value.price+"元/㎡"}</div>
                                    <div className="address">{value.ads}</div>
                                    <div className="room">{value.room}</div>
                                </div>
                                <div className="call">
                                    <img src="http://cdn.lou86.com/public/static/phone/img/icons/tel.gif"></img>
                                    <img className={value.red_active===1?"red red_active":"red"} src="http://m.lou86.com/public/static/phone/img/icons/hot.jpg"></img>
                                </div>
                            </div>
                            <div className="mid">
                                <div className="infor"><span>{value.time}</span></div>
                                {
                                    value.label.map((values, keys) => {
                                        return (<span className="dis" key={keys}>{values.text}</span>)
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
            </div>
            <div className="hot">
                <div className="hot_title"><span>三亚热搜榜</span></div>
                <div className="son">
                    {
                        this.state.hot.map((value, key) => {
                            return (<div className="content" key={key}>
                                <div className="img" >
                                    <img className="main_img" src={value.img}></img>
                                    <img className="top" src="http://cdn.lou86.com/public/static/phone/image/tp3.png"></img>
                                    <div className="abs">
                                        <span>{value.time}</span>
                                    </div>
                                </div>
                                <span className="title">{value.title}</span>
                                <span className="price">{value.price}</span>
                            </div>)
                        })
                    }
                </div>
            </div>
            <div className="three">
                {
                    this.state.house.map((value, key) => {
                        if (key > 5 && key < 9) return (<div className="indes" key={key}>
                            <div className="top">
                                {/* <img src={value.img} data-src={value.img} data-id={key}></img> */}
                                <div className="img">
                                    <img src={value.virtual} data-src={value.img} ></img>
                                    <div className={value.play===1?"play play_act":"play"} >
                                        <img src="http://m.lou86.com/public/static/phone/image/play-circle.png"></img>
                                    </div>
                                    <span className={value.activity===1?"activity activity_act":"activity"}>折扣</span>
                                </div>
                                <div className="info">
                                    <div className="title">{value.title}</div>
                                    <div className="price">{value.price<1000?value.price+"万/套":value.price+"元/㎡"}</div>
                                    <div className="address">{value.ads}</div>
                                    <div className="room">{value.room}</div>
                                </div>
                                <div className="call">
                                    <img src="http://cdn.lou86.com/public/static/phone/img/icons/tel.gif"></img>
                                    <img className={value.fav_img===1?"red red_active":"red"} src="http://m.lou86.com/public/static/phone/img/icons/hot.jpg"></img>
                                </div>
                            </div>
                            <div className="mid">
                                <div className="infor"><span>{value.time}</span></div>
                                {
                                    value.label.map((values, keys) => {
                                        return (<span className="dis" key={keys}>{values.text}</span>)
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
            </div>
            <div className="house_see">
                <div className="title"><span>陵水怡海湾别墅主力户型为80-285㎡</span></div>
                <div className="info">
                    <i>买房必看</i><span className="day">22天前</span>
                    <img src="http://cdn.lou86.com/public/static/phone/image/eye.png"></img>
                    <span className="time">66</span>
                </div>
                <div className="content">
                    <img src="http://cdn.lou86.com/Uploads/newsimg/image/20190529/1559101552485734.jpg"></img>
                    <img src="http://cdn.lou86.com/Uploads/newsimg/image/20190529/1559101567306326.jpg"></img>
                    <img src="http://cdn.lou86.com/Uploads/newsimg/image/20190529/1559101573471624.jpg"></img>
                </div>
            </div>
            <div className="house_scroll">
                {
                    this.state.scroll.map((value, key) => {
                         return (<div className="indes" key={key}>
                            <div className="top">
                                {/* <img src={value.img} data-src={value.img} data-id={key}></img> */}
                                <div className="img">
                                    <img src={value.virtual} data-src={value.img} ></img>
                                    <div className={value.play===1?"play play_act":"play"} >
                                        <img src="http://m.lou86.com/public/static/phone/image/play-circle.png"></img>
                                    </div>
                                    <span className={value.activity===1?"activity activity_act":"activity"}>折扣</span>
                                </div>
                                <div className="info">
                                    <div className="title">{value.title}</div>
                                    <div className="price">{value.price<1000?value.price+"万/套":value.price+"元/㎡"}</div>
                                    <div className="address">{value.ads}</div>
                                    <div className="room">{value.room}</div>
                                </div>
                                <div className="call">
                                    <img src="http://cdn.lou86.com/public/static/phone/img/icons/tel.gif"></img>
                                    <img className={value.fav_img===1?"red red_active":"red"} src="http://m.lou86.com/public/static/phone/img/icons/hot.jpg"></img>
                                </div>
                            </div>
                            <div className="mid">
                                <div className="infor"><span>{value.time}</span></div>
                                {
                                    value.label.map((values, keys) => {
                                        return (<span className="dis" key={keys}>{values.text}</span>)
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
            </div>
            <a className="house_top" onClick={this.scroll_top.bind(this)} style={{ opacity: this.state.scroll_top }}>
                <img src="http://cdn.lou86.com/public/static/phone/image/icons/new-top.png"></img>
            </a>
            <div className="scrollfooter">
                <div className="con">
                    <div className="loader" style={{ display: this.state.scroll_close }}></div><span>{this.state.scroll_text}</span>
                </div>
            </div>
        </div>)
    }
}
export default House







