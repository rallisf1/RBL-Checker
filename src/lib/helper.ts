import type { Color, Size} from "$lib/components/types.ts";
import { fail } from "@sveltejs/kit"
import * as cheerio from 'cheerio'
export const ChartColor = (color: Color) => {
    switch(color){
        case 'primary':
            return 'oklch(var(--p))'
        case 'secondary':
            return 'oklch(var(--s))'
        case 'accent':
            return 'oklch(var(--a))'
        case 'neutral':
            return 'oklch(var(--n))'
        case 'info':
            return 'oklch(var(--in))'
        case 'success':
            return 'oklch(var(--su))'
        case 'warning':
            return 'oklch(var(--wa))'
        case 'error':
            return 'oklch(var(--er))'
    }

}
export const truncateHTML = (content: string, maxLength: number = 255, append: string = '…') => {
    const $ = cheerio.load(content)
    const textContent = $.root().text()
    const truncated = textContent.substring(0, maxLength)
    return truncated + (textContent.length > maxLength ? append : '')
}

export const truncateString = (content: string, maxLength: number = 255, append: string = '…') => {
    if(content.length <= maxLength) return content
    const truncated = content.substring(0, maxLength)
    return truncated + append
}

export const iconHeight = (size: Size) => {
    switch(size) {
        case 'xs':
            return 12
        case 'sm':
            return 16
        case 'lg':
            return 24
        case 'wide':
            return 24
        case 'block':
            return 24
        default:
            return 20
    }
}
export const postValidation = (data: FormData, fieldName: string, multiple: boolean = false, length: number = 0, specificValue: string|string[]|null = null) => {
    let fieldValue = multiple ? data.getAll(fieldName) : data.get(fieldName)
    if(fieldValue === null) {
        return fail(400, {fieldName, missing:true})
    }
    if(Array.isArray(fieldValue)) {
        if(!fieldValue.length) return fail(400, {fieldName, missing:true})
        let stringified:string[] = fieldValue.map(v => v.toString())
        if(specificValue) {
            stringified = stringified.filter(v => Array.isArray(specificValue) ? specificValue.includes(v) : specificValue === v)
        } else {
            stringified = stringified.filter(v => v.length > length)
        }
        return stringified.length ? stringified : fail(400, {fieldName, invalid:true})
    }
    fieldValue = fieldValue.toString()
    if(specificValue) {
        if(Array.isArray(specificValue)) {
            if(!specificValue.includes(fieldValue)) return fail(400, {fieldName, invalid:true})
        } else {
            if(specificValue !== fieldValue) return fail(400, {fieldName, invalid:true})
        }
    }
    if(fieldValue.length <= length){
        return fail(400, {fieldName, invalid:true})
    }
    return fieldValue
}