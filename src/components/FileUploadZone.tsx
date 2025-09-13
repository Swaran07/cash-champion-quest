import { useState, useCallback } from 'react';
import { Upload, FileText, Image, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FileUploadZoneProps {
  onUpload: (file: File) => void;
}

export function FileUploadZone({ onUpload }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(processFile);
  }, []);

  const processFile = async (file: File) => {
    setIsUploading(true);
    
    // Simulate upload processing
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, file.name]);
      setIsUploading(false);
      onUpload(file);
    }, 2000);
  };

  const getFileIcon = (filename: string) => {
    if (filename.toLowerCase().includes('.csv') || filename.toLowerCase().includes('.xlsx')) {
      return <FileText className="w-6 h-6 text-success" />;
    }
    if (filename.toLowerCase().includes('.jpg') || filename.toLowerCase().includes('.png')) {
      return <Image className="w-6 h-6 text-accent" />;
    }
    return <FileText className="w-6 h-6 text-primary" />;
  };

  return (
    <Card className="gaming-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Upload Bank Statement
          </h3>
          
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
              ${isDragOver 
                ? 'border-primary bg-primary/10 scale-105' 
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Upload className={`w-8 h-8 text-primary ${isDragOver ? 'animate-bounce' : ''}`} />
              </div>
              
              <div>
                <p className="text-lg font-semibold">Drop your files here</p>
                <p className="text-muted-foreground">or click to browse</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports CSV, Excel, PNG, JPG files
                </p>
              </div>
              
              <input
                type="file"
                multiple
                accept=".csv,.xlsx,.xls,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              
              <Button variant="gaming" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                <span className="text-sm">Processing your file...</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill animate-progress-fill"></div>
              </div>
            </div>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-success flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Successfully Uploaded
              </h4>
              {uploadedFiles.map((filename, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                  {getFileIcon(filename)}
                  <span className="text-sm font-medium">{filename}</span>
                  <div className="ml-auto text-success animate-bounce">✅</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}