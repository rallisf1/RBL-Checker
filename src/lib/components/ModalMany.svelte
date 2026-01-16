<script lang="ts">
	import type { Snippet } from "svelte";
	import type { Size } from "./types";

    type ModalMany={
        position:"top-start" | "top" | "top-end" | "middle-start" | "middle" | "middle-end" | "bottom-start" | "bottom" | "bottom-end" ; 
        size:Size,
        title:string,
        paragraph?:string,
        Body?: (index?: string|number) => ReturnType<Snippet>,
        Id:string ,
        Footer?:Snippet,
        open:boolean,
        close:() => void,
        recordId?:string|number
    }
    let{position,size,title,paragraph,Body,Id,Footer,open,close,recordId}:ModalMany=$props()

    let modal_size=$derived(`modal-dialog-${size}`);
    let modal_position=$derived(`modal-${position}`);
</script>

<div id="form-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 {modal_position}" class:open={open} class:opened={open} class:hidden={!open} role="dialog" tabindex="-1">
  <div class="modal-dialog {modal_size}">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">{title}</h3>
        <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" onclick={close}><span class="icon-[tabler--x] size-4"></span></button>
      </div>
      <div class="modal-body">
        {#if Body}
            {@render Body(recordId)}
        {:else}
            {paragraph}
        {/if}
      </div>
      {#if Footer}
      <div class="modal-footer">
        {@render Footer()}
      </div>
      {/if}
    </div>
  </div>
</div>