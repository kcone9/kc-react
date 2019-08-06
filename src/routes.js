import Home from "./components/Home"
import House from "./components/House"
import Detail from "./components/Detail"
import House_son from "./components/son/House_son"
import Info from "./components/Info"
import Main from "./components/son/info_house/Main"
import Type from "./components/son/info_house/Type"
import Mating from "./components/son/info_house/Mating"
import Answer from "./components/son/info_house/Answer"
import Search from "./components/Search"
import Bighouse from "./components/Bighouse"

let routers =[
    {path:"/", exact:true, component:Home},
    {path:"/house",component:House},
    {path:"/detail",component:Detail,routes:[
        {path:"/house_son",component:House_son}
    ]},
    {path:"/info",component:Info,routes:[
        {path:"/info/", exact:true,component:Main},
        {path:"/info/type",component:Type},
        {path:"/info/mating",component:Mating},
        {path:"/info/answer",component:Answer}
    ]},
    {path:"/search",component:Search},
    {path:"/bighouse",component:Bighouse}
]
export default routers;