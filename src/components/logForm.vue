<template>
	<div class="login-form">
		<div class="g-form">
			<div class="g-form-line">
				<span class="g-form-label">用户名：</span>
				<div class="g-form-input">
					<input type="text" placeholder="请输入用户名" v-model="usernameModel">
				</div>
				<span class="g-form-error">{{ userErrors.errorText }}</span>
			</div>
			<div class="g-form-line">
				<span class="g-form-label">密码：</span>
				<div class="g-form-input">
					<input type="text" placeholder="请输入密码" v-model="passwordModel">
					
				</div>
				<span class="g-form-error">{{ passwordErrors.errorText }}</span>
			</div>
			<div class="g-form-line">
				<div class="g-form-btn">
					<a class="button" @click="onLogin">登录</a>
				</div>
			</div>
			<p>{{ errorText}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				usernameModel: '',
				passwordModel: '',
				errorText: '',
			}
		},
		computed: {
			userErrors() {
				let errorText,status
				if (!/@/g.test(this.usernameModel)) {
					status = false
					errorText = '不包含@'
				}
				else {
					status = true
					errorText = ''
				}
				//console.log(this.userflag)
				if (!this.userflag) {
					errorText = ''
					this.userflag = true
				}
				return {
					status,
					errorText
				}
			},
			passwordErrors() {
				let errorText,status
				if (!/^\w{1,6}$/g.test(this.passwordModel)) {
					status = false
					errorText = '密码不是1-6位'
				}
				else{
					status = true
					errorText = ''
				}
				if (!this.psdflag) {
					errorText = ''
					this.psdflag = true
				}
				return {
					status,
					errorText
				}
			}
		},
		methods: {
			onLogin(){
				if (this.passwordErrors.status || this.userErrors.status) {
					this.errorText = "请正确输入"
					console.log('校验通过')
					this.errorText = ''
					//通过ajax发送数据
					this.$http.post('api/login').then((res) => {
						this.$emit('has-log',res.data)
					},(error) => {
						console.log(error)
					})
				}else{
					this.errorText = "请正确输入"
					console.log(this.passwordErrors.status)
					console.log(this.userErrors.status)
				}
			}
		}
	}
</script>
