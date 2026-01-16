<script lang="ts">
	import type { Color } from "./types";

    type Status = {
        value:string,
        content:string,
        textColor?:Color,
        max:string,
        progressColor?:Color
    }

    let {value,content,textColor,max,progressColor}:Status = $props()

    let text_color=` text-${textColor}`
    let progress_color=`progress-${progressColor}`
</script>


    <div class="card-body space-y-6 p-6">
        <div>
            <div class="mb-2 flex justify-between">
                <span class="text-base-content font-medium">{content}</span>
                <span class="{text_color}">{value}%</span>
            </div>
            <progress class="progress {progress_color} w-full" {value} {max}></progress>
        </div>
    </div>
