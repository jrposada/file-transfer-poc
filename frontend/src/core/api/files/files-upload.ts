import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ApiResponse } from '@shared/models/api-response';
import { signedFetch } from '../utils';

export type UseFilesUploadParams = {
    file: File;
};

export const useFilesUpload: (options?: {
    onSettled?: () => void;
}) => UseMutationResult<undefined, Error, UseFilesUploadParams> = (options) =>
    useMutation({
        mutationFn: async ({ file }) => {
            console.log('mutation')
            const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/files`)
            console.log('url', url)
            const response: ApiResponse<string> = await signedFetch(
                url,
                {
                    query: {
                        filename: file.name,
                    },
                },
            );
            console.log('mmm')

            const uploadUrl = response.data;
            console.log('upload url', uploadUrl);

            if (!uploadUrl) {
                throw new Error('No upload url');
            }

            void (await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'content-length': `${file.size}`,
                },
                body: file,
            }));

            return undefined;
        },
        onSettled: () => {
            options?.onSettled?.();
        },
    });
