import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/pb'
import type { ClientResponseError, RecordModel } from 'pocketbase'
import { postValidation } from '$lib/helper'

export const load:LayoutServerLoad  = async () => {
    try {
        const data = await pb.collection('handlers').getList(1,50, {
            fields: 'id,name,redirect_success,domains,template,from_email,to,expand.domains.*,expand.template.id,expand.template.name',
            expand: 'domains,template'
        })
        const domains = await pb.collection('domains').getFullList({
            fields: 'id,name'
        })
        const records = data.items.map(({ id,name,redirect_success,expand,from_email,to }) => [
            id,
            name,
            redirect_success,
            expand?.domains.map((d: RecordModel) => d.name),
            from_email,
            to
        ])
        return {
            records,
            domains
        }
    } catch (err) {
        error(500, `Failed to fetch handlers from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}
export const actions = {
    delete: async({request}: {request: Request}) =>{
        const data = await request.formData()
        const recordId = postValidation(data, 'recordId', false, 14)
        if(typeof recordId !== 'string') return recordId
        try {
            await pb.collection('handlers').delete(recordId)
        } catch(err) {
            error(500, `Failed to delete handler with id ${recordId}: ${(err as ClientResponseError).message}`)
        }
        return { success: true }
    }
}