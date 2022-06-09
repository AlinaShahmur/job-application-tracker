import classes from './ItemWrapper.module.css'


export default function ItemWrapper(props: any) {
    return (
        <li className = {classes["item-wrapper"]}>
            {props.children}
        </li>
    )
}   