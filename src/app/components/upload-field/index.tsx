'use client';

import type React from 'react';
import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import styles from './styles.module.scss';
import Button from '../button';

interface FileUploaderProps {
    onFileSelect: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
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
            className={`${styles.fileUploader} ${isDragging ? styles.dragging : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className={styles.content}>
                <div className={styles.arrow}>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M12 4L12 16' stroke='#888888' strokeWidth='2' strokeLinecap='round' />
                        <path d='M7 11L12 16L17 11' stroke='#888888' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                </div>
                <p className={styles.text}>Drop Files to upload</p>
                <Button className={styles.uploadButton} onClick={handleButtonClick} type='button'>
                    Upload File
                </Button>
                <input ref={fileInputRef} type='file' className={styles.fileInput} onChange={handleFileInputChange} multiple />
            </div>
        </div>
    );
};

export default FileUploader;
