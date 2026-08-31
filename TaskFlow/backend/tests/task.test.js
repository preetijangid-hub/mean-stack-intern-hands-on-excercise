const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const Task = require('../src/models/Task');

jest.mock('../src/models/Task');

const userId = '64b7f1f1f1f1f1f1f1f1f1f1';
const otherUserId = '64b7f1f1f1f1f1f1f1f1f1f2';
const taskId = '64b7f2f2f2f2f2f2f2f2f2f2';

const authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('Task API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('blocks access to tasks without a token', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('lets an authenticated user create a task', async () => {
    Task.create.mockResolvedValue({
      _id: taskId,
      title: 'Learn Angular',
      priority: 'High',
      status: 'Pending',
      user: userId,
    });

    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Learn Angular', priority: 'High' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Learn Angular');
  });

  it('lets an authenticated user list their tasks', async () => {
    Task.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([{ _id: taskId, title: 'Learn Angular', user: userId }]),
    });

    const res = await request(app).get('/api/tasks').set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it('returns 404 when a task does not exist', async () => {
    Task.findById.mockResolvedValue(null);

    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(404);
  });

  it('blocks a user from accessing another user\'s task', async () => {
    Task.findById.mockResolvedValue({
      _id: taskId,
      title: 'Someone else\'s task',
      user: otherUserId,
    });

    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('lets the owning user delete their task', async () => {
    const deleteOne = jest.fn().mockResolvedValue({});
    Task.findById.mockResolvedValue({
      _id: taskId,
      user: userId,
      deleteOne,
    });

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(deleteOne).toHaveBeenCalled();
  });
});
