function SvgIcon(props: any) {
    return (
        <svg aria-hidden = {props["area-hidden"]}
            focusable = {props.focusable}
            data-prefix = {props["data-prefix"]} 
            style={props.style} xmlns="http://www.w3.org/2000/svg" 
            viewBox={props.viewBox}
            data-icon = {props['data-icon']}
            role = {props.role}
            className = {props.className}
        >
            <path fill = {props.fill} d={props.path}/>
        </svg>
    )
}

export default SvgIcon