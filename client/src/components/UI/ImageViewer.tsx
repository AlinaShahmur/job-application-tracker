import classes from './ImageViewer.module.css'

function ImageViewer(props: any) {
    return (
        <div>
            <div className = {classes.backdrop} onClick = {props.onClose}></div>
            <div className = {classes['image-viewer']}>
                <img src = {props.src}></img>
            </div>
        </div>

    )
}

export default ImageViewer