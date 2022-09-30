<template>
    <van-form>
        <van-cell-group inset>
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" v-on:click="onLogin">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { loginApi } from '../../service/login';
import { setToken } from '../../utils/auth';
import md5 from 'js-md5';

const username = ref('');
const password = ref('');
const onLogin = () => {
    console.log('submit', username.value);
    loginApi({
        password: md5("sinopact" + md5(password.value)),
        username: username.value
    }).then(res => {
        if (res.data.message === 'OK') {
            setToken(res.data.data.id_token);
            console.log(res)
            //message.success("登陆成功！");
            //navigate('/admin/device');
        } else {
            //message.info(res.data.message);
        }
    }).catch(error => {
        //message.error(error);
    })
};

</script>