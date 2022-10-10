<template>
    <div>
        <van-nav-bar title="围栏列表" fixed safe-area-inset-top @click-left="onClickLeft" @click-right="onClickRight">
            <template #left>
                <van-icon name="sign" size="26" />
            </template>
            <template #right>
                <van-icon name="add-o" size="26" />
            </template>
        </van-nav-bar>

        <div style="padding: 60px 15px 60px  15px;">
            <div v-for="(item, index) in fenceList.data" :key="index" class="fence-item">
                <div style="padding: 10px;">
                    <input name="Fruit" type="checkbox" value="" />
                </div>
                <div style="flex: 1;">
                    {{item.name}}
                </div>
                <van-space direction="vertical" style="padding: 10px;display: flex;flex-direction: column;">
                    <van-button style="border-radius: 5px;" @click="fenceDetail(item.id)" color="#7232dd" type="primary" size="mini">查看详情
                    </van-button>
                    <van-button style="border-radius: 5px;" @click="fenceDetail(item.id)" color="#7232dd" type="primary" size="mini">分配围栏
                    </van-button>
                    <van-button style="border-radius: 5px;" @click="updateFence(item)" color="#7232dd" type="primary" size="mini">更新围栏
                    </van-button>
                </van-space>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getFenceListApi } from '../../service/fence';

const fenceList = reactive({ data: [] });
const router = useRouter();

const onClickLeft = () => show.value = true;

const onClickRight = () => {
    router.push({
        path: '/fence/add',
    })
};

const getFenceList = () => {
    let params = {

    }
    getFenceListApi(params).then((res) => {
        console.log(res)
        fenceList.data = res.data.data

    }).catch((error) => {
        console.log(error)
    })
};

const fenceDetail = (id) => {
    console.log(id)
    router.push({
        path: '/fence/detail',
        query: {
            id: id
        }
    })
};

onMounted(() => {
    getFenceList()
});
</script>

<style>
.fence-item {
    min-height: 90px;
    display: flex;
    margin-bottom: 5px;
    background: rgb(190, 235, 199);
    border-radius: 10px;
    align-items: center;
}

.amap-wrapper {
    width: 500px;
    height: 500px;
}
</style>