<script lang="ts"> 

type Carouserl= {
    text_slides?: Array<{text:string,active:boolean}>,
    image_slides?:Array<{image_url:string,active:boolean}>,
    pagination_style?:'dots'|'box',
    thumbs?:boolean
}   

let {text_slides,pagination_style='box',image_slides,thumbs}:Carouserl=$props()

const options = {
    "loadingClasses": "opacity-0",
    "dotsItemClasses": "carousel-box carousel-active:bg-primary"
}
</script>


<div data-carousel={JSON.stringify(options)} class="relative w-full" >
<div class="carousel h-80">
    <div class="carousel-body h-full opacity-0">
    {#if text_slides}
    {#each text_slides as slide}
        <div class="carousel-slide" class:active={slide.active}>
            <div class="bg-base-200/80 flex h-full justify-center p-6">
            <span class="self-center text-2xl sm:text-4xl">{slide.text}</span>
            </div>
        </div>
    {/each}
    {:else}
        {#each image_slides as slide}
            <div class="carousel-slide">
                <div class="flex h-full justify-center">
                    <img src={slide.image_url} class="size-full object-cover" alt="game" />
                </div>
            </div>
        {/each}
    {/if}
    </div>
</div>
{#if thumbs}
    <div class="carousel-pagination bg-base-100 absolute bottom-0 end-0 start-0 z-1 h-1/4 gap-2 flex justify-center gap-2 overflow-x-auto pt-2" >
        {#each image_slides as slide}
            <img src={slide.image_url} class="carousel-pagination-item carousel-active:opacity-100 grow object-cover opacity-30" alt="mountain" />
        {/each}
    </div>
{/if}0


<button type="button" class="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
    <span class="icon-[tabler--chevron-left] size-5"></span>
    <span class="sr-only">Previous</span>
</button>
<button type="button" class="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
    <span class="icon-[tabler--chevron-right] size-5"></span>
    <span class="sr-only">Next</span>
</button>

{#if !thumbs}
    <div class="carousel-thumbs absolute bottom-3 end-0 start-0 flex justify-center gap-3"></div>
{/if}

</div>