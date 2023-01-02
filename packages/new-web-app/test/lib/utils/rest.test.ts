import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from '../../../src/lib/utils/rest';
const fetchJsonMock = vi.fn();
const fetchMock = vi.fn(() => ({
    json: fetchJsonMock,
    ok: true,
}));

vi.stubGlobal('fetch', fetchMock);

declare global {
    interface ImportMeta {
        env: {
            VITE_API_BASE_URL: string;
        };
    }
}

const originalViteBaseUrl = import.meta.env.VITE_API_BASE_URL;

describe('utils: rest', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        import.meta.env.VITE_API_BASE_URL = originalViteBaseUrl;
    });

    describe('request', () => {
        it('calls request without options', async () => {
            fetchJsonMock.mockResolvedValue({
                some: 'body',
            });
            const result = await request();

            expect(result).toEqual({
                some: 'body',
            });
        });

        it('uses VITE_API_BASE_URL value as baseUrl', async () => {
            import.meta.env.VITE_API_BASE_URL = 'http://api.com';

            fetchJsonMock.mockResolvedValue({
                some: 'body',
            });

            await request({
                headers: {
                    Accept: 'text/html',
                },
            });

            expect(fetchMock).toHaveBeenCalledWith('http://api.com', {
                headers: {
                    Accept: 'text/html',
                },
                method: 'GET',
            });
        });
        it('passes headers to fetch', async () => {
            fetchJsonMock.mockResolvedValue({
                some: 'body',
            });

            await request({
                baseUrl: 'http://test.com',
                headers: {
                    Accept: 'text/html',
                },
            });

            expect(fetchMock).toHaveBeenCalledWith('http://test.com', {
                headers: {
                    Accept: 'text/html',
                },
                method: 'GET',
            });
        });
    });
});
