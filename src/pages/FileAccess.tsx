import { Upload } from '@mui/icons-material';
import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const FileAccess = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('myfile', selectedFile);
      fetch('http://192.168.1.22:9001/blob/documents', {
        method: 'POST',
        body: formData,
        headers: { authtoken: 'allow' },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
        if(response.status === "Success"){
            console.log('Document uploaded successfully!');
            setSelectedFile(null);
        }else{
         console.log('Error uploading Document.');
        }
        })
        .catch((error) => {
          console.log('error', error);
        });
    //   console.log('Uploading file:', selectedFile);
    } else {
      console.log('Please select a file.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
   
   
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <Upload style={{ fontSize: 30, marginTop: 10 }} />
     
      
        <Button onClick={handleUpload}>Upload PDF</Button>
    
  </Container>
  );
};

export default FileAccess;
