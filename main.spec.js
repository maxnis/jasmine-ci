describe('main.js', function() {
    describe('calculate()', function() {
        it('validates expression when 1 number is invalid', function() {
            spyOn(window, 'updateResult').and.stub();

            calculate('a+3');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validates expression when 2 number is invalid', function() {
            spyOn(window, 'updateResult');

            calculate('3+a');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validates expression when operation is invalid', function() {
            spyOn(window, 'updateResult');

            calculate('4_3');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('calls add', function() {
            const spy = spyOn(Calculator.prototype, 'add');
            calculate('3+4');

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledWith(4);
        });
        it('calls subtract', function() {
            const spy = spyOn(Calculator.prototype, 'subtract');
            calculate('3-7');

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(7);
        });
        it('calls multiply', function() {
            const spy = spyOn(Calculator.prototype, 'multiply');
            calculate('3*7');

            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledWith(7);
        });
        it('calls divide', function() {
            const spy = spyOn(Calculator.prototype, 'divide');
            calculate('9/3');

            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(9);
            expect(spy).toHaveBeenCalledWith(3);
        });
        
        it('calls updateResult (example using and.callThrough)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callThrough();

            calculate('5*5');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith(25);
        });

        it('calls updateResult (example using and.callFake)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callFake(function(number) {
                return 'ok';
            });

            calculate('5*5');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('ok');
        });

        it('calls updateResult (example using and.returnValue)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.returnValue('multiply returns');

            calculate('5*5');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('multiply returns');
        });

        it('calls updateResult (example using and.returnValues)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'multiply returns');

            calculate('5+5');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('multiply returns');
        });

        it('multiply does not handle errors', function() {
            spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

            expect(function() { calculate('5*5') }).toThrowError('some error');
        });
    });

    describe('updateResult()', function() {
        beforeAll(function() {
            const element = document.createElement('div');
            element.setAttribute('id', 'result');
            document.body.appendChild(element);

            this.element = element;
        });

        afterAll(function() {
            document.body.removeChild(this.element);
        });

        it('adds result to DOM element', function() {
            updateResult('5');
            expect(this.element.innerText).toBe('5');
        });
    });

    describe('showVesrion()', function() {
        it('calls calculator.version', function() {
            spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            });

            const spy = spyOnProperty(Calculator.prototype, 'version', 'get');

            showVersion();

            expect(spy).toHaveBeenCalled();
        });
    });
});