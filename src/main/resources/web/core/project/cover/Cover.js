/**
 * @name	Cover
 * @package core.project.cover
 * @desc	遮盖层
 * @type	类
 * 
 * @method	static core.project.cover.Cover		getInstance()			获取遮盖层实例
 * 			core.project.cover.Cover			append(Object html)		添加HTML信息
 * 			core.project.cover.Cover			show()					显示遮盖层
 * 			core.project.cover.Cover			hide()					隐藏遮盖层
 *  
 * @date	2016年9月3日 09:36:45
 */

core.project.cover.Cover = (function() {

	/**
	 * 遮盖层
	 */
	var cover;

	/**
	 * 构造函数
	 */
	var Constructor = function() {

		/**
		 * 遮盖层样式
		 */
		var style = [];
		style.push("position: absolute;");
		style.push("width: 100%;");
		style.push("height: 100%;");
		style.push("top: 0px;")
		style.push("z-index: 99999;");
		style.push("margin: 0px;");
		style.push("padding: 0px;");
		style.push("background: #F8F8F8;");
		style.push("filter: alpha(opacity=85);");
		style.push("opacity: 0.85;");
		/**
		 * 遮盖层
		 */
		var div = new core.html.element.viewer.Div().style(style.join(""));

		/**
		 * 获取/设置遮盖层
		 * 
		 * @param div
		 */
		this.div = function() {

			switch (arguments.length) {
			case 0:
				return div;
			default:
				div = arguments[0];
				return this;
			}
		};
	};

	/**
	 * 添加HTML信息
	 * 
	 * @param html
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.content = function(html) {

		this.div().clear().append(html);

		return this;
	};

	/**
	 * 显示遮盖层
	 * 
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.show = function() {

		this.div().show();

		return this;
	};

	/**
	 * 隐藏遮盖层
	 * 
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.hide = function() {

		this.div().hide();

		return this;
	};

	return {

		/**
		 * 获取遮盖层实例
		 * 
		 * @returns {core.project.cover.Cover}
		 */
		getInstance : function() {

			if (!cover) {
				cover = new Constructor();
			}

			return cover;
		}
	};
})();