describe('test product repository', function(){
	var repo,
		productCollectionMock;

	beforeEach(function(){
		productCollectionMock = {
			insert : function(){
				called = true;
			}
		};

		repo = new ProductRepository( productCollectionMock );
	}); 

	it('create - should call insert', function(){
		var product = { title : 'abcd' };
		spyOn( productCollectionMock, 'insert' );

		repo.create( product );
		expect( productCollectionMock.insert ).toHaveBeenCalled();
	});

	it('create - with missing title, should throw error', function(){
		try{
			var product = { };
			repo.create( product );
		} catch (err){
			expect( err.name ).toBe( 'productError::title validation' );
		}
	});
});