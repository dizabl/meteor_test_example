ProductRepository = function( productCollection ){
	this.create = create;

	function create( productDto ){
		if (productDto.title && productDto.title.length > 3){
			productCollection.insert( productDto );	
		} else{
			throw { name : 'productError::title validation' };
		}
		
	}
}