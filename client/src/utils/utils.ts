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

export {pretiffyDate, inputDebouncer}