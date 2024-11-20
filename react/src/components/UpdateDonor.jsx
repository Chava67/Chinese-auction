
import { get, remove, update } from "../axios/httpRequest"
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
const UpdateDonor = (props) => {
    const toast = useRef(null);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [fileKey, setFileKey] = useState(0);
    const handleFileUpload = async (event) => {
        const uploadedFile = event.files[0];
        setFileName(uploadedFile); // שמירת האובייקט File עצמו במשתנה ה-state
        console.log('Uploaded file name:', uploadedFile.name);
    };

    const customUpload = (event) => {
        handleFileUpload(event);
    };

    const handleSelect = (e) => {
        if (e.files.length > 0) {
            setFileName(e.files[0]); // שמירת האובייקט File עצמו במשתנה ה-state
        }
    };

    const defaultValues = {
        id: props.donor.id,
        firstName: props.donor.firstName,
        lastName: props.donor.lastName,
        phone: props.donor.phone,
        mail: props.donor.mail,
        picture: props.donor.picture
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        //getValues,
        //reset
    } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        //let d =
        try {
            const formData = new FormData();
            formData.append('file', fileName);

            const response = await axios.post('http://localhost:5281/api/File/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        // Add FilePath to your 'data' object if required
        //  data.picturePath = FilePath;
        data.picture = fileName != null ? fileName.name : props.donor.picture
        data && await update("/api/Donor", data)
        setVisibleEdit(false)
        props.getAll()
        // reset();

    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const cancel = () => {
        //reset()
        setVisibleEdit(false)
    }
    return (
        <>
            <Button label="Edit" icon="pi pi-pen-to-square" onClick={() => setVisibleEdit(true)} />
            <Dialog header="Edit Donor" visible={visibleEdit} modal={false} style={{ width: '20vw' }} onHide={() => cancel()}>
                <div className="card flex justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
                        <Toast ref={toast} />
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{ required: 'firstName is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.firstName} className={classNames({ 'p-error': errors.firstName })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.firstName} defaultValue={props.donor.firstName} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.firstName}>firstName</label>
                                    </span>
                                    {getFormErrorMessage(field.firstName)}
                                </>
                            )}
                        />
                        <Toast ref={toast} />
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{ required: 'lastName is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.lastName} className={classNames({ 'p-error': errors.lastName })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.lastName} defaultValue={props.donor.lastName} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.lastName}>lastName</label>
                                    </span>
                                    {getFormErrorMessage(field.lastName)}
                                </>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: 'phone is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.phone} className={classNames({ 'p-error': errors.phone })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.phone} defaultValue={props.donor.phone} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.phone}>phone</label>
                                    </span>
                                    {getFormErrorMessage(field.phone)}
                                </>
                            )}
                        />
                        <Controller
                            name="mail"
                            control={control}
                            rules={{ required: 'mail is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.mail} className={classNames({ 'p-error': errors.mail })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.mail} defaultValue={props.donor.mail} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.mail}>mail</label>
                                    </span>
                                    {getFormErrorMessage(field.mail)}
                                </>
                            )}
                        />
                        <Controller
                            name="picture"
                            control={control}
                            // rules={{ required: 'picture is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.picture} className={classNames({ 'p-error': errors.picture })}></label>
                                    <label htmlFor={field.picture}>Picture</label>
                                    <span className="p-float-label">
                                        <div>
                                            <FileUpload
                                            id={field.picture} defaultValue={fileName != null ? fileName.name : ""} className={classNames({ 'p-invalid': fieldState.error })} 
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
                                            <p>File Name: {fileName!=null?fileName.name:props.donor.picture}</p>
                                        </div>
                                        {/* <input type="file" onChange={handleFileChange} /> */}
                                        {/* <input type="file" id={field.picture} defaultValue={file != null ? file.name : ""} className={classNames({ 'p-invalid': fieldState.error })} onChange={handleFileChange} /> */}

                                    </span>
                                    {getFormErrorMessage(field.picture)}
                                </>
                            )}
                        />
                        <Toast ref={toast}></Toast>
                        <Button label="Submit" type="submit" icon="pi pi-check" />
                    </form>
                </div>
            </Dialog>
        </>
    )
}
export default UpdateDonor;