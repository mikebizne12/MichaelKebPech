import { SearchTextPipe } from '@shared/pipes/search-text/search-text.pipe';

describe('SearchTextPipe', () => {
  let pipe: SearchTextPipe;
  const date = new Date();
  const data = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      logo: '',
      date_release: date,
      date_revision: date,
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      logo: '',
      date_release: date,
      date_revision: date,
    },
  ];

  beforeEach(() => {
    pipe = new SearchTextPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return products that match the searchText', () => {
    expect(pipe.transform(data, 'Product 1')).toEqual([data[0]]);
    expect(pipe.transform(data, '2')).toEqual([data[1]]);
    expect(pipe.transform(data, 'Description')).toEqual(data);
  });

  it('should return all products if searchText is empty', () => {
    expect(pipe.transform(data, '')).toEqual(data);
  });
});
