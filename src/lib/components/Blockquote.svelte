    <script lang='ts'>
        type Blockquote={
            text:string,
            name:string,
            text_align?: 'center' | 'end'
        }
    let{text,name,text_align}:Blockquote=$props()

    let alignment = $derived(`text-${text_align}`);
    </script>

    <blockquote class="relative ms-auto p-4 {alignment}">
        <span class="icon-[tabler--quote] text-base-300 absolute -start-3 -top-3 size-16 rotate-180 rtl:rotate-0"></span>
            <div class="relative z-1">
                <p class="text-base-content text-xl">
                    <em>
                    {text}
                    </em>
                </p>
            </div>
        <footer class="mt-4">
            <div class="text-base-content/50 text-base font-semibold">~ {name}</div>
        </footer>
    </blockquote>