<template>
	<image class="img" :style="imageStyle" lazy-load="true" :src="resource" mode="aspectFill"></image>
	<!-- <img class="img" :style="imageStyle" lazy-load="true" :src="resource" alt="图片加载失败"/> -->
</template>

<script>
	export default {
		props: {
			imageStyle: String,
			src: {
				type: String,
				default: '',
				required: true
			},
			saveDirectory: {
				type: String,
				default: '_doc/uniapp_save/images/'
			},
			errorImage: {
				type: String,
				default: '/static/img/common/banner.png'
			},
			loadingImage: {
				type: String,
				default: '/static/img/common/banner.png'
			}
		},
		computed: {
			resource() {
				if (!this.isCached && this.error) {
					// 加载失败
					return this.errorImage;
				} else if (this.isCached) {
					return this.localFile;
				} else if (!this.isCached && !this.error) {
					// 正在加载
					return this.loadingImage;
				}
			}
		},
		created() {
			this.init();
		},
		data() {
			return {
				error: false,
				isCached: false,
				localFile: null
			};
		},
		methods: {
			async init() {
				// #ifdef APP-PLUS || APP-PLUS-NVUE
				if (!this.src.startsWith("http") && !this.src.startsWith("https")) {
					this.isCached = true;
					this.localFile = this.src;
				} else {
					let isCache = await this.isCache(this.src);
					if (!isCache) {
						let filePath = await this.downloadFile(this.src).catch(e => {
							this.error = true;
						});
						this.isCached = true;
						this.localFile = filePath;
					} else {
						this.isCached = true;
						this.localFile = isCache;
					}
				}

				// #endif
				// #ifndef APP-PLUS || APP-PLUS-NVUE
				this.isCached = true;
				this.localFile = this.src;
				// #endif
			},
			downloadFile(url) {
				return new Promise((resolve, reject) => {
					let savePath = this.saveDirectory + this.getFileName(url);
					let task = plus.downloader.createDownload(
						url, {
							filename: savePath
						},
						(download, status) => {
							if (status == 200) {
								resolve(savePath);
							} else {
								delFile(savePath);
								download.abort();
								reject();
							}
						}
					);
					task.start();
				});
			},
			isCache(url) {
				let savePath = this.saveDirectory + this.getFileName(url);
				return new Promise((resolve, reject) => {
					plus.io.resolveLocalFileSystemURL(
						savePath,
						entry => {
							resolve(savePath);
						},
						e => {
							resolve(null);
						}
					);
				});
			},
			getFileName(path) {
				var filePath = path.replace(/^http(s)?:\/\/[^/]+\//, "");
				return filePath;
			},
			imageLoadError() {
				// #ifndef APP-PLUS || APP-PLUS-NVUE
				this.localFile = this.errorImage;
				// #endif
			},
			/*删除指定文件*/
			delFile(hb_path) {
				if (hb_path) {
					plus.io.resolveLocalFileSystemURL(hb_path, function(entry) {
						entry.remove(function(entry) {}, function(e) {});
					});
				}
			}
		}
	};
</script>

<style>
	.img {
		width: 100%;
		height: 100%;
	}
</style>
