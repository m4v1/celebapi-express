import getInfo from '../src/routes/info';

describe('Info Route', () => {
  test('it should return a json response', async () => {
    const req = {
      params: {
        name: 'anita herbert'
      }
    };

    const res = {
      data: {
        name: 'anita herbert',
        bday: '1989-12-29',
        bplace: 'Hungary',
        bio:
          "Hungarian fitness model, bikini competitor, and bodybuilder who went viral on social media. She's best known on Instagram for her healthy lifestyle and toned physique with over 1.9 million followers and growing."
      },
      message: 'remote',
      status: 200
    };

    const data = await getInfo(req, {});
    expect(data).toEqual(res);
  });
});
