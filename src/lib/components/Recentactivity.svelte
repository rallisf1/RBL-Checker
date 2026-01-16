<script lang="ts">

type List={
    name:string,
    desc:string,
    activity:string,
    photo:string,
    
}
let {name , desc , activity, photo} : List=$props()

</script>

<li class="flex items-center gap-4 px-6 py-4">
    <div class="avatar">
        <div class="w-10 rounded-full">
            <img src={photo} alt="avatar" />
        </div>
    </div>
    <div class="flex-1">
        <h5 class="text-base-content font-semibold">{name}</h5>
        <p class="text-base-content/80 text-sm">{desc}</p>
    </div>
    <span class="text-base-content/60 text-sm">{activity}</span>
</li>
