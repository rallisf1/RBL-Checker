import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/pb'
import type { ClientResponseError } from 'pocketbase'
import { postValidation } from '$lib/helper'

export const load:PageServerLoad  = async () => {
    try {
        const data = await pb.collection('forms').getList(1,50, {
            fields: 'id,name,handler,expand.handler.name',
            expand: 'handler'
        })
        const handlers = await pb.collection('handlers').getFullList()
        const records = data.items.map(({ id, name, expand }) => [
            id,
            name,
            expand?.handler.name
        ])
        return {
            records,
            handlers
        }
    } catch (err) {
        error(500, `Failed to fetch forms from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}

export const actions = {
    delete: async({request}: {request: Request}) =>{
        const data = await request.formData()
        const recordId = postValidation(data, 'recordId', false, 14)
        if(typeof recordId !== 'string') return recordId
        try {
            await pb.collection('forms').delete(recordId)
        } catch(err) {
            error(500, `Failed to delete form with id ${recordId}: ${(err as ClientResponseError).message}`)
        }
        return { success: true }
    }
}