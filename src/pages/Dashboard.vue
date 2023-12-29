<script setup>
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue';
import useAuth from '../composables/useAuth.js';
import { router } from '../main.js';
import DarkButton from '../components/DarkButton.vue';

const { checkAuth } = useAuth();

setInterval(async () => {
    if (!(await checkAuth())) {
        await router.push('/');
    }
}, 300000);

</script>

<template>
    <div class="absolute right-7 top-5">
        <DarkButton />
    </div>
    <div class="h-full w-screen flex">
        <DashboardSidebar />
        <div class="w-full overflow-y-auto h-screen pb-10">
            <router-view></router-view>
        </div>
    </div>
</template>