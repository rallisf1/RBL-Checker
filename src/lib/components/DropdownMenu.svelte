<script lang='ts'>
import Icon from '@iconify/svelte'
    type Item={
        url:string,
        icon_sec:string,
        title:string
    }


    type Menu={
        icon:string
        image?:string
        company_name:string
        username:string
        option:Item[]

    }

let {icon,image,company_name,username,option}:Menu=$props()
</script>

<div
    class="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]"
>
    <button
        id="dropdown-scroll"
        type="button"
        class="dropdown-toggle flex items-center"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="User Menu"
        title="User Menu"
    >
        <div class="avatar placeholder">
            <div
                class="bg-secondary-content text-primary w-8 rounded-full !flex items-center justify-center"
            >
                {#if image}
                    <img src={image} class="p-1" alt={company_name} />
                {:else}
                    <span class=""><Icon height={24} icon={icon}/></span>
                {/if}
            </div>
        </div>
    </button>
    <ul
        class="dropdown-menu dropdown-open:opacity-100 max-w-75 hidden w-full space-y-0.5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-scroll"
    >
        <li class="dropdown-header pt-4.5 mb-1 gap-4 px-5 pb-3.5">
            <div class="avatar avatar-online-top">
                <div class="w-10 rounded-full">
                    {#if image}
                        <img src={image} alt={company_name} />
                    {:else}
                        <span class=""><Icon height={32} icon={icon}/></span>
                    {/if}
                </div>
            </div>
            <div>
                <h6 class="text-base-content mb-0.5 font-semibold">
                    {company_name}
                </h6>
                <p class="text-base-content/80 font-medium">{username}</p>
            </div>
        </li>
        <li>{#each option as i}
            <a class="dropdown-item px-3" href={i.url}>
                <span class=""><Icon height={20} icon={i.icon_sec}/></span>
                {i.title}
            </a>
            {/each}
        </li>
        <li class="dropdown-footer p-2 pt-1">
            <a
                class="btn btn-text btn-error btn-block h-11 justify-start px-3 font-normal"
                href="/logout"
            >
                <span class="icon-[tabler--logout] size-5"></span>
                Logout
            </a>
        </li>
    </ul>
</div>