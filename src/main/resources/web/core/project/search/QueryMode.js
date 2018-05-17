/**
 * @name	QueryMode
 * @package core.project.search
 * @desc	查询模式
 * @type	枚举
 * 
 * @date	2018年5月16日 14:02:24
 */
core.project.search.QueryMode = {

	/**
	 * 等于
	 */
	EQ : "eq",
	/**
	 * 不等于
	 */
	NE : "ne",
	/**
	 * 大于等于
	 */
	GE : "ge",
	/**
	 * 小于等于
	 */
	LE : "le",
	/**
	 * 大于
	 */
	GT : "gt",
	/**
	 * 小于
	 */
	LT : "lt",
	/**
	 * 在其中
	 */
	INSIDE : "in",
	/**
	 * 在之间
	 */
	BETWEEN : "between",
	/**
	 * 类似
	 */
	LIKE : "like",
	/**
	 * 起始位类似
	 */
	LIKESTART : "likeStart",
	/**
	 * 结束位类似
	 */
	LIKEEND : "likeEnd",
	/**
	 * 是“”
	 */
	ISEMPTY : "isEmpty",
	/**
	 * 不是“”
	 */
	ISNOTEMPTY : "isNotEmpty",
	/**
	 * 是NULL
	 */
	ISNULL : "isNull",
	/**
	 * 不是NULL
	 */
	ISNOTNULL : "isNotNull"
};