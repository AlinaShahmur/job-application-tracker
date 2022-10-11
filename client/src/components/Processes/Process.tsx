import { Link } from "react-router-dom";
import classes from './Process.module.css'
import { BASE_URL, ICONS } from "../../utils/constants";
import SvgIcon from "../Icons/SvgIcon";
import ItemWrapper from "../UI/ItemWrapper";
import { SyntheticEvent, useState } from "react";
import useInput from "../../hooks/useInput";
import { textValidator } from "../../utils/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from "../../utils/request_client";
import { useDispatch } from "react-redux";
import { processActions } from "../../store/process-store";

export default function Process(props: any) {
    const [isEditingMode, setIsEditingMode] = useState(false);
    const { getIdTokenClaims } = useAuth0();
    const dispatch = useDispatch();
    const {
        enteredValue: processNameInputValue,
        hasError: processNameInputHasError,
        setValue: setProcessNameInputValue,
        isInputValid: isProcessNameInputValid,
        inputBlurHandler: processNameInputBlurHandler,
        inputChangeHandler: processNameInputChangeHandler,
    } = useInput(textValidator)

    const toggleEditMode = () => {
        if (!isEditingMode) {
            setProcessNameInputValue(props.process.name);
        }
        setIsEditingMode((prevState: boolean) => !prevState)
    }

    const editProcess = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        if (isProcessNameInputValid) {
            //setIsFormSending(true);

            const processToSend =  {
                name: processNameInputValue,
            };
            const token = await getIdTokenClaims();
            
            const URI = `${BASE_URL}/processes/${process._id}`

                            
            const result = await fetchData('PUT',JSON.stringify(processToSend),URI, token?.__raw);
            console.log({result});
            
            dispatch(processActions.updateProcess({...processToSend, _id: process._id}))
            setIsEditingMode(false);
            // setIsFormSending(false);
            // resetProcessNameInput();
        }
    }
    const iconBtnPath = isEditingMode ? ICONS.path.close_icon : ICONS.path.edit_icon;
    const iconBtnViewBox = isEditingMode ? ICONS.viewBox.close_icon: ICONS.viewBox.edit_icon;
    const process = props.process;
    const content = isEditingMode ? <form onSubmit={editProcess} className = {processNameInputHasError ? "invalid" : ""}>
                                            <input
                                                id = "processName"
                                                type = "text"
                                                value = {processNameInputValue}
                                                onChange = {processNameInputChangeHandler}
                                                onBlur = {processNameInputBlurHandler}                                            
                                            />
                                            <button type="submit">Send</button>
                                           
                                        </form>
                                        : <Link to = {`/${props.process._id}`} state = {{process}}>{props.process.name}</Link>

                             
    return (
        <ItemWrapper>
            <div className={classes.process}>
                {content}
                <button onClick={toggleEditMode} style={{backgroundColor: 'white', border: 'none'}}>
                    <SvgIcon style = {{fill: "#8a996c", width: 15, height: 15}}path = {iconBtnPath} viewBox = {iconBtnViewBox}/>
                </button>
            </div>
        </ItemWrapper>
    )
}