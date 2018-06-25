<template>
    <div class="event-content">
        <div class="event-add">
            <input type="text" class="n-input"
            v-model="content" placeholder="待办事项"
            @keyup.enter="submit">
            <button class="add-btn"
            @click="submit">提交</button>
        </div>
        <div class="event-tab" @click="changeCollapse(0,$event)">未完成
            <span :class="{'close-span': !collapse[0].show}"></span>
        </div>
        <div class="event-box" :style="{'height':'auto','display':'block'}">
            <ul>
                <li class="event-list" v-for="value in getToDo">
                    <input type="checkbox" :key="value.id" @click="moveToDone(value.id)">
                    <div>{{value.content}}</div>
                    <button class="cancel-btn" @click="moveCancel(value.id)">取消</button>
                </li>
            </ul>
        </div>

        <div class="event-tab" @click="changeCollapse(1,$event)">已完成
            <span :class="{'close-span': !collapse[1].show}"></span>
        </div>
        <div class="event-box">
            <ul>
                <li class="event-list" v-for="value in getDone">
                    <input type="checkbox" :key="value.id" checked @click="moveToDo(value.id)">
                    <div>{{value.content}}</div>
                    <span class="event-time">{{value.time}}</span>
                </li>
            </ul>
        </div>

        <div class="event-tab" @click="changeCollapse(2,$event)">已取消
            <span :class="{'close-span': !collapse[2].show}"></span>
        </div>
        <div class="event-box" :class="{'event-box-hide': false}">
            <ul>
                <li class="event-list" v-for="value in getCancel">
                    <div class="event-delete">{{value.content}}</div>
                    <button class="cancel-btn" @click="moveToDo(value.id)">恢复</button>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                content:'',
                collapse:[
                    {
                        show: true,
                    },
                    {
                        show: true,
                    },
                    {
                        show: true,
                    }
                ],
            }
        },
        computed: {
            getToDo(){
                return this.$store.getters.getToDo;
            },
            getDone(){
                return this.$store.getters.getDone;
            },
            getCancel(){
                return this.$store.getters.getCancel;
            },
        },
        methods: {
            submit(){
                let self = this,
                params = {
                    id: 0,
                    type: 1,
                    content: '',
                    time: ''
                };
                self.content = self.content.trim();
                if(self.content){
                    params.content = self.content;
                    self.$store.dispatch('addevent',params);
                    self.content = '';
                    self.$toast('添加成功');
                }
            },
            moveToDone(id){ //移至已完成
                this.$store.dispatch('eventdone', id);
            },
            moveToDo(id){ //移至未完成
                this.$store.dispatch('eventtodo', id);
            },
            moveCancel(id){ //移至已取消
                this.$store.dispatch('eventcancel', id);
            },
            changeCollapse(num, event){  //改变折叠板状态
                const show = this.collapse[num].show;
                if (show) {
                    this.closeCollapse(event);
                } else {
                    this.openCollapse(event);
                }
                this.collapse[num].show = !show;
            },
            closeCollapse(event){ // 关闭折叠面板，即高度变为零
                let ulElement = event.currentTarget.nextElementSibling,  //currenTarget:返回绑定事件的元素，
                //  nextSibling 是获取元素的同级下个节点
                    children = ulElement.getElementsByTagName('ul')[0];
                ulElement.style.height = children.offsetHeight + 'px';
                setTimeout(function(){
                    ulElement.style.height = '0px';
                    setTimeout(function () {
                        ulElement.style.display = 'none';
                    }, 300)
                },10)
            },
            openCollapse(event){ // 打开折叠面板
                let ulElement = event.currentTarget.nextElementSibling,
                    children = ulElement.getElementsByTagName('ul')[0];
                ulElement.style.display = 'block';
                ulElement.style.height = children.offsetHeight + 'px';
                setTimeout(function () {
                    ulElement.style.height = 'auto';
                }, 300)
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .event-add{
        position: relative;
        padding:30px 90px 30px 0;
        font-size: 16px;
        .n-input{
            width:100%;
            height:40px;
            padding:7px 10px;
            line-height: 26px;
            border:1px solid #c0ccda;
            border-radius:4px;
            box-sizing: border-box;
            font-size:inherit;
            &:focus {
                outline: none;
            }
        }
        .add-btn{
            position: absolute;
            right:0;
            top:30px;
            width:80px;
            height:40px;
            line-height: 26px;
            color: #fff;
            /*transition: background .3s ease-in;*/
        }
    }
    .event-content {
        .event-tab {
            position: relative;
            height: 44px;
            line-height: 44px;
            padding-left: 20px;
            border-bottom: 1px solid #fff;
            box-sizing: border-box;
            color: black;
            cursor: pointer;
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
                transform: rotate(135deg);
                transition: transform .3s;
                &.close-span {
                    transform: rotate(45deg);
                }
            }
        }
        .event-box {
            list-style: none;
            overflow: hidden;
            border: {
                left: 1px solid #eee;
                right: 1px solid #eee;
            }
            transition: height .3s;
            .event-list {
                position: relative;
                min-height: 44px;
                line-height: 25px;
                padding: 10px 100px 10px 50px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                color: #373e40;
                input[type=checkbox] {
                    position: absolute;
                    left: 15px;
                    top: 12px;
                    width: 20px;
                    height: 20px;
                }
                .cancel-btn {
                    position: absolute;
                    right: 10px;
                    top: 7px;
                    width: 50px;
                    height: 30px;
                    line-height: 30px;
                    padding: 0;
                    background: #fff;
                    border: 1px solid #c0ccda;
                    color: #666;
                    font-size: 12px;
                }
                .event-time {
                    position: absolute;
                    right: 10px;
                    top: 0;
                    line-height: 44px;
                    font-size: 12px;
                    color: #aaa;
                }
                .event-delete {
                    text-decoration: line-through;
                    color: #999;
                }
            }
        }
    }
</style>