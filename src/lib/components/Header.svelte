<script  lang='ts'>
import type { Size } from "./types";

type Header={
    title:string,
    Description?:string,
    fontSize:Size
}
let{title,Description,fontSize='2xl'}:Header=$props()

const textSize = `text-${fontSize}`
</script>

<div>
    <h2  class="{textSize} mb-2 font-bold">{title}</h2>
    <p class="text-base-content/70">{Description}</p>
</div>

