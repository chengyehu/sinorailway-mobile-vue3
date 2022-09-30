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
import { createDeviceApi } from '../../service/device';

const router = useRouter();
const pageTitle = ref('添加设备');
const onClickLeft = () => history.back();
const onClickRight = () => {
    Dialog.confirm({
        title: '添加提醒',
        message: '确定要添加该设备吗？',
    }).then(() => {
        createDevice()
    }).catch(() => {

    });
};
const name = ref('');
const imei = ref('');
const unitId = ref('');
const unitList = reactive({ data: [] });
const unitName = ref('');
const showPicker = ref(false);
const onConfirm = (value) => {
    unitName.value = value.text;
    unitId.value = value.keyId;
    showPicker.value = false;
};

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

const createDevice = () => {
    let params = {imei: imei.value, name: name.value, orgId: unitId.value};
    createDeviceApi(params).then((res) => {
        console.log(res)
    }).catch((error) => {

    })
};

onMounted(() => {
    getUnitList()
})

</script>
