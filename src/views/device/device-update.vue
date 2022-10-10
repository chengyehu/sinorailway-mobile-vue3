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
                    <van-field v-model="name" label="设备名称" name="name" placeholder="请输入设备名称" />
                    <van-field v-model="imei" label="设备编码" name="imei" placeholder="请输入设备IMEI" />
                    <van-field v-model="unitName" is-link readonly name="picker" label="所属机构" placeholder="点击选择机构"
                        @click="showPicker = true" />
                    <van-popup v-model:show="showPicker" position="bottom">
                        <van-picker :columns="unitList.data" @confirm="onConfirm" @cancel="showPicker = false" />
                    </van-popup>
                    <van-field v-model="status" is-link readonly name="picker" label="禁启状态" placeholder="点击选择禁启状态"
                        @click="showStatusPicker = true" />
                    <van-popup v-model:show="showStatusPicker" position="bottom">
                        <van-picker :columns="statusList" @confirm="onStatusConfirm" @cancel="showStatusPicker = false" />
                    </van-popup>

                </van-cell-group>
            </van-form>
        </div>

    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Toast } from 'vant';
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
import { getUnitsListApi } from '../../service/units'
import { createDeviceApi, deviceDetailApi } from '../../service/device';
// 变量定义区
const router = useRouter();
const pageTitle = ref('更新设备');
const name = ref('');
const imei = ref('');
const unitId = ref('');
const unitList = reactive({ data: [] });
const unitName = ref('');
const status = ref('');
const showPicker = ref(false);
const showStatusPicker = ref(false);
const statusList = [
    {
        text: "启用",
        keyId: '0'
    },
    {
        text: '禁用',
        keyId: '1'
    }
];

// 导航左侧点击事件
const onClickLeft = () => history.back();
// 导航右侧点击事件
const onClickRight = () => {
    Dialog.confirm({
        title: '更新提醒',
        message: '确定要更新该设备吗？',
    }).then(() => {
        createDevice()
    }).catch(() => {

    });
};
// 选择机构确认回调
const onConfirm = (value) => {
    unitName.value = value.text;
    unitId.value = value.keyId;
    showPicker.value = false;
};
// 选择状态确认回调
const onStatusConfirm = (value) => {
    status.value = value.text;
    showStatusPicker.value = false;
};
// 获取单位列表
const getUnitList = () => {
    let params = {}
    getUnitsListApi(params).then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
            unitList.data.push({
                text: res.data.data[i].name,
                keyId: res.data.data[i].id,
            })
        }
    }).catch((error) => {

    });
};
// 获取设备详情
const getDeviceDetail = (id) => {
    let params = {
        deviceId: id
    }
    deviceDetailApi(params).then((res)=> {
        console.log(res)
        name.value = res.data.device.name;
        imei.value = res.data.device.imei;
        unitName.value = res.data.org.name;
        if(res.data.device.status === 1) {
            status.value = '启用'
        } else if (res.data.device.status === 0) {
            status.value = '禁用';
        }
        
    }).catch((error) => {

    })
};
// 
const createDevice = () => {
    let params = { imei: imei.value, name: name.value, orgId: unitId.value };
    createDeviceApi(params).then((res) => {
        console.log(res)
    }).catch((error) => {

    })
};

onMounted(() => {
    const url = window.location.href;
    let deviceId = url.split("id=")[1];
    console.log(deviceId)
    getDeviceDetail(deviceId);
    getUnitList()
})

</script>
