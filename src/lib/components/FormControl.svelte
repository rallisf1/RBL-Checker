<script lang="ts">
	import type { Snippet } from "svelte";
	import type { KeyboardEventHandler } from "svelte/elements";


    type FormControl = {
        text?:string
        select?:Snippet,
        type?:string,
        value?:string,
        id?:string,
        class_name?:string,
        placeholder?:string,
        onkeydown?:KeyboardEventHandler<HTMLInputElement> | null | undefined,
        onchange?: () => void,
        submit_button?:Snippet,
        required?:boolean,
        disabled?:boolean,
        text2?:string,
        bindedValue?:boolean
    }

    let {value = $bindable(),type,id,text,select,class_name="input input-bordered",placeholder,onkeydown,onchange,submit_button,required=false,disabled=false,text2,bindedValue=false}:FormControl=$props()

</script>
{#if !select}
        <div class="form-control">
            <label class="label" for={id}>
                {#if text}
                    <span class="label-text">{text}</span>
                {/if}
                {#if text2}
                    <span class="label-text">{text2}</span>
                {/if}
            </label>
            {#if bindedValue}
                <input
                    type={type}
                    id={id}
                    class="{class_name}"
                    bind:value={value}
                    placeholder={placeholder}
                    onkeydown={onkeydown}
                    onchange={onchange}
                    name={id}
                    required={required}
                    disabled={disabled}
                />
            {:else}
                <input
                    type={type}
                    id={id}
                    class="{class_name}"
                    value={value}
                    placeholder={placeholder}
                    onkeydown={onkeydown}
                    onchange={onchange}
                    name={id}
                    required={required}
                    disabled={disabled}
                />
            {/if}
        </div>
{:else}
    {@render select()}
{/if}
{#if submit_button}
    {@render submit_button()}
{/if}

