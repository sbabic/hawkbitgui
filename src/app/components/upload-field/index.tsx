'use client';

import type React from 'react';
import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import styles from './styles.module.scss';
import Button from '../button';
import UploadIcon from '../icons/upload-icon';

interface FileUploaderProps {
  isLoading: boolean;
  isDisabled: boolean;
  onFileSelect: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ isLoading, isDisabled, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && onFileSelect) {
      onFileSelect(files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onFileSelect) {
      onFileSelect(Array.from(e.target.files));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`${styles.fileUploader} ${isDragging ? styles.dragging : ''} ${isDisabled ? styles.disabled : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.content}>
        <p className={styles.text}>Drop Files to upload</p>
        <Button variant='outline' className={styles.uploadButton} onClick={handleButtonClick} type='button' leftIcon={<UploadIcon />} isLoading={isLoading}>
          Upload File
        </Button>

        <input ref={fileInputRef} type='file' disabled={isLoading || isDisabled} className={styles.fileInput} onChange={handleFileInputChange} multiple />
      </div>
    </div>
  );
};

export default FileUploader;
