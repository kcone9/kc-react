import React,{Component} from "react"
import "../son_scss/footer.scss"
class Footer extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div className="footer_head">
            <div className="nav">
                <div className="four">网站地图</div>|
                <div className="four">手机版</div>|
                <div className="four">电脑版</div>|
                <div className="four">关于我们</div>
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


