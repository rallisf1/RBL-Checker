<script lang="ts">

    type Swap = {
        texton?:string,
        textoff?:string,
        type?:string,
        swapFlip?:boolean,
        swapRotate?:boolean,
        active?:boolean
    }

    let {type,texton,textoff,swapFlip,swapRotate,active=false}:Swap=$props()

    let swap_flip = $state(``)
    swapFlip ? swap_flip = `swap-flip`:``
    let swap_rotate = $state(``)
    swapRotate ? swap_rotate = `swap-rotate`:``
</script>

<label class="swap  {swap_flip} {swap_rotate}" class:{active}>
    <input type={type}/> 
    <span class="swap-off">{textoff}</span>
    <span class="swap-on">{texton}</span>
</label>