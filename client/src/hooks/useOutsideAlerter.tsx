import { useEffect } from "react";

function useOutsideAlerter(ref: any, callback: any) {
    useEffect(() => {

      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback()
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  export default useOutsideAlerter