import { SchoolsRepository, type SchoolRecord } from './schools.repository.js';
import { SchoolsService } from './schools.service.js';

const school: SchoolRecord = {
  id: '8a4c07de-390f-4fd5-806b-a5a17300f2e1',
  code: 'evdance-grammar',
  legalName: 'Evdance Grammar School (Private) Limited',
  displayName: 'Evdance Grammar School',
  ownershipType: 'private',
  educationSystem: 'sindh_board',
  educationLevels: ['primary', 'secondary'],
  genderType: 'coeducation',
  primaryEmail: 'admin@evdance.edu.pk',
  primaryPhone: '+923001234567',
  websiteUrl: 'https://www.evdance.edu.pk',
  logoFileId: null,
  timezone: 'Asia/Karachi',
  locale: 'en-PK',
  currency: 'PKR',
  status: 'trial',
  onboardedAt: null,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  createdBy: null,
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedBy: null,
  rowVersion: 1,
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

  it('creates a trial school by default and normalizes text inputs', async () => {
    jest.mocked(repository.create).mockResolvedValue(school);
    await expect(
      service.create({
        code: ' evdance-grammar ',
        legalName: ' Evdance Grammar School (Private) Limited ',
        displayName: ' Evdance Grammar School ',
        ownershipType: 'private',
        educationSystem: 'sindh_board',
        educationLevels: ['primary', 'secondary'],
        genderType: 'coeducation',
        primaryEmail: ' admin@evdance.edu.pk ',
        primaryPhone: ' +923001234567 ',
      }),
    ).resolves.toMatchObject({ code: school.code, status: 'trial' });
    expect(repository.create).toHaveBeenCalledWith({
      code: school.code,
      legalName: school.legalName,
      displayName: school.displayName,
      ownershipType: school.ownershipType,
      educationSystem: school.educationSystem,
      educationLevels: school.educationLevels,
      genderType: school.genderType,
      primaryEmail: school.primaryEmail,
      primaryPhone: school.primaryPhone,
      status: 'trial',
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
      data: [{ id: school.id, displayName: school.displayName }],
      meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
    });
  });
});
