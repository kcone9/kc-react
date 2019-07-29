import Home from "./components/Home"
import House from "./components/House"
import Detail from "./components/Detail"
let routes =[
    {path:"/", exact:true, component:Home},
    {path:"/house",component:House},
    {path:"/detail",component:Detail,routes:[
        {path:"",component:"..."}
    ]}
]
export default routes;