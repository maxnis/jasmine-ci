describe("calculator.js", function () {
  describe('Caclulator', () => {
    let calculator;
    let calculator2;
    beforeEach(() => {
      calculator = new Calculator();
      calculator2 = new Calculator();
    });
    afterEach(function() {
    });
  it("should add numbers to total", () => {
    
    calculator.add(5);

    expect(calculator.total).toBe(5);
    calculator.add(5);
    expect(calculator.total).toBe(10);
  });

  it("should subtract numbers from total", function () {
    calculator.total = 50;
    calculator.subtract(25);

    expect(calculator.total).toBe(25);
  });

  it("should multiply total by number", function () {
    calculator.total = 10;
    calculator.multiply(5);

    expect(calculator.total).toBe(50);
  });

  it("should divide total by number", function () {
    calculator.total = 100;
    calculator.divide(4);

    expect(calculator.total).toBe(25);
  });

  it("should initialize the total", function () {
    expect(calculator.total).toBeFalsy();
    expect(calculator.total).toBe(0);
  });

  it("can be instantiated", function () {
    jasmine.addMatchers(customMatchers);

    expect(calculator).toBeCalculator();
    expect(calculator).toBeTruthy();
    expect(calculator2).toBeTruthy();
    expect(calculator).toEqual(calculator2);
    expect(calculator.constructor.name).toContain("Calcu");
  });

  it("instantiates unique object", function () {
    expect(calculator).not.toBe(calculator2);
  });

  it("has common operators", function () {

    expect(calculator).not.toBeUndefined(calculator);

    expect(calculator.add).toBeDefined(calculator);
    expect(calculator.subtract).toBeDefined(calculator);
    expect(calculator.multiply).toBeDefined(calculator);
    expect(calculator.divide).toBeDefined(calculator);
  });

  it("can overwrite total", function () {

    calculator.total = null;
    expect(calculator.total).toBeNull();
  });

  it("does not handle NaN", function () {

    calculator.total = 20;
    calculator.multiply("a");

    expect(calculator.total).toBeNaN();
  });

  it("handles divide by zero", function () {

    expect(() => {
      calculator.divide(0);
    }).toThrow();
    expect(() => {
      calculator.divide(0);
    }).toThrowError(Error);
    expect(() => {
      calculator.divide(0);
    }).toThrowError(Error, "Cannot divide by zero");
  });

  it("returns total", function () {
    calculator.total = 50;

    expect(calculator.add(20)).toBe(70);
    expect(calculator.total).toMatch(/-?\d+/);
    expect(typeof calculator.total).toMatch("number");

    expect(calculator.total).toBeNumber();

    expect(calculator.total).toEqual(jasmine.anything());
    expect(null).not.toEqual(jasmine.anything());
    expect(undefined).not.toEqual(jasmine.anything());
  });

  describe('get version', function() {
    it('fetches version from external source', async function(done) {
      spyOn(window, 'fetch').and.returnValue(Promise.resolve(
        new Response('{"version": "0.1"}')
      ));
      
        const version = await calculator.version;
        expect(version).toBe('0.1');

        done();

    });
  });
  });
});
