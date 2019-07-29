import React,{Component} from "react"
import "../scss/detail.scss"
class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            nav:["主页","详情","户型","配套","问答"]
        }
    }
    componentWillMount(){
        var list=this.state.nav
        var row=[]
        for(var i=0;i<list.length;i++){
            if(i===0){
                row.push({text:list[i],cb:true})
            }else{
                row.push({text:list[i],cb:false})
            }
        }
        this.setState({nav:row})
    }
    render(){
        return (<div>
            <div className="detail_header">
                <div className="back">
                    <img src="http://127.0.0.1:5050/house/icon/back.png"></img>
                </div>
                <div className="aside">
                    <img src="http://127.0.0.1:5050/house/icon/aside.png"></img>
                </div>
            </div>
            <div className="detail_firstimg">
                <img src="http://cdn.lou86.com/public/uploads/2018-01/16/thumb_880x578_b4f044ef96d408ce99fd8899427975f3.jpg"></img>
            </div>
            <div className="detail_nav">
                {
                    this.state.nav.map((value,key)=>{
                        return (<button key={key} className={value.cb?"active":""}>{value.text}</button>)
                    })
                }
                
            </div>
            <div className="detail_body">
                <div className="header">
                    <div className="pad">
                        <div className="left">
                            <div className="title"><span>怡海湾别墅</span><i>在售</i></div>
                            <div className="label">
                                <span>海景房</span><span>报销机票</span><span>别墅</span><span>专车看房</span>
                            </div>
                        </div>
                        <div className="right">
                            <div className="join"><img src="http://cdn.lou86.com/public/static/phone/img/icons/team.png"></img>报名团购</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default Detail;





