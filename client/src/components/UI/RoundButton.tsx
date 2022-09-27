import styled, {css} from "styled-components";
import SvgIcon from "../Icons/SvgIcon";

const Button = styled.button<{$background: "string"}>
`   
    padding: 0;
    display: inline;
    border-radius: 50%;
    text-align:center;
    height: 25px;
    width: 25px;
    border: #bfbfbf;
    cursor: pointer;
    position: relative;
    background-color: ${(props: any) => props.$background ? props.$background : "red"};

    svg {
        color: #fff;
        position: absolute;
        height: 20px;
        width: auto;
        right:50%;
        top:50%;
        transform: translate(50%, -50%)
    }
}`

export default function RoundButton(props: any) {
    
    return (
        <Button $background = {props.background} onClick = {props.onClick} >
            <SvgIcon 
                className="svg-inline--fa fa-times fa-w-11" 
                fill={props.color} 
                path = {props.path} 
                viewBox = {props.viewBox} 
                aria-hidden="true" 
                focusable="false" 
                data-prefix="fas" 
                data-icon="times"  
                role="img"
            />
        </Button>
    )
}