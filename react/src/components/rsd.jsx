import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { get, add, update, remove } from '../axios/httpRequest';
import { Dropdown } from 'primereact/dropdown';
import { Navigate, useNavigate } from "react-router-dom"

export default function GiftsDemo() {
   let emptyGift = {
        name: '',
        picture: '',
        donorId: '',
        categoryId: '',
        price: '',

    };
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [giftDialog, setGiftDialog] = useState(false);
    const [deleteGiftDialog, setDeleteGiftDialog] = useState(false);
    const [deleteGiftsDialog, setDeleteGiftsDialog] = useState(false);
    const [gift, setGift] = useState(emptyGift);
    const [selectedGifts, setSelectedGifts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [gifts, setGifts] = useState([])
    const [category, setCategory] = useState('');
    const [donor, setDonor] = useState('');
    const [winners,setWinners]=useState({});

    const navigate = useNavigate()
    const categoryf = async () => {
        const a = await get("/api/Category")
        let b = await get("/api/Donor")
        let c = []
        b.forEach(element => {
            const a = { name: element.firstName, id: element.id }
            c.push(a)
        })
        console.log(c);
        setCategory(a)
        setDonor(c)
        return a
    }
    const getAll = async () => {
        const a = await get("/api/gift")
        setGifts(a)
    }
    useEffect(() => {
        categoryf()
        getAll()
    }, [setGifts])

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const searchByPurchase = async (value) => {
        if (value != "") {
            const a = await get(/api/Gift/SearchGiftByQuantity/${value})
            setGifts(a)
        }
        else {
            getAll()

        }

    }
    const openNew = () => {
       
        setSubmitted(false);
         setGift(emptyGift);
        setGiftDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setGiftDialog(false);
        setGift(emptyGift);
        setSelectedCategory("")
        setSelectedDonor("")
    };

    const hideDeleteGiftDialog = () => {
        setDeleteGiftDialog(false);
    };

    const hideDeleteGiftsDialog = () => {
        setDeleteGiftsDialog(false);
    };

    const saveGift = async () => {
        setSubmitted(true);
        if (!gift.id) {
            if (gift.name.trim()) {
                let _gifts = [...gifts];
                let _gift = { ...gift };
                _gifts.push(_gift);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Gift Created', life: 3000 });
                _gift.categoryId = selectedCategory.id
                _gift.donorId = selectedDonor.id
                await add("/api/Gift", _gift)
                getAll()
                setGifts(_gifts);
                setGiftDialog(false);
                setGift(emptyGift);
                setSelectedCategory("")
                setSelectedDonor("")
            }
        }
        else {
            let _gift = { id: gift.id, name: gift.name, categoryId: selectedCategory.id, price: gift.price, donorId: selectedDonor.id, picture: gift.picture }
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Gift Edited', life: 3000 });
            let _gifts = [...gifts];
            _gifts.push(_gift);
            await update("/api/Gift", _gift)
            getAll()
            setGifts(_gifts);
            setGiftDialog(false);
            setGift(emptyGift);
        }
    };

    const giftRaffle=async (gift)=>{
        const win=await add(/api/Raffle/${gift.id})
        console.log(win);
        debugger
       const winner=win.user.firstName
        setWinners({ ...winners, [gift.id]: winner })
          
    }
    const editGift = (gift) => {
        setSelectedCategory(gift.category)
        const donor1={name:gift.donor.firstName,id:gift.donor.id}
        setSelectedDonor(donor1)
        setGift({ ...gift });
        setGiftDialog(true);
    };

    const confirmDeleteGift = (gift) => {
        setGift(gift);
        setDeleteGiftDialog(true);
    };

    const deleteGift = async () => {
        let _gifts = gifts.filter((val) => val.id !== gift.id);
        const a = await remove(/api/Gift/${gift.id} )
        getAll()
        setGifts(_gifts);
        setDeleteGiftDialog(false);
        setGift(emptyGift)
        if (a != "") {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'This gift already has pruchase', life: 3000 });
        }
        else {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
        }

    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteGiftsDialog(true);
    };

    const deleteSelectedGifts = () => {
        let _gifts = gifts.filter((val) => !selectedGifts.includes(val));

        setGifts(_gifts);
        setDeleteGiftsDialog(false);
        setSelectedGifts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Gifts Deleted', life: 3000 });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _gift = { ...gift };

        _gift[${name}] = val;

        setGift(_gift);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _gift = { ...gift };

        _gift[${name}] = val;

        setGift(_gift);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedGifts || !selectedGifts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={images/${rowData.picture}} alt={rowData.picture} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };
    const donorBodyTemplate = (rowData) => {
        return formatCurrency(rowData.donor.name);
    };

const seePurchase=(id)=>{
    return  navigate(../tickets ,{state:{id:id}});

}
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {winners[rowData.id]==null?<Button icon="pi pi-trophy" rounded outlined className="mr-8"severity="success" onClick={() => giftRaffle(rowData)} />:<span className="mr-8"severity="success" >{winners[rowData.id]}</span>}
                
                <Button icon="pi pi-eye" rounded outlined className="mr-2" severity="info" onClick={() => seePurchase(rowData.id)} />
                <Button icon="pi pi-pencil" rounded outlined className="mr-8" severity="primary" onClick={() => editGift(rowData)} />
                <Button icon="pi pi-trash" rounded outlined className="mr-4"severity="danger" onClick={() => confirmDeleteGift(rowData)} />
                {/* <i className="pi pi-ticket" style={{ fontSize: '2em', color: 'blue' }}></i> */}

            </React.Fragment>
        );
    };
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Gifts</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="number" inputId="integeronly" onInput={(e) => searchByPurchase(e.target.value)} placeholder="Search by number of purchase" />
            </IconField>
        </div>
    );
    const giftDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveGift} />
        </React.Fragment>
    );
    const deleteGiftDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGiftDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteGift} />
        </React.Fragment>
    );
    const deleteGiftsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGiftsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedGifts} />
        </React.Fragment>
    );
    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={gifts} selection={selectedGifts} onSelectionChange={(e) => setSelectedGifts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} gifts" f globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="category.name" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="donor.firstName" header="Donor" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={giftDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Gift Details" modal className="p-fluid" footer={giftDialogFooter} onHide={hideDialog}>
                {gift.image && <img src={images/${gift.picture}} alt={gift.image} className="gift-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={gift.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !gift.name })} />
                </div>
                <label htmlFor="name" className="font-bold">
                    Category
                </label>
                <div className="field">
{                    console.log(selectedCategory)
}                    <Dropdown value={selectedCategory} required autoFocus onChange={(e) => setSelectedCategory(e.value)} options={category} optionLabel="name"
                        placeholder="Select a Category" className="w-full md:w-100rem" />
                </div>


                <label htmlFor="name" className="font-bold">
                    Donor
                </label>
                <div className="field">
                {                    console.log(selectedDonor)
}
                    <Dropdown value={selectedDonor} required autoFocus onChange={(e) => setSelectedDonor(e.value)} options={donor} optionLabel="name"
                        placeholder="Select a Donor" className="w-full md:w-40rem" />
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Picture
                    </label>
                    <InputText id="picture" defaultValue={gift.picture} onChange={(e) => onInputChange(e, 'picture')} required autoFocus className={classNames({ 'p-invalid': submitted && !gift.picture })} />
                </div>
               
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={gift.price} required autoFocus onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                   
                </div>
            </Dialog>

            <Dialog visible={deleteGiftDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteGiftDialogFooter} onHide={hideDeleteGiftDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {gift && (
                        <span>
                            Are you sure you want to delete <b>{gift.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteGiftsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteGiftsDialogFooter} onHide={hideDeleteGiftsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {gift && <span>Are you sure you want to delete the selected gifts?</span>}
                </div>
            </Dialog>
        </div>
    );
}
