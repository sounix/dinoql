const dql = require('../src');

describe('[dql] { keep: false }', () => {
  let data = {};
  beforeEach(() => {
    data = {
      test: {
        test2: {
          test3: {
            test4: {
              test5: 10,
              box: true
            },
            age: 10
          }
        }
      },
      peoples: 2
    };
  });

  test('should return only values', () => {
    const value = dql(data)` 
      test { 
        test2 { 
          test3 { 
            test4 { 
               test5,
               box
            },
            age
          },
        }
      }`;

    const dataFiltered = {
      test5: 10,
      box: true,
      age: 10
    };

    expect(value).toEqual(dataFiltered)
  });

  test('should return only values using aliases', () => {
    const value = dql(data)` 
      test { 
        test2 { 
          test3 { 
            test4 { 
               test5,
               box
            },
            ageChanged: age
          },
        }
      }`;

    const dataFiltered = {
      test5: 10,
      box: true,
      ageChanged: 10
    };

    expect(value).toEqual(dataFiltered)
  });

  test('should return only values using defaultValue', () => {
    const value = dql(data)` 
      test { 
        test2 { 
          test3 { 
            test4 { 
               test5,
               box
            },
            notfound(defaultValue: 10)
          },
        }
      }`;

    const dataFiltered = {
      test5: 10,
      box: true,
      notfound: 10
    };

    expect(value).toEqual(dataFiltered)
  });


  test('should return empty object to keys not found', () => {
    const value = dql(data)` 
      test { 
        testdsjj { 
          testsdjsjk { 
            test4skdjsdsj { 
               test5sldksldks
            } 
          }
        }
      }`;

    expect(value).toEqual({})
  })

  test('should get error when resolver does not exist', () => {
    try {
      const value = dql(data)` 
      test { 
        test1(defaultValue: 10, rskkskksks: 10)
      }`;
    } catch(e){
      expect(e.message).toBe('Resolver "rskkskksks" does not exist.');
    }
  })
});

