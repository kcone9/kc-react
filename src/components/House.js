import React from "react"
import "../scss/house.scss"
import "../css/swiper.min.css"
import Swiper from "swiper"
import axios from "axios"
import Roll from "./son/Dynamic_roll"
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
            pile: [], pileall: null, pilemore: false, pileclose: 4, piledis: "flex", house: [], adv: [],
            hot: [], scroll: [], scroll_sw: true, scroll_close: "flex", lazy: true
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
        }
        select[0].img = "http://127.0.0.1:5050/house/icon/arr_down_select.png"
        select[0].color = "#4da635"
        var house = []
        for (var i = 0; i < 3; i++) {
            house.push({
                img: "http://cdn.lou86.com/public/uploads/2017-09/25/336662588aeca666a61af52cc51d93d8.jpg",
                load: "/static/media/loading.ccf68734.gif", title: "富力湾", price: 19888, ads: "海南-三亚", room: "1室~3室   55~121㎡",
                time: "14小时前有人咨询", label: ["品牌地产", "海景房", "报销机票"], conpon: "交2万享10万"
            })
        }
        this.setState({ house: house })
        axios.get("http://127.0.0.1:5050/details/house_data?label=house_swiper").then(res => {
            this.setState({ swiper: res.data.reg })
        })
        axios.get("http://127.0.0.1:5050/details/house_data?label=select").then(res => {
            this.setState({ pile: res.data.area, pileall: res.data })
        })
        axios.get("http://127.0.0.1:5050/details/house_data?label=adv").then(res => {
            this.setState({ adv: res.data.reg })
        })
        axios.get("http://127.0.0.1:5050/details/house_data?label=house_hot").then(res => {
            this.setState({ hot: res.data.reg })
        })
    }
    componentDidMount(option) {
        this.lazy()
        var that = this
        var inter = new IntersectionObserver(
            function (element) {
                if (element[0].isIntersecting) {
                    that.house_scroll()
                }
            }
        )
        inter.observe(document.querySelector(".scrollfooter"))
    }
    componentDidUpdate() {
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
        }
        if (this.state.pileclose == e) {
            var n = 4
            var display = "none"

        } else {
            var n = e
            var display = "flex"
            list[e].color = "#4da635"
            list[e].img = "http://127.0.0.1:5050/house/icon/arr_down_select.png"
        }
        if (e < 3) {
            var more = false
        }
        this.setState({ select: list, pile: num, pilemore: more, pileclose: n, piledis: display })
    }
    house_scroll() {
        // var that=this
        var house = this.state.house
        var list = this.state.scroll
        list = house.concat(list)
        if (this.state.scroll_sw) {
            this.setState({ scroll_sw: false })// 立即关闭，防止多次触发
            setTimeout(() => {
                // 数据加载完毕再让其开启，数据到底让其关闭,关闭加载窗 scroll_close:none
                this.setState({ scroll: list, scroll_sw: true })
                this.lazy()
            }, 1000)
        }
    }
    lazy() {
        var that = this
        var inter = new IntersectionObserver(function (changes) {
            for (var ch of changes) {
                if (ch.isIntersecting) {
                    if (ch.target.getAttribute("src") === "/static/media/loading.ccf68734.gif") {
                        setTimeout(() => {
                            ch.target.src = ch.target.getAttribute("data-src")

                        }, 300)
                    }

                }
            }
        })
        function addelement() {
            var item = document.querySelectorAll(".indes>.top>img")
            for (var it of item) {
                inter.observe(it)
            }
        }
        addelement()
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
            <div className="house_input">
                <div className="content">
                    <input></input>
                    <img src="http://127.0.0.1:5050/house/icon/search.png"></img>
                </div>
            </div>
            <div className="hydrid">
                <div className="infinite">
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
                    return (<div onClick={() => { this.btn_select(key) }} key={key}><span style={{ color: value.color }}>{value.title}</span><img src={value.img}></img></div>)
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
                                            return (<div className="son" key={keys}><span >{values.text}</span></div>)
                                        })
                                    }
                                </div></div>
                        }
                        return (element)
                    })
                }
            </div>
            <div className="hr"></div>
            <div className="inde">
                {
                    this.state.house.map((value, key) => {
                        return (<div className="indes" key={key}>
                            <div className="top">
                                <img src={value.load} data-src={value.img} data-id={key}></img>
                                <div className="info">
                                    <div className="title">{value.title}</div>
                                    <div className="price">{value.price}</div>
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
                        return (<div className="indes" key={key}>
                            <div className="top">
                                <img src={value.load} data-src={value.img} data-id={key}></img>
                                <div className="info">
                                    <div className="title">{value.title}</div>
                                    <div className="price">{value.price}</div>
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
                        return (<div className="indes" key={key}>
                            <div className="top">
                                <img src={value.load} data-src={value.img} data-id={key}></img>
                                <div className="info">
                                    <div className="title">{value.title}</div>
                                    <div className="price">{value.price}</div>
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
                                <img src={value.load} data-src={value.img} data-id={key}></img>
                                <div className="info">
                                    <div className="title">{value.title}</div>
                                    <div className="price">{value.price}</div>
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
            </div>
            <div className="scrollfooter" style={{ display: this.state.scroll_close }}>
                <div className="con">
                    <div className="loader"></div><span>正在加载</span>
                </div>
            </div>
        </div>)
    }
}
export default House







