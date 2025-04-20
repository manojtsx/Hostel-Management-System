"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { uploadFile, getAssetInfo, deleteFile, getFilePath, getFileSize, getFileFormat } from "@/utils/filehandling/uploadFile"

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [colors, setColors] = useState<string[]>([])
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [fileFormat, setFileFormat] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setUploadResult(null)
      setColors([])
      setFileUrl(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)
    
    try {
      // Step 1: Upload the file
      const result = await uploadFile(file, "student")
      setUploadResult(result)

      // Step 2: Get asset info (colors)
      if (result) {
        const infoResult = await getAssetInfo(result)
        setColors(infoResult.colors || [])
        setFileSize(await getFileSize(result))
        setFileFormat(await getFileFormat(result))
          // If no colors, just get the regular URL
          setFileUrl(await getFilePath(result))
      }
    } catch (error: any) {
      console.error("Operation failed:", error)
      setError(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!uploadResult) return

    try {
      await deleteFile(uploadResult)
      
      // Reset all states
      setFile(null)
      setUploadResult(null)
      setColors([])
      setFileUrl(null)
    } catch (error: any) {
      console.error("Delete failed:", error)
      setError(error.message)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>File Upload Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Select Image</Label>
          <Input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
          >
            {uploading ? "Processing..." : "Upload"}
          </Button>
          
          {uploadResult && (
            <Button 
              variant="destructive"
              onClick={handleDelete}
              disabled={uploading}
            >
              Delete
            </Button>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {uploadResult && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Upload Results:</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Public ID:</span> {uploadResult}</p>
                <p><span className="font-medium">URL:</span> {fileUrl}</p>
                <p><span className="font-medium">Format:</span> {fileFormat}</p>
                <p><span className="font-medium">Size:</span> {fileSize} bytes</p>
              </div>
            </div>

            {colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Colors:</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {fileUrl && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Preview:</h4>
                <img 
                  src={fileUrl} 
                  alt="Uploaded image" 
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 