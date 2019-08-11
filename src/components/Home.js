import React, { } from "react"
import "../scss/home.scss"
import "../css/swiper.min.css"
import Swiper from "swiper"
import axios from "axios"
import loadimg from "../image/loading.gif"
import Footer from "./son/Footer"
import { Link ,Redirect} from "react-router-dom"
import Roll from "./son/Dynamic_roll"
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [],
            navtwo: [],
            activity: [{ title: "http://cdn.lou86.com/public/uploads/slider/20190721/a40f7f82e27a9d8850c4781c385b14fd.jpg" },
            { title: "http://cdn.lou86.com/public/uploads/20190405/6b4efa6c6f9add610303bfb927d7b0fc.jpg" },
            { title: "http://cdn.lou86.com/public/uploads/slider/20190514/e2971599a706b6fc0cc70188ef77c446.jpg" },
            { title: "http://cdn.lou86.com/public/uploads/slider/20190509/c38b63ec6f6fcd5165aa640a75caf076.jpg" },
            { title: "http://cdn.lou86.com/public/uploads/slider/20190601/1d47ae6b9affb0f2a652ec904cadc741.jpg" }],
            acttop: [], actbottom: [], rec: [], find: ["6千以下", "6-7千", "7-8千", "8千-1万", "1万-1.3万", "1.3-1.5万", "1.5-2万", "2万以上"],
            find_type: [],jump:false,
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
        this.btn_math()
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
    }
    componentDidUpdate() {
        this.lazy()
    }
    componentWillUnmount() {
        this.setState = () => { }
    }
    componentWillUnmount(){
        this.state=null
    }
    lazy = (e) => {
        var that = this
        if (this.state.dataswitch) {
            var observer = new IntersectionObserver(function (changes) {
                changes.forEach(function (item, index) {
                    if (item.isIntersecting) {
                        if (item.target.getAttribute('src') === '/static/media/loading.ccf68734.gif') {
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
    btn_math  () {
        var color = ["#48b3e2", "#f07c69", "#5ccc8e", "#52c2c2", "#739bec", "#cb87de"]
        var list = ["海景房", "报销机票", "精装修", "特色别墅", "专车看房", "小户型", "免费接机"]
        var row=[]
        for (var i = 0; i < list.length; i++) {
            var num = Math.floor(Math.random() * color.length)
            row.push({color:color[num],text:list[i]})
        }
        this.setState({find_type:row})
    }
    back=()=>{
        this.setState({jump:true})
    }
    render() {
        if(this.state.jump){
            return <Redirect to="/search"/>
        }
        return (<div>
            <div className="home_header">
                <div className="h3">
                    <img src="http://m.lou86.com/public/static/phone/image/logo.png" />
                </div>
                <div className="input">
                    <div className="search">
                        <div className="left" onClick={this.back}>
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
            <Roll></Roll>
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
            <div className="home_find">
                <div className="title">
                    <span>快捷找房</span>
                </div>
                <div className="area">
                    <div className="start">区域:</div>
                    <span>吉阳区</span>
                    <span>海棠区</span>
                    <span>天涯区</span>
                    <span>崖州区</span>
                </div>
                <div className="price">
                    <div className="start">价格:</div>
                    {
                        this.state.find.map((value, key) => {
                            return (<span key={key}>{value}</span>)
                        })
                    }
                </div>
                <div className="find_type">
                    {
                        this.state.find_type.map((value, key) => {
                            return (<button key={key} style={{color:value.color,border:"1px solid "+value.color}}>{value.text}</button>)
                        })
                    }

                </div>
            </div>
            <div className="rec" ref="kcone">
                <div className="title">
                    <span>新房推荐</span>
                </div>
                {
                    this.state.rec.map((value, key) => {
                        return (<div className="content" key={key} >
                            <div className="img"><img src={value.load} data-src={value.img} ></img>
                                <div className="abs">
                                    <div className="titles">{value.title}</div>
                                    <div className="price">约<span>{value.price}</span>{value.price < 1000 ? "万/套" : "元/㎡"}</div>
                                </div>
                                <div className="label" >在售</div>
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
            <div className="home_more">
                <Link to="/house">查看更多</Link>
            </div>

            <Footer></Footer>
        </div>)
    }
}
export default Home

