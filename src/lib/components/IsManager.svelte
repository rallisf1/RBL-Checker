<script lang="ts">
    import Icon from '@iconify/svelte'
	import { text } from 'stream/consumers';
	import { type Booleanish } from 'svelte/elements';

    type button={ 
        haspopup?: "dialog" | "menu" | Booleanish | "grid" | "listbox" | "tree" | null | undefined,
        expanded?:Booleanish | null | undefined,
        overlay?:string,
        icon:string,
        text2?:string

    }

    type IsManager = {
        label:string,
        Manager?:button[]
    }
let{Manager,label}:IsManager=$props()
</script>


<div class="flex justify-between items-center mb-4">
    <h2 class="card-title text-2xl">{label}</h2>
    {#if Manager}
        {#each Manager as button}
        <button
            class="btn btn-primary btn-md"
            aria-haspopup={button.haspopup}
            aria-expanded={button.expanded}
            data-overlay={button.overlay}
        >
            <span><Icon height={5} icon={button.icon}/></span>
            {button.text2}
        </button>
        {/each}
    {/if}
</div>