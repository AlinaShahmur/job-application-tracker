import { SyntheticEvent, useEffect, useState,  } from "react"
import { BASE_URL, CLOUDINARY_URL, ICONS, UPLOAD_PRESET } from "../../utils/constants";
import Modal from "../UI/Modal";
import RoundButton from "../UI/RoundButton";
import TextInput from "../UI/TextInput";
import styles from './CreateApplication.module.css'
import useInput from '../../hooks/useInput'
import { dateValidator, formatDate, textValidator } from "../../utils/utils";
import { fetchData } from "../../utils/request_client";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { FileObject } from "../../types";
import useFileInput from "../../hooks/useFileInput";
import Loader from "../UI/Loader";


function CreateApplication(props: any) {

    const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
    const [isFormCASending, setIsFormCASending] = useState(false);
    const [sourceOptions, setSourceOptions] = useState<Set<string>>(new Set());
    const [isFormAddSourceSending, setIsFormAddSourceSending] = useState(false);
    const [addNewSourceLoading, setAddNewSourceLoading] = useState(false);

    const process: any = useSelector((state: any) => state.process.currentProcess);
    const { getIdTokenClaims } = useAuth0();

    const {
        enteredValue: roleInputValue,
        hasError: roleHasError,
        setValue: setRoleValue,
        isInputValid: isRoleValid,
        inputBlurHandler: roleInputBlurHandler,
        inputChangeHandler: roleInputChangeHandler,
        reset: resetRoleInput
    } = useInput(textValidator);

    const {
        enteredValue: companyNameInputValue,
        setValue: setCompanyNameValue,
        isInputValid: isCompanyNameValid,
        hasError: companyHasError,
        inputBlurHandler: companyNameInputBlurHandler,
        inputChangeHandler: companyNameInputChangeHandler,
        reset: resetCompanyNameInput
    } = useInput(textValidator);

    const {
        enteredValue: dateInputValue,
        setValue: setDateValue,
        isInputValid: isDateValid,
        hasError: dateHasError,
        inputBlurHandler: dateInputBlurHandler,
        inputChangeHandler: dateInputChangeHandler,
        reset: resetDateInput
    } = useInput(dateValidator);

    const {
        enteredValue: sourceNameValue,
        isInputValid: isSourceNameValid,
        hasError: sourceNameHasError,
        inputChangeHandler: sourceNameInputChangeHandler,
        inputBlurHandler: sourceNameBlurHandler,
        reset: resetSourceNameInput
    } = useInput(textValidator);

    const {
        enteredValue: sourceOptionsValue,
        setValue: setSourceOptionsValue,
        isInputValid: isSourceOptionsValid,
        hasError: sourceOptionsValueHasError,
        inputChangeHandler: sourceOptionsChangeHandler,
        inputBlurHandler: sourceOptionsBlurHandler,
        reset: resetSourceOptions
    } = useInput(textValidator);

    const {
        enteredValue: fileInputValue,
        setFile: setFile, 
        isInputValid: isFileValid,
        hasInputFileErrors: hasInputFileErrors,
        errorMessage: fileInputErrorMessage,
        inputChangeHandler: fileInputChangeHandler,
        reset: resetFile
    } = useFileInput();

    useEffect(() => {
        
        async function fetchSources() {
            const token = await getIdTokenClaims();
            const res = await fetchData('GET', null, `${BASE_URL}/api/sources`, token?.__raw, process._id);
            
            setSourceOptions(new Set(res));
            
        }

        fetchSources();
        if (props.isEdit) {
            setEditFields();
        } else {
            setSourceOptionsValue("")
        }
        
    }, []);

    const submitFormCAHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log( isRoleValid, isDateValid, isFileValid,isSourceOptionsValid, isCompanyNameValid);
        
        if (isFormCAValid) {
            setIsFormCASending(true);

            //maxWidth = 650, maxHeight = 560;
            const imageBody = {
                file:  fileInputValue.base64,
                upload_preset: UPLOAD_PRESET
            };
                 
            const res = await fetchData("POST", JSON.stringify(imageBody), `${CLOUDINARY_URL}`);
            console.log("cloudinary res", res);
            
            const body = {
                role: roleInputValue,
                start_date: dateInputValue,
                source: sourceOptionsValue,
                company_name: companyNameInputValue,
                process_id:process._id,
                img: res.secure_url
            };

            const token = await getIdTokenClaims();
            await fetchData("POST", JSON.stringify(body), `${BASE_URL}/api/applications`, token?.__raw, process._id)
            
            resetFormCAControls();
            setIsFormCASending(false);

        }
    }
    const resetFormCAControls = () => {
        resetRoleInput();
        resetDateInput();
        resetFile();
        resetSourceOptions();
        resetCompanyNameInput();
    }

    const chooseFileHandler = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const fileData: FileObject = {
                    name: file.name, 
                    base64: reader.result,
                    type: file.type 
                }
                
                fileInputChangeHandler(fileData)
            };
            reader.readAsDataURL(file);
        }
    }

    const setEditFields = () => {
        setRoleValue(props.application.role);
        setCompanyNameValue(props.application.company_name);
        setDateValue(props.application.start_date.split("T")[0]);
        setSourceOptionsValue(props.application.source);
        //setFile({})
    }

    const submitFormAddResourceHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (isFormAddSourceValid) {
            setAddNewSourceLoading(true);
            resetSourceNameInput();
            setIsFormAddSourceSending(true);

            const token = await getIdTokenClaims();
            const body = {source_name: sourceNameValue};

            await fetchData('POST', JSON.stringify(body), `${BASE_URL}/api/sources`, token?.__raw, process._id);
            const updatedSourceList = new Set(sourceOptions).add(sourceNameValue);
            
            setSourceOptions(updatedSourceList);
            setIsFormAddSourceSending(false);
            setAddNewSourceLoading(false);
        }
    }

    const fileUploadBtnLabel = fileInputValue.name ? fileInputValue.name : "Choose File";

    let formCAClasses = isFormCASending ? '_sending' : "";
    let isFormCAValid = isRoleValid && isDateValid && isFileValid && isSourceOptionsValid && isCompanyNameValid;

    let formAddSourceClasses = isFormAddSourceSending ? '_sending' : "";
    let isFormAddSourceValid = isSourceNameValid;

    const renderSourceList = (set: Set<string>) => {
        let rendered: any[] = [];
        set.forEach((key: string, value: string) => {
            let jsx = (
                <option 
                    key = {Date.now() + key} 
                    value = {value}
                >
                    {value}
                </option>
            )
            rendered.push(jsx);
        })
        return rendered;
    }

    const sourceList = renderSourceList(sourceOptions);
    const sourcesDropdown = sourceOptions.size > 0 
                                ? <select id="optionsDropdown" className='dropdown' onChange={sourceOptionsChangeHandler} onBlur = {sourceOptionsBlurHandler} value = {sourceOptionsValue}>
                                        <option value = ""></option>
                                        {sourceList}
                                    </select>
                                : <span className="small-text-note">You have no sources yet. Click on "+" to create one</span>

    const createApplicationForm = (
        <form onSubmit={submitFormCAHandler} className= {`${styles["create-app-form"]} ${formCAClasses}`} >
                <h3>{props.isEdit ? "Edit" : "Create New"} Application</h3>
                <TextInput 
                        id = "roleInput"
                        label = "Role"
                        type = "text"
                        value = {roleInputValue}
                        onChange = {roleInputChangeHandler}
                        hasError = {roleHasError}
                        onBlur = {roleInputBlurHandler}
                />

                <TextInput 
                        id = "companyNameInput"
                        label = "Company Name"
                        type = "text"
                        value = {companyNameInputValue}
                        isValid = {isCompanyNameValid}
                        onChange = {companyNameInputChangeHandler}
                        hasError = {companyHasError}
                        onBlur = {companyNameInputBlurHandler}
                />
                <div className={`${styles["form-group"]} ${dateHasError ?  "invalid" : ""}`}>
                    <label htmlFor="startDateInput">When did you send a CV</label> <br></br>
                    <input type = "date" id = "startDateInput" max={formatDate(new Date())} onChange={dateInputChangeHandler} onBlur = {dateInputBlurHandler} value = {dateInputValue}></input>
                </div>

     
                <div className={`${styles["form-group"]} ${hasInputFileErrors ?  "invalid" : ""}`}>

                    <p>Upload a job description</p>
                    <label htmlFor="imageInput" className={styles["label-file-upload"]}>{fileUploadBtnLabel}</label> <br></br>
                    <input type = "file" id = "imageInput" accept=".png,.jpeg,.jpg" onChange={chooseFileHandler}></input>
                    {hasInputFileErrors && <p className = 'error-text'>{fileInputErrorMessage}</p>}
                </div>

                <div className={`${styles["form-group"]} ${sourceOptionsValueHasError ?  "invalid" : ""}`}>
                    <label htmlFor="optionsDropdown">Where did you find a job?</label> <br />
                    
                    {sourcesDropdown}
                    <div className={styles["add-source-btn"]}>
                        <RoundButton 
                            viewBox = {ICONS.viewBox.plus_icon} 
                            path = {ICONS.path.plus_icon}
                            onClick = {() => setIsAddSourceOpen(true)} 
                            background = "#339966" 
                            color = "#FFFFFF" 
                        >
                        </RoundButton>
                    </div>

                </div>    
                <button type="submit">Create Application</button>
            
            </form>
    )
    const addSourceForm = addNewSourceLoading ? <Loader size = {5}/> :(
            <div>
                <form onSubmit={submitFormAddResourceHandler} className = {`${styles["add-source-form"]} ${formAddSourceClasses}`}>
                    <RoundButton 
                        onClick = {() => setIsAddSourceOpen(false)}
                        background = "#FFFFFF" 
                        color = "#8a996c" 
                        path = {ICONS.path.arrows.left}
                        viewBox = {ICONS.viewBox.arrows}
                    />   
                    <h3>Add a new source</h3>
                    <TextInput  
                        id = "newSource"
                        label = "Source Name"
                        type = "text"
                        onChange = {sourceNameInputChangeHandler}
                        value = {sourceNameValue}
                        hasError = {sourceNameHasError}
                        onBlur = {sourceNameBlurHandler}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
    )
    return (
        <Modal onClose = {props.onClose}>
            {isAddSourceOpen 
                ? addSourceForm
                : createApplicationForm }
        </Modal>
    )
}

export default CreateApplication;