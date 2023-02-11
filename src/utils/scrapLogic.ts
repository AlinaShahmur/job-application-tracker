import {load} from "cheerio";
import { JOB_PARAMETERS_SELECTORS } from "./constants";
import axios from "axios";


export const getElementBySelector = ($markup,selector) => {
    return $markup(selector).text().trim();
}

export const getPageData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("Error in getPageData " + error);
        throw error    
    }
}

export const scrapPage = async (url) => {
    try {
        const markup = await getPageData(url);
        const $markup = load(markup);
        const result = {}
        
        for (let key of Object.keys(JOB_PARAMETERS_SELECTORS)) {
            result[key] = getElementBySelector( $markup,`${JOB_PARAMETERS_SELECTORS[key]}`);
        }
        
        return result;
    } catch (error) {
        console.log("Error in scrapPage " + error);
        throw error;
    }
}

