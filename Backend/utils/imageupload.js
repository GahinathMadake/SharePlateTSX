const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  },
});

const uploadImageToR2 = async (base64Image, folder) => {
  try {
    if (!base64Image || !folder) {
      throw new Error('Missing required parameters: base64Image or folder');
    }

    const buffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.jpeg`;

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/jpeg',
    });

    await s3Client.send(command);
    
    // Construct the public URL using the public endpoint
    return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`;
  } catch (error) {
    console.error('Error uploading image to R2:', error);
    throw new Error('Failed to upload image');
  }
};

module.exports = { uploadImageToR2 };