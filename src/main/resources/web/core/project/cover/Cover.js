/**
 * @name	Cover
 * @package core.project.cover
 * @desc	遮盖层
 * @type	类
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
		style.push("width : 99%;");
		style.push("height : 98%;");
		style.push("margin : 0px;");
		style.push("padding : 0px;");
		style.push("position : absolute;");
		style.push("background : #F8F8F8;");
		style.push("filter : alpha(opacity=70);");
		style.push("opacity : 0.7;");
		style.push("z-index : 99999;");
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
	 */
	Constructor.prototype.append = function(html) {

		this.div().append(html);
	};

	/**
	 * 显示遮盖层
	 */
	Constructor.prototype.show = function() {

		this.div().show();
	};

	/**
	 * 隐藏遮盖层
	 */
	Constructor.prototype.hide = function() {

		this.div().hide();
	};

	return {

		getInstance : function() {

			if (!cover) {
				cover = new Constructor();
			}

			return cover;
		}
	};
})();