import {Carousel} from 'react-responsive-carousel';
import a from '../assets/a.webp'
import b from '../assets/b.jpg'
import c from '../assets/c.jpeg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function Caruosal()

{
    return(
        <div className='slide m-1'>
            <div >
         <Carousel >
            
            <div >
                <img src={a} alt='me' id='pic'/>
            </div>
            <div>
                <img src={b} alt='me' id='pic'/>
            </div>
            <div>
                <img src={c} alt='me' id='pic'/>
            </div>
            
         </Carousel>
         
         </div>
        </div>
       
        
    )
}
export default Caruosal