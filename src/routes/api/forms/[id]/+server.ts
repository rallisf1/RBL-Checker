import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import pb from '$lib/pb'

export const GET: RequestHandler = async ({ params }) => {
	const record = await pb.collection('forms').getOne(params.id)
	return json(record)
}