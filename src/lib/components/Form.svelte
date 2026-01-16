<script lang="ts">
import type { Snippet } from "svelte";
import { enhance } from '$app/forms';
type Form = {
    method?: "POST" | "dialog" | "get" | "post" | "DIALOG",
    action?: string,
    select?:Snippet,
    class_name?: string,
    submit_button?:Snippet,
    grid_template?:boolean,
    Modal?:Snippet,
    formControl?:Snippet

}   
let {method,action,select,class_name,submit_button,Modal,grid_template=false,formControl}:Form=$props()


</script>

{#if !grid_template}
    <form method={method} action={action} use:enhance class={class_name}>
        {#if formControl}
            {@render formControl()}
        {:else if select}
            {@render select()}
        {:else}
            <!-- No inputs or select provided -->
        {/if}
        {#if Modal}
            {@render Modal()}
        {/if}
        {#if submit_button}
            {@render submit_button()}
        {/if}
    </form>
{:else}
    <form method={method} action={action} use:enhance class={class_name}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#if formControl}
            {@render formControl()}
        {:else if select}
            {@render select()}
        {:else}
            <!-- No inputs or select provided -->
        {/if}
        {#if Modal}
            {@render Modal()}
        {/if}
        {#if submit_button}
            {@render submit_button()}
        {/if}
        </div>
    </form>
{/if}
