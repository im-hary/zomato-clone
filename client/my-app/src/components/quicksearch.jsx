import 'bootstrap/dist/css/bootstrap.min.css'

import Quickitem from './quickitem'
function QuickSearch(props) {
    const {meal}=props;
    return (
        <div>
            <div className='container'>
                <div className='mt-5'><h2>Quick Searches</h2>
                    <p className='text-muted'>Discover Restaurants by type of meal</p>
                </div>
                <div className='row'>
                    {
                        meal.map((item,index)=>{
                            return <Quickitem item={item} key={index}/>
                        })
                    }
                    
                    </div>
            </div>
        </div>


    )


}
export default QuickSearch