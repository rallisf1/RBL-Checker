<script lang="ts">



    type Pagination = { 
        Event?:() => void,
        pagDisabled?:boolean,
        text:string
        currentPage:string,
        totalPages:string
        text2:string,
        disabled2?:boolean,
        Event2?:() => void
    }

    let {Event,pagDisabled = false,currentPage,totalPages,text2,text,disabled2,Event2}:Pagination = $props()

</script>

<div class="flex justify-center mt-6">
    <div class="join">
        <button
            class="join-item btn"
            disabled= {pagDisabled}
            onclick={Event}
        >
            «
        </button>
        <button class="join-item btn">{text} {currentPage} {text2} {totalPages}</button
        >
        <button
            class="join-item btn"
            disabled={disabled2}
            onclick={Event2}
        >
            »
        </button>
    </div>
</div>