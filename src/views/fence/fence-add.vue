<template>
    <div>
        <van-nav-bar :title="pageTitle" fixed safe-area-inset-top @click-left="onClickLeft" @click-right="onClickRight">
            <template #left>
                <van-icon name="arrow-left" size="26" />
            </template>
            <template #right>
                <van-icon name="passed" size="26" />
            </template>
        </van-nav-bar>
        <div style="padding: 60px 15px 50px  15px;">
            <van-form>
                <van-cell-group inset>
                    <van-field v-model="value1" label="围栏名称" name="name" placeholder="请输入设备名称" />
                </van-cell-group>
            </van-form>
            <div style="height: 100vw;padding: 60px 15px 60px  15px;">
                <el-amap :show-label="false" :center="center" :zoom="zoom" @click="clickMap" @init="initMap">
                    <el-amap-polygon :path="polygon.path" :visible="polygon.visible" :editable="polygon.edit"
                        :draggable="polygon.draggable" @click="click" />
                </el-amap>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Toast } from 'vant';
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
// 变量定义区
const router = useRouter();
const zoom = ref(15);
const center = reactive([121.5273285, 31.21515044])
const polygon = reactive({
    draggable: false,
    visible: true,
    edit: true,
    path: [],
});
const value1 = ref('');
const result = ref('');
const showPicker = ref(false);

function clickMap(e) {
    console.log('click map: ', e);
    polygon.path.push([e.lnglat.lng, e.lnglat.lat])
    polygon.edit = true
    console.log('poly path: ' + JSON.stringify(polygon.path))
}
function initMap(map) {
    console.log('init map: ', map);
}

function click(e) {
    alert('click GeoJSON');
}

const pageTitle = ref('添加围栏');


const onClickLeft = () => history.back();

const onClickRight = () => {
    Dialog.confirm({
        title: '添加提醒',
        message: '确定要添加该围栏吗？',
    }).then(() => {
        createDevice()
    }).catch(() => {

    });
};




const onConfirm = (value) => {
    result.value = value;
    showPicker.value = false;
};

</script>