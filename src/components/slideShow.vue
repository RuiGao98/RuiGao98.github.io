<template>
	<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
		<div class="slide-img">
			<a :href="slides[nowIndex].href">
				<transition name="slide-trans">
					<img v-if="isShow" :src="slides[nowIndex].src" alt="图片加载中">
				</transition>
				<transition name="slide-trans-old">
					<img v-if="!isShow" :src="slides[nowIndex].src" alt="图片加载中">
				</transition>
			</a>
		</div>
		<h2>{{ slides[nowIndex].title}}</h2>
		<ul class="slide-pages">
			<li @click="goto(preIndex)">&lt</li>
			<li v-for="(item,index) in slides">
<!-- 				通过给a绑定样式来改变选中时的样式 -->
			<a @click="goto(index)" :class="{on: index == nowIndex}">{{ index }}</a>
			</li>
			<li @click="goto(nextIndex)">&gt</li>
		</ul>
	</div>
</template>

<script>
	export default {
		//接收从父组件获得的数据
		props:{
			slides:{
				type: Array,
				default: []
			},
			//父组件传进来inv
			inv:{
				type: Number,
				default: 1000
			}
		},
		data(){
			return{
				nowIndex: 0,
				isShow: true
			}
		},
		computed: {
			preIndex(){
				if (this.nowIndex === 0) {
					return this.nowIndex = this.slides.length -1
				}else{
					return this.nowIndex -1
				}
			},
			nextIndex(){
				if (this.nowIndex === (this.slides.length - 1)) {
					return  0
				}else{
					return this.nowIndex +1
				}
			}
		},
		methods:{
			goto(index){
				this.isShow = false
				setTimeout(()=>{
					this.isShow = true
					this.nowIndex = index
					//向父组件传递事件
					this.$emit('onchange',index)
				},10)
				// this.nowIndex = index
			},
			// next(op){
			// 	if(op === '-'){
			// 		if (this.nowIndex == 0) {
			// 			this.nowIndex = 3
			// 		}else{
			// 			this.nowIndex --
			// 		}
			// 	}else{
			// 		if (this.nowIndex == 3) {
			// 			this.nowIndex = 0
			// 		}else{
			// 			this.nowIndex ++
			// 		}
			// 	}
			// }
			// 设置定时器让幻灯片自助播放
			runInv(){
				this.invId = setInterval(() => {
					// console.log(this.nextIndex)
					this.goto(this.nextIndex)
				},this.inv)
			},
			clearInv(){
				clearInterval(this.invId)
			}
		},
		mounted(){
			this.runInv()
		}
	}
</script>

<style>
.slide-trans-enter-active{/*???????????*/
	transition: all .5s;
}
.slide-trans-enter{
	transform: translateX(900px);
}
.slide-trans-old-leave-active{
	transition: all .5s;
	transform: translateX(-900px);
}
.slide-show{
	position: relative;
	margin:15px 15px 15px 0;
	width: 900px;
	height: 500px;
	overflow: hidden;
}
.slide-show h2{
	position: absolute;
	width: 100%;
	height: 100%;
	color: #fff;
	background-color: #D7C5C1;
	opacity: .5s; /*????????????*/
	bottom: 0;
	height: 30px;
	text-align: left;
	padding-left: 15px;
	opacity: 0.4;
}
.slide-img{
	width: 100%;
}
.slide-img img{
	width: 100%;
	position: absolute;
	top: 0;
}
.slide-pages{
	position: absolute;
	bottom:10px;
	right: 15px;
}
.slide-pages li{
	display: inline-block;
	padding: 0 10px;
	cursor: pointer;
	color: #fff;
}
.slide-pages li .on{
	text-decoration: underline;
}
</style>