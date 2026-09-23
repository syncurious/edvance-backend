import { HttpStatus, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter.js';

describe('AllExceptionsFilter', () => {
  const response = {
    status: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const request = {
    header: jest.fn(),
    method: 'POST',
    originalUrl: '/api/v1/schools',
  };
  const host = {
    switchToHttp: () => ({ getRequest: () => request, getResponse: () => response }),
  } as never;

  beforeEach(() => {
    jest.clearAllMocks();
    request.header.mockReturnValue('request-123');
  });

  it('logs an unexpected server error with its request ID', () => {
    const filter = new AllExceptionsFilter();
    const logError = jest.spyOn(Logger.prototype, 'error').mockImplementation();

    filter.catch(new Error('database unavailable'), host);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(logError).toHaveBeenCalledWith(
      'POST /api/v1/schools failed (requestId=request-123)',
      expect.stringContaining('database unavailable'),
    );
  });
});
