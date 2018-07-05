<template>
	<div class="container">
			<table class="mytable" style="background:none">
				<tr>
					<td><p>我的toDo</p></td>
					<td><div class="signout"><router-link to="/signout">退出登录</router-link></div></td>
				</tr>
			</table>

		<div style="float: left;width: 25%;margin-left:0">
			<h3>代办清单</h3>
			<table class="table table-hover table-striped">
				<tr v-for="qingdan, index in qingdans" :key="index" v-on:click="listCurrpage(qingdan.qid)">
					<td>
						<div>{{qingdan.name}}</div>
					</td>
					<td v-if="qingdan.qid>2"><a href="#" @click="edit(qingdan)">编辑</a>&nbsp;&nbsp;
						<a href="#" @click="deleteQingdan(index)">删除</a></td>
				</tr>
				<tr>
					<td><input type="text" class="form-control" v-model="newlist.name"  @keyup.enter="saveList" placeholder="新建清单"></td>
					<td><button type="button" class="btn glyphicon glyphicon-plus" v-on:click="saveList"></button></td>
				</tr>
			</table>
		</div>

		<div style="float: left;width: 35%;margin-left:15px;">
			<h3>代办事项</h3>
			<table class="table table-hover text-center table-striped">
				<tr>
					<td><input type="text" class="form-control" v-model="newtodo.tname" @keyup.enter="saveTodo"></td>
					<td><button type="button" class="btn glyphicon glyphicon-plus"
					v-on:click="saveTodo"></button></td>
				</tr>
				<div class="event-tab" @click="changeCollapse(0,$event)">未完成<span>{{todo}}</span>
            		<span :class="{'close-span': !collapse[0].show}"></span>
        		</div>
        		<div class="event-box" :style="{'height':'auto','display':'block'}">
        			<tr style="height:0"></tr>
					<tr v-for="todo, index in todos" :key="index" v-if="todo.pageid === currPage && !todo.flag"> 
						<td><input type="checkbox" @click="todo.flag = !todo.flag"></td>
						<td>
							<div>{{todo.tname}}</div>
						</td>
						<td><a href="#" @click="editTodo(todo)">编辑</a>&nbsp;&nbsp;
							<a href="#" @click="deleteTodo(index)">删除</a></td>
					</tr>
				</div>
				<div style="height:1px;width:320px;background-color:blue;"></div>
				<div class="event-tab" @click="changeCollapse(1,$event)">已完成<span>{{done}}</span>
            	<span :class="{'close-span': !collapse[1].show}"></span>
        		</div>
        		<div class="event-box">
        			<tr style="height:0"></tr>
        			<tr v-for="todo,index in todos" v-if="todo.pageid === currPage && todo.flag">
        				<td><input type = "checkbox" @click="todo.flag = !todo.flag"></td>
        				<td><div>{{todo.tname}}</div></td>
        				<td><a href="#" @click="editTodo(todo)">编辑</a>&nbsp;&nbsp;
							<a href="#" @click="deleteTodo(index)">删除</a></td>
        			</tr>
        		</div>
			</table>
		</div>

		<div style="float: left;width: 35%;margin-left:15px;">
			<h3>所有事项</h3>
			<div class="search">
				<input type="text" class="searchBox" v-model="searchVal">
				<button class="btn">搜索</button>
			</div>
			<table class="table table-hover table-striped">
				<tr v-for="(item, key) in list">
					<td>
						<div>{{item.tname}}</div>
					</td>
					<td><a href="#" @click="deleteTodo(index)">删除</a></td>
				</tr>	
			</table>
		</div>
	</div>

</template>

<script>
	import '../../source/css/bootstrap/3.3.6/bootstrap.min.css';
	export default {
		data() {
			return {
				collapse:[{show: false},{show: false}],
				currPage: 0,
				qingdans: [{
					qid:1,
					name: '我的一天'
				},{
					qid:2,
					name: '我的toDo'
				}],
				newlist: {qid: 0,name: ''},
				todos: [{
					flag: false,
					tid: 1,
					pageid: 1,
					tname: 'web大作业'
				}],
				newtodo:{flag: false, tid: 0, pageid: 0, tname: ''},
				searchVal: ''
			}
		},
		methods: {
			saveList: function(event){
				if(this.newlist.qid === 0){
					if(this.newlist.name !== ''){
					this.newlist.qid = this.qingdans.length + 1;
					this.qingdans.push(this.newlist);
					}
				}
				this.newlist = {qid: 0, name: ''};
			},
			saveTodo: function(event){
				if(this.newtodo.tid === 0){
					if(this.newtodo.tname !== ''){
						this.newtodo.pageid = this.currPage;
						this.newtodo.tid = this.todos.length + 1;
						this.todos.push(this.newtodo);
					}
				}
				this.newtodo = {flag: false, tid: 0, pageid: 0,  tname: ''};
			},
			listCurrpage:function(index){
				this.currPage = index;
			},
			deleteQingdan:function(qid){
				this.qingdans.splice(qid, 1);
			},
			edit: function(qingdan){
				this.newlist = qingdan;
			},
			deleteTodo:function(tid){
				this.todos.splice(tid,1);
			},
			editTodo: function(todo){
				this.newtodo = todo;
			},
			 changeCollapse:function(num, event){  //改变折叠板状态
                const show = this.collapse[num].show;
                if (show) {
                    this.closeCollapse(event);
                } else {
                    this.openCollapse(event);
                }
                this.collapse[num].show = !show;
            },
            closeCollapse:function(event){ // 关闭折叠面板，即高度变为零
                let ulElement = event.currentTarget.nextElementSibling,  //currenTarget:返回绑定事件的元素，
                //  nextSibling 是获取元素的同级下个节点
                    children = ulElement.getElementsByTagName('tr')[0];
                ulElement.style.height = children.offsetHeight + 'px';
                setTimeout(function(){
                    ulElement.style.height = '0px';
                    setTimeout(function () {
                        ulElement.style.display = 'none';
                    }, 300)
                },10)
            },
            openCollapse:function(event){ // 打开折叠面板
                let ulElement = event.currentTarget.nextElementSibling,
                    children = ulElement.getElementsByTagName('tr')[0];
                ulElement.style.display = 'block';
                ulElement.style.height = children.offsetHeight + 'px';
                setTimeout(function () {
                    ulElement.style.height = 'auto';
                }, 300)
            }
        },
        created(){
                this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
        },
        watch:{
            todos:{
                handler(){
                    localStorage.setItem('data',JSON.stringify(this.todos));
                },
                deep:true
            }
        },
        computed:{ 
        	todo(){
        		return this.todos.filter(item => item.flag === false).length;  //计算属性，根据todo.flag过滤，=> 是箭头函数，是一种简短函数
        	},
        	done(){
        		return this.todos.filter(item => item.flag === true).length;  //返回flag是false的事项
        	},
        	list: function(){
        		var arr = []; //声明一个空数组来存放数据
        		for(var i=0;i<this.todos.length;i++){
        			if(this.todos[i].tname.search(this.searchVal) !=-1){
        				arr.push(this.todos[i]);
        			}
        		}
        		return arr;
        	}
        }
	}
</script>

<style type="text/css">
	.container{
		background-image:url(../../source/images/index.jpg);
		background-size:cover;
   		background-repeat:no-repeat;
   		height:800px;
	}
	.mytable{
		margin-top:20px;
	}
	.signout{
		magin-left:80px;
		font-size:18px;
	}
	p{
		font-size:36px;
		vertical-align:middle;
	}
	tr{
		height:35px;
		line-height:35px;
		overflow:hidden;
	}
	tr:hover {
		 background: #0099E5;
	}
	hr{
		size:72px;
	}
	h4{
		margin-left:40px;
	}
	table{	
		background-color: rgba(178,235,216,0.7);
	}
	.btn{
		margin-right:35px;
	}
	.event-tab {
        position: relative;
        height: 44px;
        line-height: 44px;
        padding-left: 20px;
        border-bottom: 1px solid #fff;
        box-sizing: border-box;
        color: black;
        cursor: pointer;
    }
    span {
        position: absolute;
        right: 20px;
        top: 15px;
        width: 10px;
        height: 10px;
        content: '';
        border: {
            top: 2px solid #fff;
            right: 2px solid #fff;
        }
        transform: rotate(360deg);
        background:white;
    }
    .close-span {
        transform: rotate(45deg);
    }
    .search{
    	background-color: rgba(178,235,216,0.7);
    }
    .searchBox{
    	width:300px;
    }
</style>