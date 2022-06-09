import { useRef } from "react";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import PropTypes from "prop-types";

function OutsideAlerter(props: any) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.onClickOutside);
    return <div ref={wrapperRef}>{props.children}</div>;
}
  
  OutsideAlerter.propTypes = {
    onClickOutside: PropTypes.func,
    children: PropTypes.element.isRequired
  };
  
  export default OutsideAlerter;
  