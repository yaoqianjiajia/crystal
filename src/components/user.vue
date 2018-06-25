<template>
	<header class="">
		<h3>我的toDo<a class="t-btn" @click="showTools"><span></span></a></h3>	
		<div class="item right" style="position:absolute;top:10px;right:10px;">
			<slot name="right"></slot>
		</div>	
	</header>
</template>
import '../common/css/bootstrap/3.3.6/bootstrap.min.css';
<script>
	export default{
		methods:{
			showTools(){
				this.$emit('tools');
			}
		}
	}
</script>
<style lang="scss" rel="stlylesheet/scss">
	header{
		position:relative;
        width:100%;
        padding:15px auto;
        height:100px;
		h3{
            position: relative;
            width:100%;
            max-width:800px;
            margin:0 auto;
            padding:15px;
            margin-bottom:40px;
            line-height: 70px;
            color: #fff;
            a.t-btn{
                position: absolute;
                right:30px;
                top:35px;
                width:30px;
                height:26px;
                cursor: pointer;
            }
            span{
                position: absolute;
                width:30px;
                height:20px;
                content: '';
                background: #fff;
            }
                
        }
	}
	
</style>