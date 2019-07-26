import React from "react"
import "../scss/house.scss"
import axios from "axios"
class House extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            localhost: "http://m.lou86.com",
            label: [{ img: "/public/static/phone/img/icons/nav_1.png", title: "全部楼盘" },
            { img: "/public/static/phone/img/icons/nav_2.png", title: "活动专区" },
            { img: "/public/static/phone/img/icons/nav_3.png", title: "航怕看房" },
            { img: "/public/static/phone/img/icons/nav_4.png", title: "特价房" }],
            roll:[]
        }
    }
    componentWillMount() {
        var list = this.state.label
        for (var li of list) {
            li.img = this.state.localhost + li.img
        }
        axios.get("http://127.0.0.1:5050/details/house_data?label=house_news").then(res=>{
            this.setState({roll:res.data.reg})
        })
    }
    componentDidMount(option) {
        // console.log(option)
    }
    render() {
        return (<div>
            <div className="input">
                <div className="content">
                    <input></input>
                    <img src="http://127.0.0.1:5050/house/icon/search.png"></img>
                </div>
            </div>
            <div className="hydrid">
                <div className="infinite"></div>
                <div className="label">
                    {this.state.label.map((value, key) => {
                        return (<div key={key}>
                            <img src={value.img}></img>
                            <span>{value.title}</span>
                        </div>)
                    })}
                </div>
                <div className="cher">
                    <div><img src="http://m.lou86.com/public/static/phone/image/icons/libs.png"></img>
                        <img src="http://m.lou86.com/public/static/phone/image/icons/libs-lp.png"></img></div>
                    <div className="walk">
                        <ul>
                            {
                                this.state.roll.map((value,key)=>{
                                    return (<li key={key}>{value}</li>)
                                })
                            }
                        </ul>
                    </div>
                    <button>提醒动态</button>
                </div>
            </div>

        </div>)
    }
}
export default House







