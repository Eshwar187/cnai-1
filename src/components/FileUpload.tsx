import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
  };

  if (selectedFile) {
    return (
      <Card className="border-2 border-success/20 bg-success-light p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Check className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-success-foreground">
                {selectedFile.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          {isDragActive ? (
            <Upload className="w-6 h-6 text-primary" />
          ) : (
            <FileText className="w-6 h-6 text-primary" />
          )}
        </div>
        <div>
          <p className="text-lg font-medium mb-2">
            {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your file here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, DOC, DOCX, and TXT files (max 10MB)
          </p>
        </div>
        <Button variant="outline" type="button">
          <Upload className="w-4 h-4 mr-2" />
          Choose File
        </Button>
      </div>
    </div>
  );
};