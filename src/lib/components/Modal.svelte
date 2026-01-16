<script lang="ts">
	import { onMount } from 'svelte';
	let { id, title, children } = $props<{
		id: string;
		title: string;
		children: any;
	}>();

	onMount(() => {
		if (typeof window !== 'undefined' && window.HSStaticMethods) {
			window.HSStaticMethods.autoInit(['modal']);
		}
	});
</script>

<div
	{id}
	class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 bg-transparent"
	tabindex="-1"
	role="dialog"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title">{title}</h3>
				<button
					type="button"
					class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
					aria-label="Close"
					data-overlay="#{id}"
				>
					<span class="icon-[tabler--x] size-4"></span>
				</button>
			</div>
			<div class="modal-body">
				{@render children()}
			</div>
		</div>
	</div>
</div>
