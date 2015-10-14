function helper(helperName, property){
	return Template[helperName].__helpers[' '+ property]();
}

describe('you -test', function(){
	it('first test', function(){
		expect(helper('you','items').length).toBe(1);
	})
});