import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/pb'
import { postValidation } from '$lib/helper'
import type { ClientResponseError } from 'pocketbase'
export const load:PageServerLoad = async ({ params }) => {
    try {
        const recordId = params.id;
        const handlers = await pb.collection('handlers').getFullList()
        if (recordId === "new") {
            return {
                record: {
                    name: "",
                    handler: "",
                    retention_limit: 0,
                    retention_type: "month",
                    unprotected: false,
                    protect_attachments: false,
                    allow_duplicates: false,
                    recipient_can_delete_attachments: false
                },
                handlers
            }
        }
        const record = await pb.collection('forms').getOne(`${recordId}`)
        return {
            record,
            handlers
        }
    } catch (err) {
        error(500, `Failed to fetch domains from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}

export const actions = {
    create: async ({request}) =>{
        const data = await request.formData()
        const FormName = postValidation(data, 'formname', false, 3)
        const HandlerId = postValidation(data, 'handler', false, 14)
        const Unprotected = data.get('unprotected')
        const ProtectAttachments = data.get('protect_attatchments')
        const AllowDuplicates = data.get('allow_duplicates')
        const RecipientCanDelete = data.get('delete_attachments')
        const RetentionType = data.get('retention_type') || 'month'
        const RetentionLimit = data.get('retention_limit') || 0
        const Altcha = data.get('altcha')
        const Honeypot = data.get('honeypot')
        
        const hasError = [FormName, HandlerId].find(e => !Array.isArray(e) && typeof e !== 'string')
        if(hasError) return hasError

        const record = {
            "name": FormName,
            "handler": HandlerId,
            "retention_limit": RetentionLimit,
            "retention_type": RetentionType,
            "unprotected": Unprotected === "on",
            "protect_attachments": ProtectAttachments === "on",
            "allow_duplicates": AllowDuplicates === "on",
            "recipient_can_delete_attachments": RecipientCanDelete === "on",
            "altcha":Altcha,
            "honeypot":Honeypot
            
        }
        try {
            await pb.collection('forms').create(record)
        } catch(err) {
            error(500, `Failed to create form: ${(err as ClientResponseError).message}`)
        }
        return { success: true }
    },
    edit: async({request}) =>{
            const data = await request.formData()
            const recordId = postValidation(data, 'recordId', false, 14)
            const FormName = postValidation(data, 'formname', false, 3)
            const HandlerId = postValidation(data, 'handler', false, 14)
            const Unprotected = data.get('unprotected')
            const ProtectAttachments = data.get('protect_attatchments')
            const AllowDuplicates = data.get('allow_duplicates')
            const RecipientCanDelete = data.get('delete_attachments')
            const RetentionType = data.get('retention_type') || 'month'
            const RetentionLimit = data.get('retention_limit') || 0
            const Altcha = data.get('altcha')
            const Honeypot = data.get('honeypot')

            const hasError = [recordId, FormName, HandlerId].find(e => !Array.isArray(e) && typeof e !== 'string')
            if(hasError) return hasError

            const record = {
                "name": FormName,
                "handler": HandlerId,
                "retention_limit": RetentionLimit,
                "retention_type": RetentionType,
                "unprotected": Unprotected,
                "protect_attachments": ProtectAttachments,
                "allow_duplicates": AllowDuplicates,
                "recipient_can_delete_attachments": RecipientCanDelete,
                "altcha":Altcha,
                "honeypot":Honeypot
                
            }
            try {
                await pb.collection('forms').update(recordId as string, record)
            } catch(err) {
                error(500, `Failed to edit form with id ${recordId}: ${(err as ClientResponseError).message}`)
            }
            return { success: true }
        }
}