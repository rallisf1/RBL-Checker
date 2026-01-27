import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import pb from '$lib/pb';
import { isIP } from 'node:net';

// POST: Check IP against RBLs with optional history
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { ip, saveHistory = false } = body;

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

		// Fetch all RBLs
		const rbls = await pb.collection('rbls').getFullList({
			filter: 'disabled = false'
		});

		// Check IP against each RBL
		const results = {
			ip,
			timestamp: new Date().toISOString(),
			checks: [] as Array<{
				rblId: string;
				rblName: string;
				domain: string;
				listed: boolean;
				delist: string | null;
			}>
		};

		for (const rbl of rbls) {
			try {
				// Query the RBL (simplified approach - actual implementation depends on RBL format)
				// This is a placeholder - you may need to implement actual RBL lookup logic
				const listed = false; // Replace with actual RBL lookup

				results.checks.push({
					rblId: rbl.id,
					rblName: rbl.name,
					domain: rbl.domain,
					listed,
					delist: listed ? rbl.delist : null
				});
			} catch (err) {
				results.checks.push({
					rblId: rbl.id,
					rblName: rbl.name,
					domain: rbl.domain,
					listed: false,
					delist: null
				});
			}
		}

		// Optionally save to history
		if (saveHistory) {
			try {
				await pb.collection('history').create({
					ip,
					checks: JSON.stringify(results.checks),
					checkedAt: new Date()
				});
			} catch (historyErr) {
				console.error('Failed to save history:', historyErr);
				// Don't fail the request if history save fails
			}
		}

		return json(results);
	} catch (err) {
		return json(
			{ error: 'Failed to check IP', details: String(err) },
			{ status: 500 }
		);
	}
};
