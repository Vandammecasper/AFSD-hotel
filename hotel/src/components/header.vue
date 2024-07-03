
<template>
    <div class="w-screen border-b-2 border-secondary px-12 absolute z-20 flex justify-between">
        <RouterLink to="/">
            <h2 class="text-secondary text-xl font-bell font-bold my-6">THE CONTINENTAL</h2>
        </RouterLink>
        <div class="flex gap-12">
            <RouterLink to="/">
                <h2 class="my-6 text-xl text-secondary font-bell font-normal">MY RESERVATIONS</h2>
            </RouterLink>
            <div class="border-l-2 border-secondary py-6 pl-12">
                <RouterLink to="/">
                    <h2 class="text-xl text-secondary font-bell font-normal">LOGIN</h2>
                </RouterLink>
            </div>
        </div>
    </div>
    <RouterView/>
</template>