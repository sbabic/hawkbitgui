import StaticCard from '@/app/components/static-card';
import FileUploader from '@/app/components/upload-field';

interface UploadArtifactCardProps {
  isUploading: boolean;
  isDisabled: boolean;
  onFileSelect: (files: File[]) => void;
}

export default function UploadArtifactCard({ isUploading, isDisabled, onFileSelect }: UploadArtifactCardProps) {
  return (
    <StaticCard style={{ height: '100%' }}>
      <StaticCard.Header>
        <StaticCard.Title>Upload Artifact</StaticCard.Title>
      </StaticCard.Header>
      <StaticCard.Divider />
      <StaticCard.Body style={{ height: '100%' }}>
        <FileUploader isDisabled={isDisabled} isLoading={isUploading} onFileSelect={onFileSelect} />
      </StaticCard.Body>
    </StaticCard>
  );
}
