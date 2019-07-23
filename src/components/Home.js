import React, { } from "react"
import "../scss/home.scss"
import "../css/swiper.min.css"
import Swiper from "swiper"
import axios from "axios"
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [],
            navtwo: [],
            news: ["海口市郊列车开通运行 雅居乐金沙湾业主们出行更加便利了",
                "融创精彩天地灵动百变户型尽显归家礼仪 2019年12月31日交房",
                "融创无忌海交通区位发展优越 均价14000元/平", 
                "富力悦海湾别墅全系度假配套打造 全款94折分期96折",
                "融创观澜湖公园壹号内部打造了3万㎡园林景观"]
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
    }
    componentDidMount() {
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
    render() {
        var autonews = () => {
            
        }
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
                    <ul className="container">
                        {
                            this.state.news.map((value,key)=>{
                                return <li key={key}><span>{value}</span></li>
                            })
                        }
                        
                    </ul>
                </div>
                <button>动态提醒</button>
            </div>
        </div>)
    }
}
export default Home

