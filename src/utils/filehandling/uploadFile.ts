"use server"
import { v2 as cloudinary } from "cloudinary";
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { outline } from "@cloudinary/url-gen/actions/effect";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const folder = process.env.CLOUDINARY_FOLDER;

// Initialize Cloudinary URL generator
const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
});

const generateUniquePublicId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export const uploadFile = async (file: File, folderName : string): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', folder as string); // Create this in your Cloudinary settings

        if (!file) throw new Error("No file provided");

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const response: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: `${folder}/${folderName}`,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                    public_id: generateUniquePublicId(),
                },
                (error, result) => {
                    if (error) reject(error)
                    resolve(result)
                }
            ).end(buffer)
        })


        if (!response) {
            throw new Error('Upload failed');
        }

        console.log(response);
        return response.public_id;
        // get file in this format
        // {
        //     asset_id: '25a2dd6ef36f5674265ff451ec3e2df3',
        //     public_id: 'hostel/file',
        //     version: 1744210454,
        //     version_id: 'c152e794fc36a170c33d4c6b55c22196',
        //     signature: '2c56d5818a8fbd86ce2df8df0fdbd3ab3061ebcd',
        //     width: 2048,
        //     height: 1156,
        //     format: 'jpg',
        //     resource_type: 'image',
        //     created_at: '2025-04-09T14:20:56Z',
        //     tags: [],
        //     bytes: 236245,
        //     type: 'upload',
        //     etag: 'c1e7634c152dd1d6721f248d20d30412',
        //     placeholder: false,
        //     url: 'http://res.cloudinary.com/dgesyqadfsdfnjb/image/upload/v1744210454/hostel/file.jpg',
        //     secure_url: 'https://res.cloudinary.com/dgesyasdfadqnjb/image/upload/v1744210454/hostel/file.jpg',   
        //     asset_folder: 'hostel',
        //     display_name: 'file',
        //     overwritten: true,
        //     original_filename: 'file',
        //     api_key: '832829859529984'
        //   }
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};

export const getFilePath = async (publicId: string): Promise<any> => {
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload/${publicId}`,

            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
                    ).toString('base64')}`,
                },
            }
        )

        if (!response.ok) {
            throw new Error('Failed to get file path');
        }

        const result = await response.json();
        return result.secure_url;
    } catch (error) {
        console.error('Get file path error:', error);
        throw error;
    }
}

export const getAssetInfo = async (publicId: string): Promise<any> => {
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload/${publicId}`,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
                    ).toString('base64')}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to get asset info');
        }

        const result = await response.json();
        return result;
        //     asset_folder: "hostel"
        // asset_id: "86d655770b9260ae2c617623f0c02534"
        // bytes: 236245
        // created_at:"2025-04-09T15:20:04Z"
        // derived: []
        // display_name: "1744212001782-532xd72tm8"
        // format: "jpg"
        // height: 1156
        // next_cursor: "e3685cfe5458b97c63b74a649d094fa5b834d7de8fbd85c0d9374190964a25b1"
        // public_id: "hostel/1744212001782-532xd72tm8"
        // resource_type: "image"
        // secure_url: "https://res.cloudinary.com/dger454syqnjb/image/upload/v1744212004/hostel/1744212001782-532xd72tm8.jpg"
        // type: "upload"
        // url: "http://res.cloudinary.com/dgesy234qnjb/image/upload/v1744212004/hostel/1744212001782-532xd72tm8.jpg"
        // version:  1744212004
        // width :  2048

    } catch (error) {
        console.error('Get asset info error:', error);
        throw error;
    }
};

export const deleteFile = async (publicId: string): Promise<any> => {
    console.log('Deleting file with publicId:', publicId);
    try {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        });

        if (!result) {
            throw new Error('Delete failed');
        }

        return result;
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
};

//return file size in bytes
export const getFileSize = async (publicId: string) => {
    const response = await await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload/${publicId}`,
        {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
                ).toString('base64')}`,
            },
        }
    )
    const result = await response.json();
    return result.bytes;
}

export const getFileFormat = async (publicId: string) => {
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload/${publicId}`,
        {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
                ).toString('base64')}`,
            },
        }
    )
    const result = await response.json();
    return result.format;
}
