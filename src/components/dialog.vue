<template>
	<div>
		<div class="dialog-wrap">
			<div class="dialog-cover"  v-if="isShow">
			</div>
			<transition name="drop">
			  <div class="dialog-content" v-if="isShow">
				  <p class="dialog-close" @click="closeMyself">x</p>
				  <slot></slot>
			  </div>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			closeMyself(){
				this.$emit('on-close')
			}
		}
	}
</script>

<style scoped>
.drop-enter-active {
	transition: all .5s ease;
}
.drop-leave-active {
	transition: all .3s ease;
}
.drop-enter {
	transform: translateY(-500px);
}
.drop-leave-active {
	transform: translateY(-500px);
}
.dialog-wrap {
	position: fixed;
	width: 100%;
	height: 100%;
}
.dialog-cover {
/*	用rgb颜色代替透明度可以有效的防止内部的盒子也随之透明*/
	background-color: rgb(9,0,0,0.5);
/*	opacity: 0.3;*/
	position: fixed;
	z-index: 5;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.dialog-content {
	width: 50%;
	position: fixed;
	max-height: 50%;
	overflow: auto;
	background-color: #fff;
	top: 20%;
	left: 50%;
	margin-left: -25%;
	z-index: 10;
	border: 2px solid #464068;
	padding: 2%;
	line-height: 1.6;
	opacity: 1;
}
.dialog-close {
	position: absolute;
	right: 5px;
	top: 5px;

}
</style>