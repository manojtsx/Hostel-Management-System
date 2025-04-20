import { FileUpload } from "@/components/admin/upload/FileUpload"

export default function UploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">File Upload Test</h1>
      <FileUpload />
    </div>
  )
} 