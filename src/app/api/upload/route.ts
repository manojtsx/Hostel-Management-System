import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const action = formData.get("action") as string
    
    if (action === "upload") {
      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "hostel",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error)
            resolve(result)
          }
        ).end(buffer)
      })

      return NextResponse.json(result)
    } else if (action === "getInfo") {
      const publicId = formData.get("publicId") as string
      if (!publicId) {
        return NextResponse.json({ error: "No public ID provided" }, { status: 400 })
      }

      const result = await cloudinary.api.resource(publicId, { colors: true })
      return NextResponse.json(result)
    } else if (action === "createTag") {
      const publicId = formData.get("publicId") as string
      const colors = JSON.parse(formData.get("colors") as string) as string[]
      
      if (!publicId || !colors || colors.length < 2) {
        return NextResponse.json({ error: "Invalid parameters" }, { status: 400 })
      }

      const [effectColor, backgroundColor] = colors
      const imageTag = cloudinary.image(publicId, {
        transformation: [
          { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
          { radius: 'max' },
          { effect: 'outline:10', color: effectColor },
          { background: backgroundColor },
        ],
      })

      return NextResponse.json({ tag: imageTag })
    } else if (action === "delete") {
      const publicId = formData.get("publicId") as string
      if (!publicId) {
        return NextResponse.json({ error: "No public ID provided" }, { status: 400 })
      }

      const result = await cloudinary.uploader.destroy(publicId)
      return NextResponse.json(result)
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error: any) {
    console.error("API error:", error)
    return NextResponse.json({ error: error.message || "Operation failed" }, { status: 500 })
  }
} 