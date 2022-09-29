import './Loader.css'


function Loader(props: any) {
    return (
        <div className='loader' style={{fontSize: `${props.size}px`}}></div>
    )
}

export default Loader