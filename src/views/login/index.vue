<template>
  <div>
    <form class="login" v-on:submit.prevent="submit">
      <h2 style="color:rgba(20,192,200,0.8);">登录</h2>
      <div class="line">
        <input type="text" placeholder="输入你的用户名" v-model="form.name">
      </div>
      <div class="line"> 
        <input type="password" placeholder="输入你的密码" v-model="form.passwd">
      </div>
      <button>登录</button>
    </form>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNIN } from '../../store/user'
    export default {
        data() {
      return {
        btn: false, //true 已经提交过， false没有提交过
        form: {
          name: '',
          passwd:''
        }
      }
    },
    methods: {
      ...mapActions([USER_SIGNIN]),
      submit() {
        this.btn = true;
        if(this.form.name === 'kaka' && this.form.passwd==='123456') {
          this.USER_SIGNIN(this.form);
          this.$router.replace({ path: '/index' });
        }
        else this.$toast('没有此用户或密码错误'); 
      }
    }
    }
</script>

<style>
  .login {
    width:600px;
    background-image:url(../../source/images/login.jpg);
    background-size:cover;
    background-repeat:no-repeat;
    width:600px;text-align:center;
    padding-top:20px;
    padding-bottom:60px;
    margin:0 auto;
    margin-top:50px;
    font-size:24px;
    .line {
      padding: 5px;
      input {
        padding: 0 10px;
        line-height: 28px;
      }
    }
    button {
      width:80px;
      height:20px;
      padding: 0 20px;
      margin-top: 20px;
      line-height: 28px;
    }
  }
</style>