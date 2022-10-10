<template>
    <van-nav-bar title="设备列表" fixed safe-area-inset-top @click-left="onClickLeft" @click-right="onClickRight">
        <template #left>
            <van-icon name="sign" size="26" />
        </template>
        <template #right>
            <van-icon name="add-o" size="26" />
        </template>
    </van-nav-bar>

    <div style="padding: 50px 15px 50px  15px;">
        <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item v-model="dropMenuValue1" :options="statusList" />
            <van-dropdown-item @change="unitFilterChange" v-model="dropMenuValue2" :options="unitList.data" />
        </van-dropdown-menu>
        <van-pull-refresh v-model="loading" success-text="刷新成功" @refresh="onRefresh">
            <div v-for="(item, index) in deviceList.data" :key="index" class="device-item">
                <div style="padding: 10px;">

                </div>
                <div style="flex: 1;margin-left: 10px;">
                    <div style="font-size: 14px;">设备名称：{{item.name}}</div>
                    <div style="font-size: 14px;">设备编码：{{item.imei}}</div>
                    <div style="font-size: 14px;">从设备数：{{item.subDeviceCount}}</div>
                    <div style="font-size: 14px;">所属单位：{{item.orgName}}</div>
                </div>
                <van-space direction="vertical" style="display: flex;flex-direction: column;">
                    <van-button style="border-radius: 5px;" @click="deviceDetail(item.id)" color="#7232dd"
                        type="primary" size="mini">
                        设备详情
                    </van-button>
                    <van-button style="border-radius: 5px;" @click="distributeDevice(item.id)" color="#7232dd"
                        type="primary" size="mini">
                        设备分配
                    </van-button>
                    <van-button style="border-radius: 5px;" @click="updateDevice(item.id)" color="#7232dd"
                        type="primary" size="mini">
                        更新设备
                    </van-button>
                </van-space>
            </div>
            <van-pagination v-model="currentPage" :page-count="12" mode="simple" />
        </van-pull-refresh>
    </div>
    <van-popup v-model:show="distributePopupShow" closeable close-icon="close" position="bottom"
        :style="{ height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }">
        <van-space style="padding: 15px;">
            <van-field v-model="unitName" is-link readonly name="picker" label="所属机构" placeholder="点击选择机构"
                @click="showPicker = true" />
            <van-button style="border-radius: 5px;width: 100%;" @click="distributeDeviceAction" color="#7232dd"
                type="primary" size="small">分配</van-button>
            <van-popup v-model:show="showPicker" position="bottom">
                <van-picker :columns="pureUnitList.data" @confirm="onSelectUnitConfirm" @cancel="showPicker = false" />
            </van-popup>
        </van-space>
    </van-popup>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { deviceListApi } from '../../service/device';
import { getUnitsListApi } from '../../service/units';
import { loginApi } from '../../service/login';
import { setToken } from '../../utils/auth';
import { Toast } from 'vant';
import { Dialog } from 'vant';
import md5 from 'js-md5';
import axios from 'axios';
import Qs from 'qs'

// 变量定义区
let deviceList = reactive({ data: null });
const router = useRouter();

const dropMenuValue1 = ref(0);
const dropMenuValue2 = ref(0);
const unitList = reactive({ data: [] });
const pureUnitList = reactive({ data: [] });
const statusList = [
    { text: '全部状态', value: 0 },
    { text: '正常', value: 1 },
    { text: '失效', value: 2 },
];
const currentPage = ref(1);

const deviceListStatus = ref();
const deviceListOrgId = ref('');

const distributePopupShow = ref(false);

const loading = ref(false);

const unitName = ref('');
const showPicker = ref(false);

const unitFilterChange = (value) => {
    console.log(value)
}
// 获取ticket的安卓内置方法
const getTicket = () => {

}

// 获取设备列表
const getDeviceList = () => {
    let params = {
        status: deviceListStatus.value,
        orgId: deviceListOrgId.value
    }
    deviceListApi(params).then((res) => {
        console.log(res)
        deviceList.data = res.data.data
        console.log(deviceList)
    }).catch((error) => {
        console.log(error)
        Dialog.alert({
            title: '标题',
            message: JSON.stringify(error),
        }).then(() => {
            // on close
        });
    })
};
// 跳转设备详情页面
const deviceDetail = (id) => {
    console.log(id)
    router.push({
        path: '/device/detail',
        query: {
            id: id
        }
    })

};
// 跳转更新设备页面
const updateDevice = (id) => {
    router.push({
        path: '/device/update',
        query: {
            id: id,
        }
    })
};
// 唤起分配设备到单位弹窗
const distributeDevice = (id) => {
    distributePopupShow.value = true
};
const onSelectUnitConfirm = (value) => {
    unitName.value = value.text;

    showPicker.value = false;

};
// 分配设备到单位
const distributeDeviceAction = () => {

};
// 获取单位列表
const getUnitList = () => {
    let params = {}
    getUnitsListApi(params).then((res) => {
        // 增加全部单位id，筛选时需注意区分
        unitList.data = [{ text: '全部单位', value: 0 }]
        for (let i = 0; i < res.data.data.length; i++) {
            unitList.data.push({
                text: res.data.data[i].name,
                value: res.data.data[i].id,
            });
            pureUnitList.data.push({
                text: res.data.data[i].name,
                value: res.data.data[i].id,
            });
        }
    }).catch((error) => {

    });
};
// 导航栏左侧点击事件
const onClickLeft = () => { };
// 导航栏右侧点击事件
const onClickRight = () => {
    router.push({
        path: '/device/add',
        query: {
            action: 'add'
        }
    })
};
// 下拉刷新设备列表
const onRefresh = () => {
    setTimeout(() => {
        Toast({ message: '刷新成功', position: 'bottom', });
        loading.value = false;
    }, 1000);
};
// 挂载初始化执行
onMounted(() => {
    let url = window.location.href;
    const ticket = JSON.parse(window.zTAndroidInterface.getLoginUserTicket()).ticket;
    let data = Qs.stringify({
        service: "http://172.16.1.8:2022"
    })
    axios({
        method: "post",
        url: "/auth/v1/tickets/" + ticket,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data
    }).then(res => {
        loginApi({
            password: md5("sinopact" + md5('dedede')),
            username: 'dedeede',
            ticket: res.data,
            type: 'mobile'
        }).then(loginRes => {
            if (loginRes.data.message === 'OK') {
                setToken(loginRes.data.data.id_token);
                getUnitList();
                getDeviceList();
                Toast({ message: '登陆成功！', position: 'bottom', });
                router.push({
                    path: '/device',
                })
            } else {
                //message.info(res.data.message);
            }
        }).catch(loginError => {
            Dialog.alert({
                title: '失败标题',
                message: JSON.stringify(loginError),
            }).then(() => {

            });
        })
    }).catch(error => {
        Dialog.alert({
            title: '错误标题',
            message: JSON.stringify(error),
        }).then(() => {

        });
    })


    // console.log(url.split("=")[0].split("?")[1])
    // if (url.split("=")[0].split("?")[1] === 'ticket') {

    // }
    getUnitList();
                getDeviceList();

})
</script>

<style scoped>
.device-item {
    min-height: 90px;
    display: flex;
    margin-bottom: 5px;
    background: rgb(190, 235, 199);
    border-radius: 10px;
    align-items: center;
    padding: 15px 15px;
}


.checkbtn {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    position: relative;
}

input[type="checkbox"]:checked+span {
    background-color: #409eff;
    border-color: #409eff;
}

.checkbtn::after {
    content: '';
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    width: 5px;
    height: 10px;
    position: absolute;
    top: -2px;
    left: 3px;
    transform: rotate(45deg) scaleY(0);
    /* transform-origin: center; */
    /* 过渡的属性	过渡的时长	曲线		延迟时间 */
    transition: transform 0.15s ease-in 0.05s;
}

input[type="checkbox"]:checked+span::after {
    transform: rotate(45deg) scaleY(1);
}
</style>