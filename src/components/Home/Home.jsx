import Navbar from '../Navbar/Navbar'
import Style from './Home.module.css'


export default function Home(){
    return(
        <div className={Style.container}>
            <Navbar />
        </div>
    )
}