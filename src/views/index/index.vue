<template>
  <div :class="[getTheme]">
    <n-user @tools="changePages">
    <router-link slot="right" to="/signout">退出</router-link>
    </n-user>
    
    <section class="container" :class="{'hide':table}">
      <n-list></n-list>
      <n-sidebar :is-show="tools"
            @opentable="table =true;tools=false"
            @opentheme="theme = true;tools = false"
      ></n-sidebar>
    </section>

    <transition name="dialog">
        <n-dialog v-show="dialog" :msg="tips" @cancel="dialog=false"
            @sure="sureDialog"></n-dialog>
    </transition>    

    <n-table @deldialog="delData"
    :is-show="table" @close="table=false">
    </n-table>
    <n-theme :is-show="theme" @close="theme = false"></n-theme>
  </div>
</template>

<script>
  import nUser from '../../components/user.vue';
  import nTotallist from '../../components/total_list.vue';
  import nList from '../../components/event_list.vue';
  import nSidebar from '../../components/sidebar.vue';
  import nTable from '../../components/event_table.vue';
  import nDialog from '../../components/dialog.vue';
  import nTheme from '../../components/theme.vue';
  import { mapState } from 'vuex';

  export default{
    data(){
        return {
            tools:false,
            table:false,
            theme:false,
            dialog:false,
            dialog_type:'',
            tips:'',
            del_info:{
                index:0,
                id:0
            }
      }
    },
    components: {
      nUser,nTotallist,nList,nSidebar,nTable,nDialog,nTheme
    },
    computed:{
        ...mapState({ user: state => state.user }),
        getTheme(){
            return this.$store.getters.getTheme; 
        }
    },
    methods:{
        changePages(){
            if(this.table){
                this.table=!this.table;
            }else if(this.theme){
                this.theme = !this.theme;
            }else{
                this.tools=!this.tools
            }
        },
        delData(index,id){
            this.dialog = true;
            this.dialog_type = 'del';
            this.tips = '删除后无法恢复，确认删除吗？';
            this.del_info = {
                index: index,
                id : id
            }
        },
        sureDialog(){
            const self = this;
            switch (self.dialog_type){
                case 'del':
                    self.$store.dispatch('delevent',self.del_info);
                    self.$toast('删除成功');
                    break;
            }
            this.dialog = false;
        }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" src="./theme.scss"></style>
<style lang="scss" rel="stylesheet/scss">
    html,body,ul,li,input,p{
        margin:0;
        padding:0;
    }
    body{
        font-size: 16px;
        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
    }
    input,button{
        -webkit-tap-highlight-color: transparent;
    }
    input[type=text]{
        -webkit-appearance: none;
    }
    button{
        padding:7px 0;
        outline: none;
        text-align: center;
        border-radius: 4px;
        box-sizing: border-box;
        font:{
            size:inherit;
            family: inherit;
        }
        cursor: pointer;
    }
    html,body{
        height: 100%;
    }
    ::-webkit-scrollbar{
        width: 0;
    }
    body,#app{
        width:100%;
        overflow-x: hidden;
    }
    #app{
        height: 100%;
        padding-bottom: 60px;
        box-sizing: border-box;
    }

    ul{
        list-style: none;
    }
    .container{
        width:100%;
        padding: 0 10px;
        max-width:800px;
        margin:0 auto;
        box-sizing: border-box;
        &.hide{
            display: none;
        }
    }
    .dialog-enter-active, .dialog-leave-active {
        transition: opacity .3s;
    }
    .dialog-enter, .dialog-leave-to{
        opacity: 0;
    }
</style>
