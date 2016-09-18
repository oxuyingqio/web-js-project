/**
 * 语言
 */
var Font = function() {

	var zh_cn_lang = {

		add : "增加",
		edit : "编辑",
		del : "删除",
		save : "保存",
		update : "更新",
		remove : "移除",
		confirm : "确认",
		cancel : "取消",
		back : "后退",
		print : "打印"
	};

	// 获取浏览器语言设置
	var language = navigator.language;
	if (!language)
		language = navigator.browserLanguage;

	if (language.toLowerCase().indexOf("zh") >= 0) {
		return zh_cn_lang;
	} else if (language.toLowerCase().indexOf("en") >= 0) {
		return en_lang;
	}
}();