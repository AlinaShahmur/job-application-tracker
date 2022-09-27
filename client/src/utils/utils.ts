import { FileObject } from "../types";
import {  PERMITTED_IMG_FORMATS } from "./constants";

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
    
    const hasEmptyValues = Object
                .entries(fileObj)
                .some(value => {
                    return (typeof value == "string" && value ==="" )||value == null
                });           
    return isImage && !hasEmptyValues
}

// const dateValidator = (value: string) => {

// }

const formatDate = (dateObject: Date, separator = '-') => {
    let [month, day, year] = dateObject.toLocaleDateString().split('/');
    day = day.length < 2 ? "0" + day : day;
    month = month.length < 2 ? "0" + month : month;
    return `${year}-${month}-${day}`;
}

const dateValidator = (dateString: string) => {
    console.log(dateString);
    
    const dateToValidate = new Date(dateString);
    console.log({dateToValidate});
    
    const todayDate = new Date();
    console.log({todayDate});
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
    dateValidator
}