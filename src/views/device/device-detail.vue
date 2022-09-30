<template>
    <div>
        <van-nav-bar title="设备详情" fixed safe-area-inset-top @click-left="onClickLeft" @click-right="onClickRight">
            <template #left>
                <van-icon name="arrow-left" size="26" />
            </template>
            <template #right>
                <van-icon name="delete-o" size="26" />
            </template>
        </van-nav-bar>
        <div style="padding: 60px 15px 60px  15px;">
            <div class="device-info">
                <div style="color: white;font-weight: bold;margin: 10px 0;">主设备信息</div>
                <div style="color: white;margin: 10px 0;">设备名称：{{deviceDetail.data === null ? '未命名设备' :
                deviceDetail.data.name}}</div>
                <div style="color: white;margin: 10px 0;">设备编码：{{deviceDetail.data === null ? '正在获取数据' :
                deviceDetail.data.imei}}</div>
                <div style="color: white;margin: 10px 0;">设备电量：{{deviceDetail.data === null ? '正在获取数据' :
                deviceDetail.data.bat}}</div>
                <div style="color: white;margin: 10px 0;">设备位置：{{deviceDetail.data === null ? '正在获取数据' : ('[' +
                deviceDetail.data.lon + ',' + deviceDetail.data.lat + ']')}}</div>
                <div style="color: white;margin: 10px 0;">禁启状态：{{deviceDetail.data === null ? '正在获取数据' :
                deviceDetail.data.status === 0 ? '失效' : '正常'}}</div>
                <div style="color: white;margin: 10px 0;">创建时间：{{deviceDetail.data === null ? '正在获取数据' :
                deviceDetail.data.createTime}}</div>
            </div>
            <div class="device-location">
                <div style="color: white;font-weight: bold;margin: 10px 0;">主设备实时位置</div>
                <div style="height: 40vw;">
                    <el-amap :show-label="false" :center="center" :zoom="zoom" @click="clickMap" @init="initMap">
                        <el-amap-polygon :path="polygon.path" :visible="polygon.visible" :editable="polygon.edit"
                            :draggable="polygon.draggable" @click="click" />
                    </el-amap>
                </div>
            </div>
            <div class="sub-device-list">
                <div style="color: white;font-weight: bold;margin: 10px 0;">从设备列表</div>
                <div v-for="(item, index) in subDeviceList.data" class="sub-device-item"
                    style="display: flex;padding: 15px;align-items: center;">
                    <div style="flex: 1;">
                        <div>{{item.name}}</div>
                        <div>电量：{{item.bat}}</div>
                        <div>电流：{{item.cur}}A</div>
                        <div>SW1：{{item.sw1}}</div>
                        <div>SW2：{{item.sw2}}</div>
                        <div>SW3：{{item.sw3}}</div>
                        <div>阈值：{{item.curLimit}}A</div>
                    </div>
                    <div style="display: flex;flex-direction: column;">
                        <van-button @click="setLimitValue(item.curLimit)" color="#7232dd" type="primary" size="small"
                            style="margin-bottom: 10px;">设置阈值
                        </van-button>
                        <van-button @click="renameDevice(item.name)" color="#7232dd" type="primary" size="small"
                            style="margin-bottom: 10px;">设备改名
                        </van-button>
                        <van-button color="#7232dd" type="primary" size="small" style="margin-bottom: 10px;">数据趋势
                        </van-button>
                    </div>
                </div>

            </div>
        </div>
        <van-popup v-model:show="currentShow" closeable close-icon="close" position="bottom" :style="{ height: '30%' }">
            <div style="padding: 30px;display: flex;flex-direction: column;align-items: center;">
                <div>设置电流阈值</div>
                <div style="padding: 15px;">
                    <van-stepper v-model="currentValue" @change="changeCurrentValue" />
                </div>
                <div>
                    <van-button color="#7232dd" type="primary" size="small">确定</van-button>
                </div>
            </div>
        </van-popup>
        <van-popup v-model:show="renameShow" closeable close-icon="close" position="bottom" :style="{ height: '30%' }">
            <div style="padding: 30px;display: flex;flex-direction: column;align-items: center;">
                <div>更改设备名称</div>
                <div style="padding: 15px;">
                    <van-field label="设备名称" v-model="renameValue" name="validator" />
                </div>
                <div>
                    <van-button color="#7232dd" type="primary" size="small">确定</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { deleteDeviceApi, deviceDetailApi } from '../../service/device';
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';

const subDeviceList = reactive({ data: [] });
const deviceDetail = reactive({ data: null });
const currentValue = ref(100);
const router = useRouter();
const currentShow = ref(false);
const renameShow = ref(false);
const renameValue = ref('')

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

const setLimitValue = (value) => {
    currentShow.value = true;
    currentValue.value = value;
};

const changeCurrentValue = (value) => { }

const renameDevice = (value) => {
    renameShow.value = true;
    renameValue.value = value;
}

const onClickLeft = () => history.back();

const onClickRight = () => {
    Dialog.confirm({
        title: '提醒',
        message: '确定要删除该设备吗？',
    }).then(() => {
        deleteDevice(deviceDetail.data.id)
    }).catch(() => {

    });
};

const deleteDevice = (id) => {
    let params = {
        deviceId: id
    }
    deleteDeviceApi({ params }).then((res) => {
        console.log(res)
        router.push({
            path: '/device',
        })
        Toast.success('删除成功！')
    }).catch((error) => {

    })
};

const getDeviceDetail = (id) => {
    console.log(id)
    let params = {
        deviceId: id,
        type: 'sub',
    }
    deviceDetailApi(params).then((detailRes) => {

        deviceDetail.data = detailRes.data.device;
        subDeviceList.data = detailRes.data.deviceSubs;

        console.log(deviceDetail.data);
        console.log(JSON.stringify(subDeviceList.data));

    }).catch((detailError) => {
        console.log(detailError)
    })
}

onMounted(() => {
    console.log("设备详情");
    const url = window.location.href;
    console.log(url.split("=")[1])
    getDeviceDetail(url.split("=")[1])
})
</script>

<style scoped>
.device-info {
    min-height: 20px;
    background: #06F;
    -moz-box-shadow: 1px 2px 5px #06C;
    -webkit-box-shadow: 1px 2px 5px #06C;
    box-shadow: 1px 2px 5px #06C;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 15px 20px;
}

.device-location {
    min-height: 20px;
    background: #06F;
    -moz-box-shadow: 1px 2px 5px #06C;
    -webkit-box-shadow: 1px 2px 5px #06C;
    box-shadow: 1px 2px 5px #06C;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 15px 20px;
}

.sub-device-list {
    min-height: 50px;
    background: #06F;
    -moz-box-shadow: 1px 2px 5px #06C;
    -webkit-box-shadow: 1px 2px 5px #06C;
    box-shadow: 1px 2px 5px #06C;
    border-radius: 10px;
    padding: 15px 20px;
}

.sub-device-item {
    min-height: 50px;
    background: #eff;
    margin-bottom: 15px;
    border-radius: 10px;
}
</style>