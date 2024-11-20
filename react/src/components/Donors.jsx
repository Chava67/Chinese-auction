import { get, remove } from "../axios/httpRequest"
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Avatar } from 'primereact/avatar';
import UpdateDonor from "./UpdateDonor";
import AddDonor from "./AddDonor";
import { Toast } from 'primereact/toast';
import ShowGifts from "./shoeGift";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ImageDisplay from "./ImageDisplay";
const Donors = () => {
    const [donors, setDonors] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Name");
    const [searchQuery, setSearchQuery] = useState('');
    const serverUrl = 'http://localhost:5281';
    const options = [
        { label: 'name', value: 'Name' },
        { label: 'email', value: 'Email' },
        { label: 'gift', value: 'Gift' }
    ];

    const handleSearch = async(value) => {
        if(value!=""){
        const a=await get(`/api/Donor/SearchBy${selectedOption}/${value}`)
        setDonors(a)
        }
        else{
            getAll()
        }

        //console.log(`Searching for ${searchQuery} by ${selectedOption}`);
        // Add your search logic here
    };
    const getAll = async () => {
        const a = await get("/api/Donor")
        setDonors(a)
    }
    const toast = useState(null);
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'This donor already has gifts', life: 3000 });
    }
    useEffect(() => {
        getAll()
    }, [setDonors])

    const getdonorsSmall = () => {
        return Promise.resolve(donors.slice(0, 10));
    }
    useEffect(() => {
        getdonorsSmall().then((data) => setDonors(data.slice(0, 5)));
    }, []);
    const deleteDonors = async (donor) => {
        const res = await remove(`/api/Donor/${donor.id}`)
        if (res != "") {
            showError()
        }
        getAll()
    }
    const itemTemplate = (donor, index) => {
        return (
            <div className="col-12" key={donor.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`images/${donor.picture}`}shape="circle" alt={donor.name} /> */}
                    <Avatar image={`${serverUrl}/api/File/get/${donor.picture}`} className="mr-2" size="xlarge" shape="circle" />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{donor.firstName + " " + donor.lastName}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-at"></i>
                                    <span className="font-semibold">{donor.mail}</span>
                                </span>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <i className="pi pi-phone"></i>
                                <span className="font-semibold">{donor.phone}</span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <ShowGifts gifts={donor.gifts}></ShowGifts>
                            <UpdateDonor donor={donor} setDonors={setDonors} getAll={getAll}></UpdateDonor>
                            <Button label="Delete" icon="pi pi-trash" onClick={() => deleteDonors(donor)} />
                            <Toast ref={toast} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;
        let list = items.map((donor, index) => {
            console.log(donor.gifts[0]);
            return itemTemplate(donor, index);
        });
        return <div className="grid grid-nogutter">{list}</div>;
    };
    const header = () => {
        return   (
            <div className="p-d-flex p-ai-center p-flex-column">
            <div className="p-d-flex p-ai-center p-mb-3">
            <AddDonor className="mr-3 ml-5" getAll={getAll} />
            <Dropdown
                className="mr-3 ml-3"
                value={selectedOption}
                options={options}
                onChange={(e) => setSelectedOption(e.value)}
                
            />  
                <span className="p-input-icon-left custom-icon ">
                <IconField iconPosition="left">      
                <InputIcon className="pi pi-search" />
                     <InputText
                        //value={searchQuery}
                        placeholder=" Search... "
                        className="p-ml-2"
                        inputId="integeronly"
                        onInput={(e) => handleSearch(e.target.value) }
                    />
                    </IconField>
                </span>
            </div>
        </div>)
    };
    return (
        <>
           
           <header></header>
            <div className="card">
                <DataView header={header()}  value={donors} listTemplate={listTemplate} />
            </div>
        </>

    )
}
export default Donors
