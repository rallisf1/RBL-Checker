<script lang="ts">
	import { title } from "process";
	import type { Snippet } from "svelte";

    type Footer = {
        text:string,
        links?:Snippet,
        title:string,
    }
    let {text,links}:Footer = $props()
</script>

<div class="w-full">
    <footer class="footer items-center px-6 py-4">
        <aside class="grid-flow-col items-center">
            <p>{text} <a class="link link-hover font-medium" href="/">{title}</a></p>
        </aside>
        <nav class="text-base-content grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            {#if links}
                {@render links()}
            {/if}
        </nav>
    </footer>
</div>