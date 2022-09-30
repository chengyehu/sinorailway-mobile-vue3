<template>
    <div>
        <van-nav-bar title="设备列表" fixed safe-area-inset-top @click-left="onClickLeft" @click-right="onClickRight">
            <template #left>
                <van-icon name="sign" size="26" />
            </template>
            <template #right>
                <van-icon name="add-o" size="26" />
            </template>
        </van-nav-bar>

        <div style="padding: 50px 15px 50px  15px;">
            <div>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="value1" :options="option1" />
                    <van-dropdown-item v-model="value2" :options="option2" />
                </van-dropdown-menu>
            </div>
            <van-pull-refresh v-model="loading" success-text="刷新成功" @refresh="onRefresh">
                <div v-for="(item, index) in deviceList.data" :key="index" class="device-item">
                    <div style="padding: 10px;">
                        <input name="Fruit" type="checkbox" value="" />
                    </div>
                    <div style="flex: 1;margin-left: 10px;">
                        <div style="font-size: 14px;">设备名称：{{item.name}}</div>
                        <div style="font-size: 14px;">从设备数：{{item.subDeviceCount}}</div>
                        <div style="font-size: 14px;">所属单位：{{item.orgName}}</div>
                    </div>
                    <van-space direction="vertical" style="display: flex;flex-direction: column;">
                        <van-button round @click="deviceDetail(item.id)" color="#7232dd" type="primary" size="small">
                            设备详情
                        </van-button>
                        <van-button round @click="updateDevice(item.id)" color="#7232dd" type="primary" size="small">
                            更新设备
                        </van-button>
                    </van-space>
                </div>
            </van-pull-refresh>
        </div>

        <van-popup v-model:show="show" closeable close-icon="close" position="bottom" :style="{ height: '30%' }" />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { deviceListApi } from '../../service/device';
import { Toast } from 'vant';
import axios from 'axios';

let deviceList = reactive({ data: null });
const router = useRouter();

const getDeviceList = () => {
    let params = {

    }
    deviceListApi(params).then((res) => {
        console.log(res)
        deviceList.data = res.data.data
        console.log(deviceList)
    }).catch((error) => {
        console.log(error)
    })
};

const deviceDetail = (id) => {
    console.log(id)
    router.push({
        path: '/device/detail',
        query: {
            id: id
        }
    })

};

const updateDevice = (item) => {
    console.log(item)
};

const onClickLeft = () => show.value = true;

const onClickRight = () => {
    router.push({
        path: '/device/add',
    })
};

const value1 = ref(0);
const value2 = ref('a');
const option1 = [
    { text: '全部状态', value: 0 },
    { text: '正常', value: 1 },
    { text: '失效', value: 2 },
];
const option2 = [
    { text: '全部单位', value: 'a' },
    { text: '中铁集团', value: 'b' },
    { text: '中铁XXX', value: 'c' },
];

const show = ref(false);

const loading = ref(false);
const onRefresh = () => {
    setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
    }, 1000);
};

onMounted(() => {
    
    getDeviceList();
})

</script>

<style scoped>
.device-item {
    height: 90px;
    display: flex;
    margin-bottom: 5px;
    background: rgb(190, 235, 199);
    border-radius: 10px;
    align-items: center;
    padding: 2px 15px;
}
</style>