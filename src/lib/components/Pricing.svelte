<script lang='ts'>
	import type { Snippet } from "svelte";
	type Pricing={
		Plan_name:string,
		Plan_price:string,
		Plan_desc:string,
		Plan_permonth:string,
		Specs:Snippet,
		form:Snippet
	}

	let {Plan_name,Specs,form,Plan_price,Plan_desc,Plan_permonth}:Pricing=$props()

</script>


<div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
	<div class="card-body">
		<h3 class="card-title text-xl">{Plan_name}</h3>
		<div class="my-4">
			<span class="text-3xl font-bold">€{Plan_price}</span>
			<span class="text-base-content/70">{Plan_permonth}</span>
		</div>

		{#if Plan_desc}
			<p class="text-base-content/80 mb-4">{Plan_desc}</p>
		{/if}
		{@render Specs()}
		<div class="card-actions mt-auto">
			{@render form()}
		</div>
	</div>
</div>