define(["avalon"], function(avalon) {
	var li = "<li ms-title='item.unitName'><input type='text' ms-value='item.unitName'/>{{item.unitName}}</li>"
    var root = "<ul ms-each-item='tree'>"+li+"</ul>";
	avalon.ui["tree"] = function(element, data, vmodels) {
		element.innerHTML = root;
        var model = avalon.define(data.treeId, function(vm) {
            avalon.mix(vm, data.treeOptions)//优先添加用户的配置，防止它覆盖掉widget的一些方法与属性
            vm.tree = [];
			vm.getOrg = function(){
				setTimeout(function(){
					vm.tree = [
						{unitName:"123"},
						{unitName:"123"},
						{unitName:"123"},
						{unitName:"123"},
						{unitName:"123"}
					]
				},100);
			};
        })
        avalon.nextTick(function() {
			model.getOrg();
			avalon.scan(element, [model].concat(vmodels));
        })
        return model;
    }
    return avalon;
})