import { SchoolsService } from './schools.service.js';
import { SchoolsRepository, type SchoolRecord } from './schools.repository.js';

const school: SchoolRecord = {
  id: '8a4c07de-390f-4fd5-806b-a5a17300f2e1',
  name: 'Evdance Grammar School',
  status: 'active',
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

describe('SchoolsService', () => {
  const repository = {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
  } as unknown as SchoolsRepository;
  const service = new SchoolsService(repository);

  beforeEach(() => jest.clearAllMocks());

  it('creates an active school by default and trims its name', async () => {
    jest.mocked(repository.create).mockResolvedValue(school);
    await expect(
      service.create({ name: ' Evdance Grammar School ' }),
    ).resolves.toMatchObject({ name: school.name, status: 'active' });
    expect(repository.create).toHaveBeenCalledWith({
      name: school.name,
      status: 'active',
    });
  });

  it('returns a stable not-found error when a school does not exist', async () => {
    jest.mocked(repository.findById).mockResolvedValue(undefined);
    await expect(service.findOne(school.id)).rejects.toMatchObject({
      code: 'SCHOOL_NOT_FOUND',
      status: 404,
    });
  });

  it('returns paginated schools', async () => {
    jest
      .mocked(repository.list)
      .mockResolvedValue({ schools: [school], total: 1 });
    await expect(service.list({ page: 1, limit: 20 })).resolves.toMatchObject({
      data: [{ id: school.id }],
      meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
    });
  });
});
