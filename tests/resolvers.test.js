const dql = require('../src');

describe('[dql] resolvers', () => {
  let data = {};
  beforeEach(() => {
    data = {
      test: {
        test2: {
          test3: {
            test4: {
              test5: 10,
              box: [
                { name: { full: true }, age: 10 },
                { name: { full: false }, age: 2 }
              ]
            },
            age: 10
          },
          id: "20"
        }
      },
      peoples: 2
    };
  });

  describe('[orderBy]', () => {
    test('should order by specific prop', () => {
      const value = dql(data)` 
      test { 
        test2 { 
          test3 { 
            test4 { 
               box(orderBy: age) {
                  name,
                  age
               }
            } 
          }
        }
      }`;

      const dataFiltered = {
        box: [
          { name: { full: false}, age: 2 },
          { name: { full: true}, age: 10 }
        ]
      };

      expect(value).toEqual(dataFiltered);
    });
  });

  describe('[parseInt]', () => {
    test('should parse to integer', () => {
      const value = dql(data)` 
      test { 
        test2 { 
          id(toNumber: true)
        }
      }`;

      const dataParsed = {
        id: 20
      };

      expect(value).toEqual(dataParsed);
    });
  })

  describe('[parse to array]', () => {
    test('should parse to array', () => {
      const value = dql(data)` 
      test { 
        test2 { 
          test3 {
            test4(toArray: true)
          }
        }
      }`;

      const dataParsed = {
        test4: [
          {test5: 10},
          {box: [{name: {full: true}, age: 10}, {name: {full: false}, age: 2}]}
        ]
      };

      expect(value).toEqual(dataParsed);
    });
  })

  describe('[Get only values from object]', () => {
    test('should get only values form object', () => {
      const value = dql(data)` 
      test { 
        test2 { 
          test3 {
            test4(getObjectValues: true)
          }
        }
      }`;

      const dataParsed = {
        test4: [
          10,
          [{name: {full: true}, age: 10}, {name: {full: false}, age: 2}]
        ]
      };

      expect(value).toEqual(dataParsed);
    });
  })
});

