<script lang="ts">
	import type { Load } from "@sveltejs/kit";
	import type { Color, Size } from "./types";

        type Loading={
            variant:'spinner' | 'dots'| 'ring' | 'ball' ,
            size:Size,
            color:Color,
        }
    
    let {variant,size,color}:Loading=$props()

    let loading_styles = `loading-${variant}`;
    let loading_size = `loading-${size}`;
    let loading_color= `loading-${color}`;
</script>

<span class="loading {loading_styles} {loading_size} {loading_color}"></span>
