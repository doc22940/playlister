const uuid = require('uuid/v4');

test('DELETE /media/:id fails if the media cannot be found', async () => {
  expect.assertions(2);

  // TODO: probably won't fix, but know that this will fail at some point...
  const res = await http.delete(`${baseUrl}/media/12038349`);

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({ error: 'Could not find media to delete' });
});

test('DELETE /media/:id deletes media successfully', async () => {
  const { Media } = db.models;

  expect.assertions(2);

  const [name] = RM.genMediaNames(1);

  let media = await Media.create({
    id: uuid(),
    name,
    type: 'IMAGE'
  });

  const res = await http.delete(`${baseUrl}/media/${media.id}`);

  media = await Media.find({ where: { id: media.id, deletedAt: null }});

  expect(res.status).toEqual(204);
  expect(media).toEqual(null);
});

