const request = require('supertest');
const app = require('../../server');
const ContentCategory = require('../../models/ContentCategory');

describe('ContentCategory Controller', () => {
  beforeEach(async () => {
    await ContentCategory.deleteMany({});
  });

  it('should create a new content category', async () => {
    const res = await request(app)
      .post('/api/content-category')
      .send({ name: 'Test Category' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'ContentCategory created successfully');
    expect(res.body).toHaveProperty('ContentCategory');
    expect(res.body.ContentCategory).toHaveProperty('name', 'Test Category');
  });

  it('should get all content categories', async () => {
    await ContentCategory.create({ name: 'Category 1' });
    await ContentCategory.create({ name: 'Category 2' });

    const res = await request(app).get('/api/content-category');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it('should get a content category by ID', async () => {
    const category = await ContentCategory.create({ name: 'Test Category' });

    const res = await request(app).get(`/api/content-category/${category._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test Category');
  });

  it('should update a content category', async () => {
    const category = await ContentCategory.create({ name: 'Original Category' });

    const res = await request(app)
      .put(`/api/content-category/${category._id}`)
      .send({ name: 'Updated Category' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'ContentCategory updated successfully');

    const updatedCategory = await ContentCategory.findById(category._id);
    expect(updatedCategory.name).toEqual('Updated Category');
  });

  it('should delete a content category', async () => {
    const category = await ContentCategory.create({ name: 'Test Category' });

    const res = await request(app).delete(`/api/content-category/${category._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'ContentCategory deleted successfully');

    const deletedCategory = await ContentCategory.findById(category._id);
    expect(deletedCategory).toBeNull();
  });
});
