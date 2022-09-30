<template>
    <router-view></router-view>
    <van-tabbar fixed v-model="active" route style="position: fixed;">
        <van-tabbar-item to="/device" icon="apps-o">设备</van-tabbar-item>
        <van-tabbar-item to="/fence" icon="notes-o">围栏</van-tabbar-item>
        <van-tabbar-item to="/warning" icon="warning-o">警告</van-tabbar-item>
        <van-tabbar-item to="/center" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const active = ref(0);
        return { active };
    },
};
</script>