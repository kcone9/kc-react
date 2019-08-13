import React,{Component} from "react"
import "../son_scss/footer.scss"
import {Redirect,Link} from "react-router-dom"
class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            map_off:false
        }
    }
    btn(){
        // this.setState({map_off:true})
        console.log(233)
    }
    render(){
        if(this.state.map_off){
            return (<Redirect to="/map"></Redirect>)
        }
        return (<div className="footer_head">
            <div className="nav">
                <div className="four"><Link to="/map">网站地图</Link></div>|
                <div className="four"><Link to="/map">手机版</Link></div>|
                <div className="four"><Link to="">电脑版</Link></div>|
                <div className="four"><Link to="">关于我们</Link></div>
            </div>
            <div className="footer_down">
                <span className="company">寻客猫</span>
                <span className="domain">xunkemao.com</span>
                <span className="per">网站本案/许可证号：琼ICP备16027625号</span>
            </div>
        </div>)
    }
}
export default Footer;


