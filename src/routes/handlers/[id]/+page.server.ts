import type { PageServerLoad } from '../$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/pb'
import { postValidation } from '$lib/helper';
import type { ClientResponseError } from 'pocketbase';

export const load:PageServerLoad = async ({ params }) => {
    try {
        const domains = await pb.collection('domains').getFullList({
            fields: 'id,name'
        })
        const recordId = params.id;
        if (recordId === "new") {
            return {
                record: {
                    name: "",
                    domains: [],
                    from_email: "",
                    from_name: "",
                    to: "",
                    reply_to: "",
                    honeypot: "",
                    altcha: false,
                    redirect_success: "",
                    redirect_fail: ""
                },
                domains
            }
        }
        const record = await pb.collection('handlers').getOne(`${recordId}`)
        return {
            record,
            domains
        }
    } catch (err) {
        error(500, `Failed to fetch data from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}

export const actions = {
    create: async ({request}) =>{
        const data = await request.formData()
        const RedirectSuccess = data.get('RedirectSuccess')
        const RedirectFail = data.get('RedirectFail')
        const EmailFrom = data.get('EmailFrom')
        const Domain = postValidation(data, 'Domain', true, 14)
        const EmailTo = postValidation(data, 'EmailTo', false, 4) // email validation is handled by pocketbase
        const ReplyTo = data.get('ReplyTo')
        const Altcha = data.get('altcha')
        const Honeypot = data.get('honeypot')
        const FromName = data.get('from_name')
        const HandlerName = postValidation(data, 'handlername', false, 3)

        // const hasError = [Domain, EmailTo, HandlerName].find(e => !Array.isArray(e) && typeof e !== 'string')
        // if(hasError) return hasError

        const record = {
            "name": HandlerName,
            "honeypot": Honeypot,
            "domains": Domain,
            "from_email": EmailFrom,
            "from_name": FromName,
            "to": EmailTo,
            "reply_to": ReplyTo,
            "altcha": Altcha === "on",
            "redirect_success": RedirectSuccess,
            "redirect_fail": RedirectFail
        }
        try {
            await pb.collection('handlers').create(record)
        } catch(err) {
            error(500, `Failed to create handler: ${(err as ClientResponseError).message}`)
        }
        return { success: true}
    },
    edit: async({request}) =>{
        const data = await request.formData()
        const recordId = postValidation(data, 'recordId', false, 14)
        const RedirectSuccess = data.get('RedirectSuccess')
        const RedirectFail = data.get('RedirectFail')
        const EmailFrom = data.get('EmailFrom')
        const Domain = postValidation(data, 'Domain', true, 14)
        const EmailTo = postValidation(data, 'EmailTo', false, 4)
        const ReplyTo = data.get('ReplyTo')
        const Altcha = data.get('altcha')
        const Honeypot = data.get('honeypot')
        const FromName = data.get('from_name')
        const HandlerName = postValidation(data, 'handlername', false, 3)

        // const hasError = [recordId, Domain, EmailTo, HandlerName].find(e => !Array.isArray(e) && typeof e !== 'string')
        // if(hasError) return hasError
    
        const record = {
            "name": HandlerName,
            "honeypot": Honeypot,
            "domains": Domain,
            "from_email": EmailFrom,
            "from_name": FromName,
            "to": EmailTo,
            "reply_to": ReplyTo,
            "altcha": Altcha === "on",
            "redirect_success": RedirectSuccess,
            "redirect_fail": RedirectFail
        }
        try {
            await pb.collection('handlers').update(recordId as string, record)
        } catch(err) {
            error(500, `Failed to edit handler with id ${recordId}: ${(err as ClientResponseError).message}`)
        }
        return { success: true }
    }
}