import React, { } from "react"
import "../scss/home.scss"
import "../css/swiper.min.css"
import Swiper from "swiper"
import axios from "axios"
import loadimg from "../image/loading.gif"
import {Link} from "react-router-dom"
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [],
            navtwo: [],
            news: [{ title: "海口市郊列车开通运行 雅居乐金沙湾业主们出行更加便利了", mar: 0 },
            { title: "融创精彩天地灵动百变户型尽显归家礼仪 2019年12月31日交房", mar: 0 },
            { title: "融创无忌海交通区位发展优越 均价14000元/平", mar: 0 },
            { title: "富力悦海湾别墅全系度假配套打造 全款94折分期96折", mar: 0 },
            { title: "融创观澜湖公园壹号内部打造了3万㎡园林景观", mar: 0 }],
            newmargin: 0,
            newtransition: "all 1s",
            newsnum: 0,
            activity: [{ title: "http://cdn.lou86.com/public/uploads/slider/20190721/a40f7f82e27a9d8850c4781c385b14fd.jpg" },
            { title: "http://cdn.lou86.com/public/uploads/20190405/6b4efa6c6f9add610303bfb927d7b0fc.jpg" },
            { title: "http://cdn.lou86.com/public/uploads/slider/20190514/e2971599a706b6fc0cc70188ef77c446.jpg" },
            { title: "http://cdn.lou86.com/public/uploads/slider/20190509/c38b63ec6f6fcd5165aa640a75caf076.jpg" },
            { title: "http://cdn.lou86.com/public/uploads/slider/20190601/1d47ae6b9affb0f2a652ec904cadc741.jpg" }],
            acttop: [],
            actbottom: [],
            rec: [],
            imgnum: 0,
            dataswitch: false
        }
    }
    componentWillMount() {
        axios.get("http://127.0.0.1:5050/details/house_nav").then(res => {
            var list = res.data.reg
            var nav = []
            nav = list.splice(8, list.length)
            list = list.splice(0, 8)
            this.setState({ nav: list, navtwo: nav })
        })
        axios.get("http://127.0.0.1:5050/details/house_data?label=given").then(res => {
            var top = res.data.reg.splice(0, 3)
            var bottom = res.data.reg
            this.setState({
                acttop: top,
                actbottom: bottom
            })
        })
        axios.get("http://127.0.0.1:5050/details/house_data?label=rec").then(res => {
            var list = res.data.reg
            for (var li of list) {
                li.load = loadimg
            }
            this.setState({ rec: list, dataswitch: true })
        })
    }
    componentDidMount = () => {
        var mySwiper = new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            //loop: true, // 循环模式选项
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 5000
            }
        })
        this.autonews()
    }
    componentDidUpdate() {
        this.lazy()
    }
    autonews = () => {
        setInterval(() => {
            var num = this.state.newmargin
            var times = this.state.newsnum
            var list = this.state.news
            if (num == 0) {
                num = -2.2
                times = 0
                var transition = "all 1s"
            } else {
                num = -2.2 * (times + 1)
                times = times + 1
            }
            if (times == list.length) {
                num = 0
                times = 0
                var transition = "none"
            }
            this.setState({
                newsnum: times,
                newmargin: num,
                newtransition: transition,
                news: list
            })
        }, 6000)
    }
    lazy = (e) => {
        var that = this
        if (this.state.dataswitch) {
            var observer = new IntersectionObserver(function (changes) {
                changes.forEach(function (item, index) {
                    if (item.isIntersecting) {
                        if (item.target.getAttribute('src') == '/static/media/loading.ccf68734.gif') {
                            setTimeout(() => {
                                item.target.src = item.target.getAttribute('data-src')
                            }, 500)

                        }
                    }
                });
            });
            function addObserver() {
                var listItems = document.querySelectorAll('.rec>.content>.img>img');
                if (listItems != []) {
                    listItems.forEach(function (item) {
                        observer.observe(item);
                    });
                    that.setState({ dataswitch: false })
                } else {
                }
            }
            addObserver();
        }
    }
    render() {

        return (<div>
            <div className="header">
                <div className="h3">
                    <img src="http://m.lou86.com/public/static/phone/image/logo.png" />
                </div>
                <div className="input">
                    <div className="search">
                        <div className="left">
                            <span>海口</span><img src="http://127.0.0.1:5050/house/icon/arr_down.png"></img>
                            <div className="int"></div>
                        </div>
                        <div className="right"><input placeholder="请输入楼盘名称" />
                            <img src="http://127.0.0.1:5050/house/icon/search.png"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav" >
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            {
                                this.state.nav.map((value, key) => {
                                    return (<div className="nav_con" key={key}>
                                        <img src={value.img}></img>
                                        <span>{value.title}</span>
                                    </div>)
                                })
                            }
                        </div>
                        <div className="swiper-slide">
                            {
                                this.state.navtwo.map((value, key) => {
                                    return (<div className="nav_con" key={key}>
                                        <img src={value.img}></img>
                                        <span>{value.title}</span>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
            <div className="news">
                <img src="http://m.lou86.com/public/static/phone/image/lou86t_07.png"></img>
                <div className="content">
                    <ul className="container" id="myul" style={{ marginTop: this.state.newmargin + "rem", transition: this.state.newtransition }}>
                        {
                            this.state.news.map((value, key) => {
                                return <li key={key}><span style={{ marginLeft: value.mar + "px" }}>{value.title}</span></li>
                            })
                        }
                    </ul>
                </div>
                <button>动态提醒</button>
            </div>
            <div className="activity">
                <div className="title">
                    <span>热门活动</span>
                </div>
                <div className="content">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">

                            {
                                this.state.activity.map((value, key) => {
                                    return (<div className="swiper-slide" key={key}><img src={value.title}></img></div>)

                                })
                            }
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>
            </div>
            <div className="given">
                <div className="title">
                    <span>买房优选</span>
                </div>
                <div className="content">
                    <div className="top">
                        {
                            this.state.acttop.map((value, key) => {
                                return (<div className="three" key={key}>
                                    <img src={value.img}></img>
                                    <p>{value.title}</p>
                                    <p>{value.titles}</p>
                                </div>)
                            })
                        }

                    </div>
                    <div className="bottom">
                        {
                            this.state.actbottom.map((value, key) => {
                                return (<div className="flat" key={key}>
                                    <div className="text"><span>{value.title}</span><span>{value.titles}</span></div>
                                    <img src={value.img}></img>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="rec" id="rec" ref="kcone">
                <div className="title">
                    <span>新房推荐</span>
                </div>
                {
                    this.state.rec.map((value, key) => {
                        return (<div className="content" key={key} >
                            <div className="img"><img src={value.load} data-src={value.img} ref={"img" + key}></img>
                                <div className="abs">
                                    <div className="titles">{value.title}</div>
                                    <div className="price">约<span>{value.price}</span>{value.price < 1000 ? "万/套" : "元/㎡"}</div>
                                </div>
                            </div>
                            <div className="intro">
                                <div className="left"><span>{value.letter}</span></div>
                                <button>获取优惠</button>
                            </div>
                            <div className="address">
                                <div className="left"><span>{value.site}</span></div>
                                <button>电话咨询</button>
                            </div>
                        </div>)
                    })
                }
            </div>
            <Link to="/house">查看更多</Link>
        </div>)
    }
}
export default Home

