<template>
	<vc-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
		@submit.native.prevent
	>
		<vc-form-item prop="value" @on-form-change="handleChange">
			<!-- :options="options" -->
			<vc-editor 
				ref="editor"
				v-model="formValidate.value"
				:disabled="disabled"
				:options="editorOption"
				style="width: 100%;height: 500px"
				@change="handleInput"
			/>
		</vc-form-item>
		<vc-editor-view :content="formValidate.value" />
		<vc-button @click="handleSubmit">
			提交
		</vc-button>
	</vc-form>
</template>
<script>
import Form from '../../form';
import Input from '../../input';
import Button from '../../button';
import Editor from '../index';
import Toolbar from '../toolbar';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://api.github.com/users/wya-team',
		URL_UPLOAD_FILE_POST: 'https://api.github.com/users/wya-team',
		onPostBefore: ({ options }) => {
			return new Promise((resolve, reject) => {
				// if (random(0, 10) > 10) {
				// 	throw new Error('异常处理');
				// }
				resolve({
					...options,
					param: {
						...options.param,
						timestamp: new Date()
					},
					type: 'GET',
					credentials: 'omit', //  cors下关闭
					headers: {
					}
				});
			});
		},
		onPostAfter: ({ response, options }) => { // eslint-disable-line
			const { file } = options.param;
			return new Promise((resolve) => {
				
				// 模拟强制返回
				resolve({
					status: 1,
					data: {
						url: 'https://avatars2.githubusercontent.com/u/34465004?v=4',
						type: `.${file.name.split('.').pop()}`,
						uid: file.uid,
						title: file.name,
						size: file.size
					},
					...response
				});
			});
		}
	}
});

export default {
	name: "vc-editor-basic",
	components: {
		"toolbar": Toolbar,
		"vc-editor": Editor,
		"vc-editor-view": Editor.View,
		'vc-button': Button,
		'vc-form': Form,
		'vc-form-item': Form.Item,
	},
	
	data() {
		return {
			options: {
				modules: {
					toolbar: {
						container: [
							['bold', 'italic', 'underline', 'strike'],
							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
							['link'],
							[{ 'color': [] }, { 'background': [] }],
							[{ 'align': [] }]
						],
					},
				}
			},
			editorOption: {
				modules: {
					ImageExtend: {
						upload: {
							showTips: false,
							size: 88888,
							max: 2,
							multiple: false
						}
					},
					toolbar: "#toolbar",
				}
			},
			disabled: false,
			formValidate: {
				value: ''
			},
			ruleValidate: {
				value: [
					{ required: true, message: '请输入内容' }
				],
			}
		};
	},
	computed: {
		
	},
	mounted() {
		// console.log(this.$refs.editor);
	},
	methods: {
		handleChange(arg) {
			console.log(arg);
		},
		handleSubmit(name) {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			});
		},
		handleInput() {
		}
	}
};
</script>
