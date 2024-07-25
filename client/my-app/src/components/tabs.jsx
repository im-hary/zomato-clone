import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.css'
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import place from '../assets/place.avif'
import sand from '../assets/sandwich.avif'
import pic from '../assets/pic.jpg'
import gate from '../assets/gate.avif'
import terrace from '../assets/terrace.jpg'
import loc from '../assets/geo-alt.svg'
import tele from '../assets/telephone.svg'

function Nav() {
    return (
        <div >
        <div className='container-fluid m-2 p-4 '>
            <div className='navbar navbar-expand justify-content-between'> 
            <div><h1>The Sandwich Club</h1></div>
            <div className='btn btn-danger'>Place on Order</div>

            </div>
            <Tabs >
                <TabList className='border-bottom border-dark nav' >
                    
                    <Tab><a href="#"><h5 className='text-danger'>Overview</h5></a></Tab>
                    <Tab><a href="#"><h5 className='text-danger'>Contact</h5></a></Tab>
                </TabList>
                <TabPanel>
                    <div className='container-fluid'>
                    <div className='row'>
                    <div className='border col-lg-6'>
                        <div className='p-3'>
                            <h3 className='text-secondary'><b>The Sandwich Club</b></h3><br/>
                    <h5><b>Location:</b><br/></h5> <h5 className='text-muted'>BCS complex,oppt LDC,Narimedu,Madurai-02</h5><br/>
                    <h5><b>Cuisine:</b></h5>
                    <ul>
                        <li>Fudge Brownies</li>
                        <li>Pizza,Burger,Sandwich,Fried Chicken</li>
                        <li>Milkshake,Mojito</li>
                        <li>Momos</li>
                    </ul><br />
                    <h5>Ambiance:</h5>
                    <h6 className='font-italic'>Upon entering The Sandwich Club, guests are greeted by sleek, modern decor accented with industrial touches and warm lighting. The open-concept layout allows diners to observe the bustling kitchen while enjoying the lively ambiance. Whether you're meeting friends for brunch or enjoying a romantic dinner for two, the versatile seating options cater to every occasion.</h6></div></div>
                    <div className='slide p-4 col-lg-6'>
                    <Carousel >
            
            <div >
                <img src={place} alt='me' id='pic'/>
            </div>
            <div>
                <img src={sand} alt='me' id='pic'/>
            </div>
             <div>
                <img src={pic} alt='me' id='pic'/>
            </div> 
            
             <div>
                <img src={gate} alt='me' id='pic'/>
            </div> 
             <div>
                <img src={terrace} alt='me' id='pic'/>
            </div> 
            
         </Carousel>
         </div>
                    </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div>
                        <div className='row'>
                   <div  className='m-3 p-3 col-lg-4'>
                     <h5 id="contact">Phone Number</h5>
                   <p className='text-muted'><img src={tele} alt="" /> <b>+91 9345269521</b></p><br/>

                   <br /><br />

                   <h5 id='contact'>Location</h5>
                   <p className='text-muted'><img src={loc} alt="" /> <b>BCS Complex,Oppst LDC collage,Narimedu,Madurai-625002,Tamil Nadu</b></p><br /></div>
                   <div className=' col-sm-4 m-2' id='map'><iframe id='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d491.2433921496523!2d78.12796954959867!3d9.938356600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c58f0ed74e31%3A0xb91b895f40958c37!2sThe%20Sandwich%20Club!5e0!3m2!1sen!2sin!4v1715098575705!5m2!1sen!2sin" width="900" height="400" style={{border:'2px solid black'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ></iframe></div>

                   
                   </div></div>
                  
                </TabPanel>
            </Tabs>
        </div></div>
    )
}
export default Nav