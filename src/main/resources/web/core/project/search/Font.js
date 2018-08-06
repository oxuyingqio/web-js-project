/**
 * @name Font
 * @package core.project.search
 * @desc 语言
 * @type 枚举
 * 
 * @date 2018年8月4日 15:22:21
 */
core.project.search.Font = function() {

	// 获取浏览器语言设置
	var language = navigator.language;
	if (!language)
		language = navigator.browserLanguage;

	if (language.toLowerCase().indexOf("zh") >= 0) {

		return {
			search : "搜&nbsp;&nbsp;&nbsp;索",
			reset : "重&nbsp;&nbsp;&nbsp;置"
		};
	} else if (language.toLowerCase().indexOf("en") >= 0) {

		return {
			search : "搜索",
			reset : "重置"
		};
	}
}();