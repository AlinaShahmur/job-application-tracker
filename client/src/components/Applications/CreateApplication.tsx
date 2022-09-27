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


function CreateApplication(props: any) {
    const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
    const [isFormCASending, setIsFormCASending] = useState(false);
    const [sourceOptions, setSourceOptions] = useState<Set<string>>(new Set());
    const [isFormAddSourceSending, setIsFormAddSourceSending] = useState(false);

    const process: any = useSelector((state: any) => state.process.currentProcess);
    const { getIdTokenClaims } = useAuth0();

    const {
        enteredValue: roleInputValue,
        isTouched: isRoleTouched,
        setValue: setRoleValue,
        isInputValid: isRoleValid,
        inputChangeHandler: roleInputChangeHandler,
        reset: resetRoleInput
    } = useInput(textValidator);

    const {
        enteredValue: dateInputValue,
        isTouched: isDateTouched,
        setValue: setDateValue,
        isInputValid: isDateValid,
        inputChangeHandler: dateInputChangeHandler,
        reset: resetDateInput
    } = useInput(dateValidator);

    const {
        enteredValue: companyNameInputValue,
        isTouched: isCompanyNameTouched,
        setValue: setCompanyNameValue,
        isInputValid: isCompanyNameValid,
        inputChangeHandler: companyNameInputChangeHandler,
        reset: resetCompanyNameInput
    } = useInput(textValidator);

    const {
        enteredValue: sourceNameValue,
        isTouched: isSourceNameTouched,
        isInputValid: isSourceNameValid,
        inputChangeHandler: sourceNameInputChangeHandler,
        reset: resetSourceNameInput
    } = useInput(textValidator);

    const {
        enteredValue: sourceOptionsValue,
        isTouched: isSourceOptionsTouched,
        setValue: setSourceOptionsValue,
        isInputValid: isSourceOptionsValid,
        inputChangeHandler: sourceOptionsChangeHandler,
        reset: resetSourceOptions
    } = useInput(textValidator);

    const {
        enteredValue: fileInputValue,
        isTouched: isFileInputTouched,
        isInputValid: isFileValid,
        inputChangeHandler: fileInputChangeHandler,
        reset: resetFile
    } = useFileInput();

    useEffect(() => {
        async function fetchSources() {
            const token = getIdTokenClaims();
            const res = await fetchData('GET', null, `${BASE_URL}/sources`, token, process._id);
            console.log({res});
            
            setSourceOptions(new Set(res));
        }
        fetchSources();
        if (props.isEdit) setEditFields();
    }, [])

    const submitFormCAHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        

        if (isFormCATouched && isFormCAValid) {
            const imageBody = {
                file: fileInputValue.base64,
                upload_preset: UPLOAD_PRESET
            };

            const res = await fetchData("POST", JSON.stringify(imageBody), CLOUDINARY_URL);
            const body = {
                role: roleInputValue,
                start_date: dateInputValue,
                source: sourceOptionsValue,
                company_name: companyNameInputValue,
                process_id:process._id,
                img: res.url
            };

            console.log({body});
            const token = await getIdTokenClaims();
            await fetchData("POST", JSON.stringify(body), `${BASE_URL}/applications`, token?.__raw, process._id)
            resetFormCAControls();
            setIsFormCASending(true);

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
    }

    const submitFormAddResourceHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (isFormAddSourceValid && isFormAddSourceTouched) {
            resetSourceNameInput();
            setIsFormAddSourceSending(true);

            const token = await getIdTokenClaims();
            const body = {source_name: sourceNameValue};

            await fetchData('POST', body, `${BASE_URL}/sources`, token?.__raw, process._id);
            const updatedSourceList = new Set(sourceOptions).add(sourceNameValue);
            
            setSourceOptions(updatedSourceList)
            setIsFormAddSourceSending(false);
        }
    }

    const fileUploadBtnLabel = fileInputValue.name ? fileInputValue.name : "Choose File";

    let isFormCATouched = isRoleTouched && isFileInputTouched && isDateTouched && isSourceOptionsTouched && isCompanyNameTouched;
    let formCAClasses = isFormCASending ? '_sending' : "";
    let isFormCAValid = isRoleValid && isDateValid && isFileValid && isSourceOptionsValid && isCompanyNameValid;

    let isFormAddSourceTouched = isSourceNameTouched;
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
                                ? <select id="optionsDropdown" className='dropdown' onChange={sourceOptionsChangeHandler} value = {sourceOptionsValue}>
                                        {sourceList}
                                    </select>
                                : <span className="small-text-note">You have no sources yet. Click on "+" to create one</span>

    const createApplicationForm = (
        <form onSubmit={submitFormCAHandler} className= {`${styles["create-app-form"]} ${formCAClasses}`} >
                <h3>Create New Application</h3>
                <TextInput 
                        id = "roleInput"
                        label = "Role"
                        type = "text"
                        value = {roleInputValue}
                        onChange = {roleInputChangeHandler}
                />

                <TextInput 
                        id = "companyNameInput"
                        label = "Company Name"
                        type = "text"
                        value = {companyNameInputValue}
                        onChange = {companyNameInputChangeHandler}
                />
                <div className={styles["form-group"]}>
                    <label htmlFor="startDateInput">When did you send a CV</label> <br></br>
                    <input type = "date" id = "startDateInput" max={formatDate(new Date())} onChange={dateInputChangeHandler} value = {dateInputValue}></input>
                </div>

     
                <div className={styles["form-group"]}>

                    <p>Upload a job description</p>
                    <label htmlFor="imageInput" className={styles["label-file-upload"]}>{fileUploadBtnLabel}</label> <br></br>
                    <input type = "file" id = "imageInput" accept=".png,.jpeg,.jpg" onChange={chooseFileHandler}></input>
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="companyNameInput">Where did you find a job?</label> <br />
                    
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
    const addSourceForm = (
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