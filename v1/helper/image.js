const AWS = require('aws-sdk');
const fs = require('fs');
const Jimp = require('jimp');
const exifremove = require('exifremove');
const Model = require('../core/model');

var params = {};
var s3 = {};

module.exports = class ImageHelper extends Model 
{
    constructor(appConfig)
    {
        AWS.config.update({ region: appConfig.AWS_S3_REGION });
        
        s3 = new AWS.S3(
        {
            accessKeyId: appConfig.AWS_ACCESS_KEY_ID,
            secretAccessKey: appConfig.AWS_ACCESS_SECRET,
            correctClockSkew: true,
            apiVersion: appConfig.AWS_S3_VERSION
        });
    
        params =
        {
            Bucket: appConfig.AWS_S3_BUCKET,
            CreateBucketConfiguration:
            {
                LocationConstraint: appConfig.AWS_S3_REGION
            }
        }

        super(s3, params);
    }
    
    async saveFileToS3(image, path, appConfig)
    {
        let fileContent = fs.readFileSync(image);
               
        let ext = path.split('.').pop();

        if(ext?.toLowerCase() === 'jpg' || ext?.toLowerCase() === 'jpeg')
        {
            fileContent = await exifremove.remove(fileContent);
        }

        const params =
        {
            Bucket: appConfig.AWS_S3_BUCKET,
            Key: path,
            Body: fileContent,
            ACL: 'public-read'
        };

        return new Promise((resolve, reject) =>
        {
            s3.upload(params, function(err, data)
            {
                if(err)
                {
                    resolve(err);
                }

                resolve(data.Location);
            });
        });
    }

    async reduceImageSize(image, appConfig)
    {
        Jimp.read(image, function(err, lenna)
        {
            if (err) throw err;
         
            lenna.resize(appConfig.UPLOAD_FILE_RESIZE_TO_WIDTH, appConfig.UPLOAD_FILE_RESIZE_TO_HEIGHT).quality(60).write(image);
        });
    }
}