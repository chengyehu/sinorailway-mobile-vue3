<template>
    <div>
        <van-nav-bar title="围栏详情" fixed safe-area-inset-top @click-left="onClickLeft" @click-right="onClickRight">
            <template #left>
                <van-icon name="arrow-left" size="26" />
            </template>
            <template #right>
                <van-icon name="delete-o" size="26" />
            </template>
        </van-nav-bar>
    </div>
    <div style="height: 100vw;padding: 60px 15px 60px  15px;">
        <el-amap :show-label="false" :center="center" :zoom="zoom" @click="clickMap" @init="initMap">
            <el-amap-polygon :path="polygon.path" :visible="polygon.visible" :editable="polygon.edit"
                :draggable="polygon.draggable" @click="click" />
        </el-amap>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const zoom = ref(15);
const center = reactive([121.5273285, 31.21515044])

const polygon = reactive({
    draggable: false,
    visible: true,
    edit: false,
    path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
})

function clickMap(e) {
    console.log('click map: ', e);
}
function initMap(map) {
    console.log('init map: ', map);
}

function click(e) {
    alert('click GeoJSON');
}

const onClickLeft = () => history.back();

const onClickRight = () => console.log('按钮');

</script>