import Home from "./components/Home"
import House from "./components/House"
import Detail from "./components/Detail"
import House_son from "./components/son/House_son"
let routers =[
    {path:"/", exact:true, component:Home},
    {path:"/house",component:House},
    {path:"/detail",component:Detail,routes:[
        {path:"/house_son",component:House_son}
    ]}
]
export default routers;