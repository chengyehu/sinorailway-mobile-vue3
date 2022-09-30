<template>
    <div>
        <van-nav-bar title="设备告警" fixed safe-area-inset-top>
            <template #left>
                <van-icon name="ascending" size="26"></van-icon>
            </template>
            <template #right>
                <van-icon name="replay" size="26" />
            </template>
        </van-nav-bar>

        <div style="padding: 60px 15px 60px  15px;">
            <div v-for="(item, index) in warningList.data" :key="index" class="warning-item">

                <div style="flex: 1;">
                    {{item.remark}}
                </div>

                <van-space direction="vertical" style="padding: 10px;display: flex;flex-direction: column;">
                    <van-button style="border-radius: 5px;" @click="deviceDetail(item.id)" color="#7232dd" type="primary" size="mini">标为已处理
                    </van-button>
                    <van-button style="border-radius: 5px;" @click="updateDevice(item.id)" color="#7232dd" type="primary" size="mini">标为已阅读
                    </van-button>
                    <van-button style="border-radius: 5px;" @click="updateDevice(item.id)" color="#ee0a24" type="primary" size="mini">删除此告警
                    </van-button>
                </van-space>
            </div>
            <van-pagination v-model="currentPage" :page-count="12" mode="simple" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { warningSearchApi } from '../../service/warning';

const warningList = reactive({data: []})
const currentPage = ref(1);


const getWarningList = () => {
    let params = {
        size: 10
    }
    warningSearchApi(params).then((res) => {
        console.log(res)
        warningList.data = res.data.data
        
    }).catch((error) => {
        console.log(error)
    })
};

onMounted(()=> {
    getWarningList()
});
</script>

<style scoped>
.warning-item {
    min-height: 90px;
    display: flex;
    margin-bottom: 5px;
    background: rgb(190, 235, 199);
    border-radius: 10px;
    align-items: center;
}

</style>