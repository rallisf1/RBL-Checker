import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/pb'
import type { ClientResponseError } from 'pocketbase'
import { postValidation } from '$lib/helper'

export const load:LayoutServerLoad  = async () => {
    try {
        const data = await pb.collection('domains').getList(1,50, {
            fields: 'id,name,verified'
        })
        const records = data.items.map(({ id, name, verified }) => [
            id,
            name,
            verified.includes('ownership') ? '✅' : '❌'
        ])
        return {
            records
        }
    } catch (err) {
        error(500, `Failed to fetch domains from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}


export const actions = {
    create: async ({request}: {request: Request}) =>{
        const data = await request.formData()
        const domain = postValidation(data, 'domain', false, 3)
        if(typeof domain !== 'string') return domain
        const record = {
            "name": domain
        }
        try {
            await pb.collection('domains').create(record)
        } catch(err) {
            error(500, `Failed to create domain: ${(err as ClientResponseError).message}`)
        }
        return { success: true }
    },
    delete: async({request}: {request: Request}) =>{
        const data = await request.formData()
        const recordId = postValidation(data, 'recordId', false, 14)
        if(typeof recordId !== 'string') return recordId
        try {
            await pb.collection('domains').delete(recordId)
        } catch(err) {
            error(500, `Failed to delete domain with id ${recordId}: ${(err as ClientResponseError).message}`)
        }
    }
}