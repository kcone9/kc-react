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
            navall: []
        }
    }
    componentWillMount() {
        var list = this.state.nav
        list[0].cb = true
        this.setState({ nav: list })
        this.navall()
    }
    navall = () => {
        var list = this.state.nav
        var all = []
        for (var i = 0; i < list.length; i++) {
            all.push({ title: list[i].text, content: list[i].content })
        }
        // for(var li of list){
        //     all.content=list[0].content.concat(li.content)
        // }
        this.setState({ nav: list, navall: all })
        console.log(this.state.navall)
    }
    navbtn = function (e) {
        var list = this.state.nav;
        for (var li of list) {
            li.cb = false
        }
        list[e].cb = true
        this.setState({ nav: list })
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
                this.state.nav.map((value, key) => {
                    return (<div className={key === 0 ? "room_active" : "room"} key={key} >
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
            {/* <div className="room">
                <div className="title"></div>
                <div className="container">
                    <div className="img"></div>
                    <div className="part"><p></p><span></span></div>
                    <div className="part"><p></p><span></span></div>
                    <div className="price"></div>
                </div>
            </div> */}
        </div>)
    }
}
export default Type