import React, { Component } from "react"
class Type extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [{ text: "全部", cb: false, content: [] },
            {
                text: "二居室", cb: false, content: [
                    { img: "http://cdn.lou86.com/public/uploads/20190417/ef704a465c49f17c0ff57f87cf392064.jpg", type: "别墅", name: "2室1厅1卫1厨", area: "80m²", mold: "C户型下叠", price: "约270万/套" }]
            },
            {
                text: "三居室", cb: false, content: [{ img: "http://cdn.lou86.com/public/uploads/20190417/ef704a465c49f17c0ff57f87cf392064.jpg", type: "别墅", name: "2室1厅1卫1厨", area: "80m²", mold: "C户型下叠", price: "约270万/套" },
                { img: "http://cdn.lou86.com/public/uploads/20190417/ef704a465c49f17c0ff57f87cf392064.jpg", type: "别墅", name: "2室1厅1卫1厨", area: "80m²", mold: "C户型下叠", price: "约270万/套" }]
            },
            {
                text: "四居室", cb: false, content: [{ img: "http://cdn.lou86.com/public/uploads/20190417/ef704a465c49f17c0ff57f87cf392064.jpg", type: "别墅", name: "2室1厅1卫1厨", area: "80m²", mold: "C户型下叠", price: "约270万/套" },
                { img: "http://cdn.lou86.com/public/uploads/20190417/ef704a465c49f17c0ff57f87cf392064.jpg", type: "别墅", name: "2室1厅1卫1厨", area: "80m²", mold: "C户型下叠", price: "约270万/套" }]
            }],
            nav_content: [],nav_all:[]
        }
    }
    componentWillMount() {
        var list = this.state.nav
        list[0].cb = true
        this.setState({ nav: list ,nav_all:list})
    }
    navbtn = function (e) {
        var list = this.state.nav;
        for (var li of list) {
            li.cb = false
        }
        list[e].cb = true
        if(e===0){
            list=list
        }else{
            list=[list[e]]
        }
        this.setState({ nav_all: list })
    }
    render() {
        return (<div className="info_type">
            <div className="nav">
                {
                    this.state.nav.map((value, key) => {
                        return <div onClick={this.navbtn.bind(this, key)} className={value.cb ? "active" : ""} key={key}>{value.text}</div>
                    })
                }
            </div>
            {
                this.state.nav_all.map((value, key) => {
                    return (<div className="room" key={key} >
                        <div className="title">{value.text}</div>
                        {
                            value.content.map((values, keys) => {
                                return (<div className="container" key={keys}>
                                    <img src={values.img}></img>
                                    <div className="part"><p>{values.name}</p><span>{values.type}</span></div>
                                    <div className="part"><p>{values.area}</p><span>{values.mold}</span></div>
                                    <div className="price">{values.price}</div>
                                </div>)
                            })
                        }
                    </div>)
                })
            }
        </div>)
    }
}
export default Type