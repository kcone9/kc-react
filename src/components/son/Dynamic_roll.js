import React,{Component} from "react"
import "../son_scss/footer.scss"
import axios from "axios"
class Dynamic_roll extends React.Component {
    constructor(props){
        super(props)
        this.state={
            roll: [],top: 0, topnum: 0, toptrans: "all 5s"
        }
    }
    componentWillMount(){
        axios.get("http://127.0.0.1:5050/details/house_data?label=house_news").then(res => {
            this.setState({ roll: res.data.reg })
        })
    }
    componentDidMount(){
        this.margin()
    }
    margin() {
        setInterval(() => {
            var n = this.state.roll.length
            var topnum = this.state.topnum
            if (topnum == 0) {
                var top = -1 * 2.8
                topnum = topnum + 1
                this.setState({ toptrans: "all 2s" })
            } else if (topnum < n - 1) {
                topnum = topnum + 1
                var top = -(topnum) * 2.8
            } else if (topnum == n - 1) {
                var top = 0
                topnum = 0
                this.setState({ toptrans: "none" })
            }
            this.setState({ top: top, topnum: topnum })
        }, 5000)
    }
    render(){
        return (<div className="dynamic_roll">
            <div className="cher">
                    <div><img src="http://m.lou86.com/public/static/phone/image/icons/libs.png"></img>
                        <img src="http://m.lou86.com/public/static/phone/image/icons/libs-lp.png"></img></div>
                    <div className="walk">
                        <ul style={{ marginTop: this.state.top + "rem", transition: this.state.toptrans }}>
                            {
                                this.state.roll.map((value, key) => {
                                    return (<li key={key}>{value}</li>)
                                })
                            }
                        </ul>
                    </div>
                    <button>提醒动态</button>
                </div>
                <div className="header">
                    
                </div>
        </div>)
    }
}
export default Dynamic_roll
