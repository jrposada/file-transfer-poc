import { getEnvironmentVariable } from '@shared/utils/get-environment-variable';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getS3UploadUrl } from '../../services/aws/s3';

/**
 * Return file's S3 pre-signed upload url
 */
export async function handler(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    const bucket = getEnvironmentVariable('FILE_BUCKET');

    const { filename } = getParams(event);

    const url = await getS3UploadUrl(bucket, filename);

    return {
        body: url,
        headers: {
            'content-type': 'text/plain',
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Credentials': true,
        },
        statusCode: 200,
    };
}

function getParams(event: APIGatewayProxyEvent): { filename: string } {
    if (
        !event.queryStringParameters ||
        !event.queryStringParameters['filename']
    ) {
        throw new Error();
    }

    return { filename: event.queryStringParameters['filename']! };
}
