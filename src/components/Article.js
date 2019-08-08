import React,{Component} from "react"
import "../css/swiper.min.css"
import Swiper from "swiper"
class Article extends React.Component {
    constructor(props){
        super(props)
        this.state={
            nav:[{text:"本地资讯"},{text:"楼盘动态"},{text:"购房指南"}],
            one:[{title:"约惠七夕！三亚热销房源暖心推荐",time:"2019-08-06"},
            {title:"2019年楼市“中考”成绩如何？三份答卷为你总结",time:"2019-07-02"},
            {title:"绿地集团战略重组贵州药材 大健康产业混改首单亮相",time:"2019-06-02"}],
            two:[{title:"万宁石梅半岛项目为东南亚异域风情园林",time:"2019-04-07"},
            {title:"三亚碧桂园海棠盛世目前洋房在售 建面约101-145㎡",time:"2019-07-07"},
            {title:"三亚碧桂园齐瓦颂建筑合理排布 均价约35000元/㎡",time:"2019-08-07"}],
            three:[{title:"购房指南 ： 贷款买房六大要点，让您还款更轻松",time:"2019-07-31"},
            {title:"买房后装修技巧大揭秘",time:"2019-07-22"},
            {title:"父母房子留给子女 哪种方式更省钱？",time:"2019-07-02"}],
            news:[{title:"约惠七夕！三亚热销房源暖心推荐",time:"2019-08-07"},
            {title:"2019年楼市“中考”成绩如何？三份答卷为你总结",time:"2019-07-02"},
            {title:"绿地集团战略重组贵州药材 大健康产业混改首单亮相",time:"2019-06-02"}],
            load_off:true,load_text:"正在加载",load_close:"flex",load_nav:0
        }
    }
    componentWillMount(){
        var list =this.state.nav
        for(var li of list){
            li.cb=false
        }
        list[0].cb=true
        var nows=this.state.news
        for(var i=0;i<nows.length;i++){
            li.key=i
        }
        var num=nows.length
        for(var i=num;i<num+3;i++){
            nows.push({key:i,title:"绿地集团战略重组贵州药材 大健康产业混改首单亮相",time:"2019-06-02"})
        }
        this.setState({nav:list})
    }
    componentDidMount(){
        var mySwiper = new Swiper('.article_init', {
            
        })
        this.article_footer()
    }
    nav_btn(key){
        var list=this.state.nav
        for(var li of list){
            li.cb=false
        }
        list[key].cb=true
        if(key===0){
            var news=this.state.one
        }else if(key===1){
            var news=this.state.two
        }else if(key===2){
            var news=this.state.three
        }
        for(var i=0;i<news.length;i++){
            news[i].key=i
        }
        this.setState({nav:list,load_nav:key,news:news})
    }
    article_footer(){
        var inter=new IntersectionObserver((footer)=>{
            if(footer[0].isIntersecting){
                if(this.state.load_off){
                    this.article_data(this.state.load_nav)
                }
            }
        })
        inter.observe(this.refs.footer)
    }
    article_data(key){
        this.setState({load_off:false})
        if(key===0){
            var list=this.state.one
            var arr={key:i,title:"2019年楼市“中考”成绩如何？三份答卷为你总结",time:"2019-07-02"}
        }else if(key===1){
            var list=this.state.two
            arr={key:i,title:"三亚碧桂园海棠盛世目前洋房在售 建面约101-145㎡",time:"2019-07-07"}
        }else if(key===2){
            var list=this.state.three
            arr={key:i,title:"买房后装修技巧大揭秘",time:"2019-07-22"}
        }else{
            var list=this.state.news
            var arr={key:i,title:"2019年楼市“中考”成绩如何？三份答卷为你总结",time:"2019-07-02"}
        }
        console.log(list)
        var num=list.length
        if(num<=24){
            for(var i=num;i<num+4;i++){
                list.push(arr)
            }
            setTimeout(()=>{
                this.setState({news:list,load_off:true})
            },800)
        }else{
            this.setState({load_text:"没有更多数据了",load_close:"none"})
        }
        
        
    }
    render(){
        return (<div className="article_total">
            <div className="infinit">
                <div className="swiper-container article_init">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <img src="http://cdn.lou86.com/public/uploads/20190301/be1a089ad87be294fef71a135eea3043.jpg"></img>
                            <div className="title">购房指南：异地购房的注意事项</div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="nav">
                {
                    this.state.nav.map((value,key)=>{
                        return (<div key={key} className={value.cb?"active":""} onClick={this.nav_btn.bind(this,key)}>{value.text}</div>)
                    })
                }
                
            </div>
            <div className="acticle_title">
                {
                    this.state.news.map((value,key)=>{
                        return (<div className="content" key={key}>
                        <p>{value.title}</p>
                        <span>{value.time}</span>
                    </div>)
                    })
                }
                
            </div>
            <div className="article_footer" ref="footer">
                <div className="loader" style={{display:this.state.load_close}}></div><span>{this.state.load_text}</span>
            </div>
        </div>)
    }
}
export default Article


