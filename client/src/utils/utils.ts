import { FileObject } from "../types";
import {  FILE_INPUT_MESSAGES, MIN_JOB_DESC_SIZE, PERMITTED_IMG_FORMATS } from "./constants";

const pretiffyDate = (date: any) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
}

const inputDebouncer = (func: any, delay: number) => {
    let timer: any;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout( () => {
            func.apply(this, args)
        }, delay) 
    }
}

const fileValidator = (fileObj: FileObject) => {
    const isImage = PERMITTED_IMG_FORMATS.includes(fileObj.type);
    const isSizeValid = calculateImageSize(fileObj.base64) <= MIN_JOB_DESC_SIZE;
    const hasEmptyValues = Object
                .entries(fileObj)
                .some(value => {
                    return (typeof value == "string" && value === "")||value == null
                });    
    
    if (!isImage) return { success:false, error: FILE_INPUT_MESSAGES.INVALID_FORMAT };  
    if (hasEmptyValues) return { success:false, error: FILE_INPUT_MESSAGES.EMTPY_VALUES };
    if (!isSizeValid) return { success:false, error: FILE_INPUT_MESSAGES.SIZE_EXCEEDED }; 

    return { success:true, message: "" };
}


const calculateImageSize = (base64Str: any): Number => {
    let y = 1;
    const xSize = (base64Str.length * (3 / 4)) - y;
    return Math.round(xSize / 1024);
}


const formatDate = (dateObject: Date, separator = '-') => {
    let [month, day, year] = dateObject.toLocaleDateString().split('/');
    day = day.length < 2 ? "0" + day : day;
    month = month.length < 2 ? "0" + month : month;
    return `${year}-${month}-${day}`;
}

const dateValidator = (dateString: string) => {
    const dateToValidate = new Date(dateString);
    const todayDate = new Date();
    return dateToValidate <= todayDate
}

const textValidator = (value: string) => {
    return  /^[a-zA-Z0-9_ ]*$/.test(value) && value.trim() !== ''
}
const numberValidator = (value:  string) => {
    return  /^(19|20)\d{2}$/.test(value)
}

const srcValidator = (value : string) => {
    return value.trim() !== ''
}

const emailValidator = (value: string) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
}

export {
    pretiffyDate,
    inputDebouncer, 
    textValidator,
    numberValidator,
    srcValidator,
    emailValidator,
    fileValidator,
    formatDate,
    dateValidator,
    calculateImageSize
}