import { getEnvironmentVariable } from '@shared/utils/get-environment-variable';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getS3UploadUrl } from '../../services/aws/s3';
import { ApiResponse } from '@shared/models/api-response';

/**
 * Return file's S3 pre-signed upload url
 */
export async function handler(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    const bucket = getEnvironmentVariable('FILE_BUCKET');

    const { filename } = getParams(event);

    const url = await getS3UploadUrl(bucket, filename);

    const body: ApiResponse<string> = {
        data: url,
        success: true,
    }

    return {
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',

            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
            "Access-Control-Allow-Methods": "OPTIONS,GET",
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
