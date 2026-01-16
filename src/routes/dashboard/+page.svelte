<script lang="ts">
import type { PageProps } from './$types';
let { data }: PageProps = $props();
let deleteModal = $state(false)
let modalIndex: string|number|undefined = $state()

$effect(() => {
	console.log(data);
});
import Card from "$lib/components/Card.svelte";
import Linechart from "$lib/components/Linechart.svelte";
</script>


<div class="flex justify-items-center justify-center gap-6 mb-8">
<Card
		title="Domains" 
		value={`${data.domains.totalItems} Active`}
		icon="meteor-icons:globe"
		textColor="primary"
	/>

	<Card
		title="Forms"
		value={`${data.forms.totalItems} Created`}
		icon="material-symbols:format-image-left-rounded"
		textColor="primary"
	/>

	<Card
		title="Handlers"
		value={`${data.handlers.length} Running`}
		icon="mynaui:zap"
		textColor="primary"
	/>
</div>
<div>

    <Linechart
        Data={[10, 41, 35, 51, 49, 62, 69, 91, 148]}
        Categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
        DataTitle="Sales"
        Height={400}
        color="primary"
        Curve="smooth"/>
</div>