<script lang="ts">
import type { Snippet } from 'svelte';

type Table = {
    header:string[],
    icon?:string,
    height?:number,
    body?:Snippet
    actions?:boolean,
    manager?:string
}

let {header,body,actions,manager}:Table=$props()
</script>


<table class="table">
    <thead>
        <tr>
            {#each header as text}
                <th>{text}</th>
            {/each}
            {#if actions}
                <th>{manager}</th>
            {/if}
        </tr>
    </thead>
    <tbody>
        {#if body}
            {@render body()}
        {/if}
    </tbody>
</table>