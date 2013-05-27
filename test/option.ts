/// <reference path="../src/option.ts" />
/// <reference path="../d.ts/mocha.d.ts" />
/// <reference path="../d.ts/chai.d.ts" />

describe('Option', () => {
    chai.should();

    describe('Some', () => {    
        
        var some;
        beforeEach(() => { some = new Katana.Some('value')});

        describe('#get', () => {
            it('returns the value that binding on constructor', () => {
                some.get().should.equal('value');
            });
        });

        describe('#getOrElse', () => {
            it('returns the value that binding on constructor', () => {
                some.getOrElse(() => 'default').should.equal('value');
            });
        });

        describe('#match', () => {
            it('call some callback with the value', () => {
                var called = false;
                var theValue = null;
                some.match(
                    (value) => {
                        called = true;
                        theValue = value;   
                    },
                    () => {}
                );
                called.should.be.true;
                theValue.should.equal('value');
            });
        });

        describe('#map', () => {
            it('can convert the value with convertion function', () => {
                some.map(v => 1).get().should.to.equal(1);
            });  
        });
    });

    describe('None', () => {
        
        var none;
        beforeEach(() => { none = new Katana.None<string>()});

        describe('#get', () => {
            it('throws No such element Exception', () => {
                none.get.should.throw('No such element.');
            });
        });

        describe('#getOrElse', () => {
            it('returns default value', () => {
                none.getOrElse(() => 'default').should.equal('default');
            });
        });

        describe('#match', () => {
            it('call none callback', () => {
                var called = false;
                none.match(
                    (value) => { 
                    },
                    () => {
                        called = true;
                    }
                );
                called.should.be.true;
            });
        });

        describe('#map', () => {
            it('never do anything else but create new None', () => {
                none.map(v => 1).should.be.instanceof(Katana.None);
            });
        });
    });
});