import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/pb'
import type { ClientResponseError } from 'pocketbase'


export const load:PageServerLoad  = async () => {
    try {
        const domains = await pb.collection('domains').getList(1, 50, {
		    fields: 'id,name,verified',
		    expand: 'handler'
	    })


	const handlers = await pb.collection('handlers').getFullList({
		fields: 'id,name'
	})


	const forms = await pb.collection('forms').getList(1, 50, {
		fields: 'id,name,handler,expand.handler.name',
		expand: 'domain'
	})

	return {
		domains,
		handlers,
		forms
	}

    } catch (err) {
        error(500, `Failed to fetch forms from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}
