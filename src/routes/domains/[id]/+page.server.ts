import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/pb'
import type { ClientResponseError } from 'pocketbase'
import { postValidation } from '$lib/helper'


export const load:PageServerLoad = async ({ params }) => {
    try {
        const recordId = params.id
        if (recordId === "new") {
            return {
                record: {
                    name:"",
                    verified: ""
                }
            }
        }
        const record = await pb.collection('domains').getOne(`${recordId}`)
        return {
            record
        }
    } catch (err) {
        error(500, `Failed to fetch data from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}

export const actions = {
    create: async ({request}) =>{
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
    }
}