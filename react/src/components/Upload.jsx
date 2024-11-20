import React, { useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const FileUploadDemo = () => {
    const [fileName, setFileName] = useState('');
    const [fileKey, setFileKey] = useState(0);

    const handleFileUpload = (event) => {
        const uploadedFile = event.files[0];
        setFileName(uploadedFile.name);
        console.log('Uploaded file name:', uploadedFile.name);

        // העלאה מדומה לשרת
        const formData = new FormData();
        formData.append('file', uploadedFile);

        // לדוגמה, שימוש ב-Axios להעלאה לשרת
        // axios.post('/upload', formData).then(response => {
        //     console.log('File uploaded successfully');
        // });
    };

    const customUpload = (event) => {
        handleFileUpload(event);
    };

    const handleSelect = (e) => {
        if (e.files.length > 0) {
            setFileName(e.files[0].name);
            setFileKey(prevKey => prevKey + 1); // שינוי ה-key על מנת לאפס את הקובץ שנבחר
        }
    };

    return (
        <div>
            <FileUpload
                key={fileKey} // שימוש ב-key דינמי
                mode="basic"
                name="demo"
                accept="image/*"
                customUpload={true}
                uploadHandler={customUpload}
                chooseLabel="Select Image"
                auto
                onSelect={handleSelect}
                emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>}
            />
            {fileName && <p>File Name: {fileName}</p>}
        </div>
    );
};

export default FileUploadDemo;
