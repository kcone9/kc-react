import React,{Component} from "react"
import "../scss/search.scss"
import Search from "./son/Public_search"
class House_map extends  React.Component {
    constructor(props){
        super(props)
        this.state={
            nav:[{text:"区域"},{text:"均价"},{text:"特色"},{text:"更多"}],
            nav_one:["吉阳区","海棠区","天涯区","崖州区"],
            nav_two:["不限","1万以下","1万~1.5万","1.5万~2万","2万以上"],
            nav_three:["不限","住宅"," 复式","露台","低总价","返租","不限购","刚需","学区房"],
            nav_more:[{text:"物业类型",content:["住宅","公寓","商住","别墅","洋房","其他"]},
            {text:"销售状态",content:["在售","待售","售完","现房","尾盘"]}],
            nav_container:[],nav_off:false,nav_switch:true
        }
    }
    componentWillMount(){
        this.nav_init()
    }
    nav_init(){
        var nav=this.state.nav
        for(var n of nav){
            n.cb=false
            n.img="http://127.0.0.1:5050/house/icon/arr_down_gray.png"
        }
        return nav
    }
    nav_btn(key){
        var nav=this.nav_init()
        nav[key].cb=true
        nav[key].img="http://127.0.0.1:5050/house/icon/arr_down_select.png"
        if(key===0){
            var container=this.state.nav_one
            var nav_switch=true
        }else if(key===1){
            var container=this.state.nav_two
            var nav_switch=true
        }else if(key===2){
            var container=this.state.nav_three
            var nav_switch=true
        }else if(key===3){
            var container=this.state.nav_more
            var nav_switch=false
        }
        if(!this.state.nav_off){
            this.setState({nav_off:true})
        }
        console.log(this.state.nav_more)
        this.setState({nav_container:container,nav:nav,nav_switch:nav_switch})
    }
    render(){
        return (<div className="phone_map">
            <div className="header">
                <img src="http://127.0.0.1:5050/house/icon/arr_left_gary.png"></img>
                <p>三亚</p><span>--</span>
            </div>
            <Search text="请输入楼盘名称/关键词"></Search>
            <div className="nav">
                {
                    this.state.nav.map((value,key)=>{
                        return (<div onClick={this.nav_btn.bind(this,key)} key={key} className={value.cb?"active":""}><span>{value.text}</span><img className={value.cb?"img":""} src={value.img}></img></div>)
                    })
                }
                
            </div>
            <div className={this.state.nav_off?"nav_select":"nav_select nav_active"}>
                {
                    this.state.nav_switch?this.state.nav_container.map((value,key)=>{
                        return (<div className="item" key={key}><span>{value}</span></div>)
                    }):this.state.nav_container.map((value,key)=>{
                        return (<div className="more" key={key}>
                        <div className="title">{value.text}</div>
                        <div className="content">
                            {
                                value.content.map((values,keys)=>{
                                    return (<p key={keys}>{values}</p>)
                                })
                            }
                            
                        </div>
                    </div>)
                    })
                }
                {
                    !this.state.nav_switch?<div className="select_btn">
                    <button>确定</button>
                </div>:""
                }
                
                
            </div>
        </div>)
    }
}
export default House_map




