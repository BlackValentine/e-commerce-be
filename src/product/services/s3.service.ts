import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand, PutObjectCommand, S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly region;
  private readonly accessKeyId;
  private readonly secretAccessKey;
  private readonly publicBucketName;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get('AWS_REGION');
    this.accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
    this.secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
    this.publicBucketName = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
  }

  async getLinkMediaKey(image) {
    const s3 = this.getS3();
    const getObjectParams = {
      Bucket: this.publicBucketName,
      Key: image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 12 });
    return url;
  }

  async upload(file: any) {
    const base64Data = file.buffer;
    const mineType = file.fileType.mime;
    const objectId = this.genRanHex(32);
    const key = objectId;
    await this.uploadS3(base64Data, key, mineType);
    return objectId;
  }

  async deleteFileS3(imageName: string) {
    const s3 = this.getS3();
    const params = {
      Bucket: this.publicBucketName,
      Key: imageName,
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    return true;
  }

  private async uploadS3(fileBuffer, key, contentType) {
    const s3 = this.getS3();
    const params = {
      Bucket: this.publicBucketName,
      Key: key,
      Body: fileBuffer,
      ContentEncoding: 'base64',
      ContentType: contentType,
      // ACL: 'public-read', // comment if private file
    };
    const command = new PutObjectCommand(params);
    return new Promise((resolve, reject) => {
      s3.send(command, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  private getS3() {
    return new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  private genRanHex = (size: number) =>
    [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}
