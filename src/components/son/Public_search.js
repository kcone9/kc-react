import React, { Component } from "react"
import "../son_scss/footer.scss"
class Public_search extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        return (<div className="public_search">
            <div className="pad">
                <input placeholder={this.props.text?this.props.text:"输入搜索内容"}></input><div className="right"><span></span><img src="http://127.0.0.1:5050/house/icon/search.png"></img></div>
            </div>
        </div>)
    }
}
export default Public_search