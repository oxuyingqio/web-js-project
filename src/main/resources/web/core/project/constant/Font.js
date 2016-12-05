/**
 * @name Font
 * @package core.project.constant
 * @desc 语言
 * @type 枚举
 * 
 * @date 2016年11月2日 09:53:40
 */
core.project.constant.Font = function() {

	// 获取浏览器语言设置
	var language = navigator.language;
	if (!language)
		language = navigator.browserLanguage;

	if (language.toLowerCase().indexOf("zh") >= 0) {
		return {
			add : "增加",
			edit : "编辑",
			del : "删除",
			save : "保存",
			update : "更新",
			remove : "移除",
			confirm : "确认",
			cancel : "取消",
			search : "搜索",
			reset : "重置",
			back : "后退",
			print : "打印",
			download : "下载",
			upload : "上传"
		};
	} else if (language.toLowerCase().indexOf("en") >= 0) {
		return {};
	}
}();