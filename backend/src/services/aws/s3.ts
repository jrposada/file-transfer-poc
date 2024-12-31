import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getEnvironmentVariable } from "@shared/utils/get-environment-variable";


export async function getS3UploadUrl(bucket: string, key?: string): Promise<string> {
    const region = getEnvironmentVariable('REGION');
    const s3Client = new S3Client({ region });

    const command = new PutObjectCommand({ Bucket: bucket, Key: key });

    return getSignedUrl(s3Client, command);
}