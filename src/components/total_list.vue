<template>
	<div class= "totallist">
        <div class= "selflist">
            <ul>
                <li class="myday" @click="openMyday"><a href ="#">&nbsp;&nbsp;<span class="glyphicon glyphicon-star">
                  </span>&nbsp;&nbsp;我的一天 </a></li>
                <li class="todoit" @click="openTodoit"><a href ="#">&nbsp;&nbsp;<span class= "glyphicon glyphicon-home">
                  </span>&nbsp;&nbsp;ToDo </a></li>
            </ul>
        </div>
    </div>	
</template>
<script>
  export default{
    data(){
      return {

      }
    },
    computed:{
      getDate(){
        const self = this;
        return JSON.stringify(self.$store.state);
      }
    },
    methods:{
      openMyday(){

      }
    }
  }
</script>
<style>
  .totallist{
    width:30%;
    position:relative;
  }
  .selflist{
    pasition:relative;
    margin:15px auto 15px 40px;
  }
  .selflist a{
    text-decoration:none;
    display:block;
    color:#C4BABA;
    height:35px;
    color:black;
  }
  .selflist li{
    height:35px;
    line-height:35px;
    overflow:hidden;
    margin-left:-40px;
  }
  .myday{
    background-color:rgba(233,243,244,0.6);
  }
  .selflist li:hover{
    background :#D3F4E8;
  }
</style>
