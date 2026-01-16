<script lang="ts">
    type SideItems = {
        url:string,
        title:string
}
type Diff = {
    photo1:SideItems[],
    photo2:SideItems[]
        
}

    let {photo1,photo2}:Diff = $props()
</script>

<div class="diff aspect-video">
    {#each photo1 as link}
    <div class="diff-item-1">
        <img
        alt={link.title}
        src={link.url}
        />
    </div>
    {/each}
    {#each photo2 as link}
    <div class="diff-item-2">
        <img
        alt={link.title}
        src={link.url}
        />
    </div>
    {/each}
    <div class="diff-resizer"></div>
</div>