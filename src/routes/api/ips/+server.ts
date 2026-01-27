import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import pb from '$lib/pb';
import { isIP } from 'node:net';
import { resolve4, resolve6 } from 'node:dns/promises';

// POST: Add new IP
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { ip, notes } = body;

		// Validate IP
		if (!ip || typeof ip !== 'string') {
			return json(
				{ error: 'IP is required and must be a string' },
				{ status: 400 }
			);
		}

		if (isIP(ip) === 0) {
			return json(
				{ error: 'Invalid IP address' },
				{ status: 400 }
			);
		}

		// Check if IP is resolvable
		try {
			const ipv4list = await resolve4(ip);
			const ipv6list = await resolve6(ip);

			if (!ipv4list.length && !ipv6list.length) {
				return json(
					{ error: 'IP address could not be resolved' },
					{ status: 400 }
				);
			}

			// Create records for resolved IPs
			const batch = pb.createBatch();
			const resolvedIPs = [...ipv4list, ...ipv6list];

			for (const resolvedIP of resolvedIPs) {
				batch.collection('ips').create({ ip: resolvedIP, notes: notes || '' });
			}

			const results = await batch.send();
			return json(
				{ success: true, created: results.length, ips: resolvedIPs },
				{ status: 201 }
			);
		} catch (dnsError) {
			return json(
				{ error: 'Failed to resolve IP address', details: String(dnsError) },
				{ status: 400 }
			);
		}
	} catch (err) {
		return json(
			{ error: 'Failed to process request', details: String(err) },
			{ status: 500 }
		);
	}
};

// GET: List all IPs
export const GET: RequestHandler = async () => {
	try {
		const records = await pb.collection('ips').getFullList({
			sort: '-created'
		});
		return json(records);
	} catch (err) {
		return json(
			{ error: 'Failed to fetch IPs', details: String(err) },
			{ status: 500 }
		);
	}
};
