import React,{Component} from "react"
import "../scss/search.scss"
class Bighouse extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (<div className="bighouse_total">
            <div className="header">
                <img src="http://m.lou86.com/public/static/phone/image/icons/ico-left.png"></img>
                <span>大楼盘列表</span>
                <p></p>
            </div>
        </div>)
    }
}
export default Bighouse



