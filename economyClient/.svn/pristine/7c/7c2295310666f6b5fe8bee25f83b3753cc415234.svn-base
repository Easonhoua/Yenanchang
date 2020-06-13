const checkPhone=(phone)=>{
	if (phone.length != 11) {
		tips("请输入11位手机号");
		return false;
	}
	var reg =/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
	if(!reg.test(phone)){
		tips("该手机号段不存在,请输入正确的手机号码");
		return false;
	}	
	return true;
}
const checkPassword=(password)=>{
	if (password.length < 6||password.length > 20) {
		tips("请输入6-20位的密码");
		return false;
	}
	return true;
}

const checkCode=(code)=>{
	if (code.length == 4 || code.length == 6 || code.length == 8) {
		return true;
	}else{
		tips("请输入正确的验证码");
		return false;
	}
}
/**
  * 方法名称: 校验价格
  * 方法注释: 校验输入的价格,最多只能有两位小数点
  * 传入参数: price->价格 tipText->提示语可不传
  * 返回数值: 错误返回false，正确返回true
*/
const checkPrice=(price,tipText)=>{
	/*验证单价：包括两位小数*/
				   // /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
	var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
	// var price=$("#price").val();
	if (!price || !priceReg.test(price)){
		if(tipText){
			tips(tipText);
		}else
		{
			tips("请输入正确的价格");
		}
	  return false;
	}
	return true;
}

/**
  * 方法名称: 校验身份证号码
  * 方法注释: 校验输入的身份证号码,最多只能有两位小数点
  * 传入参数: identityCard->身份证号码 tipText->提示语可不传
  * 返回数值: 错误返回false，正确返回true
*/
const checkIdentityCardReg=(identityCard,tipText)=>{
	 /*
	    第一位不可能是0
	    第二位到第六位可以是0-9
	    第七位到第十位是年份，所以七八位为19或者20
	    十一位和十二位是月份，这两位是01-12之间的数值
	    十三位和十四位是日期，是从01-31之间的数值
	    十五，十六，十七都是数字0-9
	    十八位可能是数字0-9，也可能是X
	    */
	var identityCardReg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
	if (!identityCard || !identityCardReg.test(identityCard)){
		if(tipText){
			tips(tipText);
		}else
		{
			tips("请输入正确的身份证号码");
		}
	  return false;
	}
	return true;
}

/**
  * 方法名称: 检查非空text  
  * 方法注释: 注意text和tipText传入的都是字符串
  * 传入参数: text->检查非空text的字符串、tipText->text为空时的提示字符串
  * 返回数值: 为空返回false，不为空返回true
*/
const checkNullText=(text,tipText)=>{
	if(!text)
	{
		tips(tipText+"!");
		return false;
	}
	return true;
} 

/**
  * 方法名称: 检查非空text  
  * 方法注释: 注意texts和tipTexts传入的都是数组
  * 传入参数: texts->检查非空text的数组、tipTexts->text为空时的提示数组 
  * 返回数值: 为空返回false，不为空返回true
*/
const checkNullTexts=(texts,tipTexts)=>{
	for (var i = 0; i < texts.length; i++) {
		if(!texts[i])
		{
			tips(tipTexts[i]+"!");
			return false;
		}
	}
	return true;
} 

const tips=(msg)=>{
	return uni.showToast({
		title: msg,
		icon: "none"
	})
}
export default {
	checkPhone,
	checkCode,
	checkPassword,
	checkIdentityCardReg,
	checkNullText,
	checkNullTexts
}