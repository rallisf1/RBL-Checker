import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/pb'
import { menu } from '$lib/menu'

export const load: LayoutServerLoad = async ({ url }) => {
    if(!pb.authStore.isValid) error(403, {
		message: 'Database Auth Failed'
	})
    const activeMenu = menu.find(m => m.link === `/${url.pathname.split('/')[1]}`)
    return {
        activeMenu
    }
}