
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { get} from '../axios/httpRequest';

export default function PurchasingManagement() {
   let emptyPurchase = {
    id: 0,
    userName: "",
    password: "",
    firtName: "",
    lastName: "",
    phone: "",
    mail: "",
    permission: 2,
    purchases: {}

    };
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [purchaseDialog, setPurchaseDialog] = useState(false);
    const [deletePurchaseDialog, setDeletePurchaseDialog] = useState(false);
    const [deletePurchasesDialog, setDeletePurchasesDialog] = useState(false);
    const [purchase, setPurchase] = useState(emptyPurchase);
    const [selectedPurchases, setSelectedPurchases] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [purchases, setPurchases] = useState([])
    const [category, setCategory] = useState('');
    const [donor, setDonor] = useState('');
 
    //console.log(cities);
   
    // const categoryf = async () => {
    //     const a = await get("/api/Category")
    //     let b = await get("/api/Donor")
    //     let c = []
    //     b.forEach(element => {
    //         const a = { name: element.firstName, id: element.id }
    //         c.push(a)
    //     })

    //     console.log(c);
    //     setCategory(a)
    //     setDonor(c)
    //     return a
    // }

   


    const getAll = async () => {
        const a = await get("/api/Purchase/GetDetails")
        setPurchases(a)
    }
    useEffect(() => {
        //categoryf()
        getAll()
    }, [setPurchases])

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // };
    // const searchByPurchase = async (value) => {
    //     if (value != "") {
    //         const a = await get(`/api/Purchase/SearchPurchaseByQuantity/${value}`)
    //         setPurchases(a)
    //     }
    //     else {
    //         getAll()

    //     }

    // }
    const openNew = () => {
       
        setSubmitted(false);
         setPurchase(emptyPurchase);
        setPurchaseDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPurchaseDialog(false);
        setPurchase(emptyPurchase);
        setSelectedCategory("")
        setSelectedDonor("")
    };

    const hideDeletePurchaseDialog = () => {
        setDeletePurchaseDialog(false);
    };

    const hideDeletePurchasesDialog = () => {
        setDeletePurchasesDialog(false);
    };

    // const savePurchase = async () => {
    //     setSubmitted(true);
    //     if (!purchase.id) {
    //         if (purchase.name.trim()) {
    //             let _purchases = [...purchases];
    //             let _purchase = { ...purchase };
    //             _purchases.push(_purchase);
    //             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Purchase Created', life: 3000 });
    //             _purchase.categoryId = selectedCategory.id
    //             _purchase.donorId = selectedDonor.id
    //             await add("/api/Purchase", _purchase)
    //             getAll()
    //             // await add("/api/Donor", data)
    //             setPurchases(_purchases);
    //             setPurchaseDialog(false);
    //             setPurchase(emptyPurchase);
    //             setSelectedCategory("")
    //             setSelectedDonor("")
    //         }
    //     }
    //     else {
    //         let _purchase = { id: purchase.id, name: purchase.name, categoryId: selectedCategory.id, price: purchase.price, donorId: selectedDonor.id, picture: purchase.picture }
    //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Purchase Edited', life: 3000 });
    //         let _purchases = [...purchases];
    //         //let _purchase = { ...purchase };
    //         _purchases.push(_purchase);
    //         await update("/api/Purchase", _purchase)
    //         getAll()
    //         //getAll()
    //         // await add("/api/Donor", data)
    //         setPurchases(_purchases);
    //         setPurchaseDialog(false);
    //         setPurchase(emptyPurchase);
    //     }
    // };

    // const editPurchase = (purchase) => {
    //     setSelectedCategory(purchase.category)
    //     const donor1={name:purchase.donor.firstName,id:purchase.donor.id}
    //     setSelectedDonor(donor1)
    //     setPurchase({ ...purchase });
    //     setPurchaseDialog(true);
    // };

    // const confirmDeletePurchase = (purchase) => {
    //     setPurchase(purchase);
    //     setDeletePurchaseDialog(true);
    // };

    // const deletePurchase = async () => {
    //     let _purchases = purchases.filter((val) => val.id !== purchase.id);
    //     const a = await remove(`/api/Purchase/${purchase.id} `)
    //     getAll()
    //     setPurchases(_purchases);
    //     setDeletePurchaseDialog(false);
    //     setPurchase(emptyPurchase)
    //     if (a != "") {
    //         toast.current.show({ severity: 'error', summary: 'Error', detail: 'This purchase already has pruchase', life: 3000 });
    //     }
    //     else {
    //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Purchase Deleted', life: 3000 });
    //     }

    // };

    // const findIndexById = (id) => {
    //     let index = -1;

    //     for (let i = 0; i < purchases.length; i++) {
    //         if (purchases[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    // const confirmDeleteSelected = () => {
    //     setDeletePurchasesDialog(true);
    // };

    // const deleteSelectedPurchases = () => {
    //     let _purchases = purchases.filter((val) => !selectedPurchases.includes(val));

    //     setPurchases(_purchases);
    //     setDeletePurchasesDialog(false);
    //     setSelectedPurchases(null);
    //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Purchases Deleted', life: 3000 });
    // };

    // const onCategoryChange = (e) => {
    //     let _purchase = { ...purchase };

    //     _purchase['category.name'] = e.value;
    //     setPurchase(_purchase);
    // };

    // const onInputChange = (e, name) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _purchase = { ...purchase };

    //     _purchase[`${name}`] = val;

    //     setPurchase(_purchase);
    // };

    // const onInputNumberChange = (e, name) => {
    //     const val = e.value || 0;
    //     let _purchase = { ...purchase };

    //     _purchase[`${name}`] = val;

    //     setPurchase(_purchase);
    // };

    // const leftToolbarTemplate = () => {
    //     return (
    //         <div className="flex flex-wrap gap-2">
    //             <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
    //             <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPurchases || !selectedPurchases.length} />
    //         </div>
    //     );
    // };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    // const imageBodyTemplate = (rowData) => {
    //     return <img src={`images/${rowData.picture}`} alt={rowData.picture} className="shadow-2 border-round" style={{ width: '64px' }} />;
    // };

    // const priceBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.price);
    // };
    // const donorBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.donor.name);
    // };


    // const statusBodyTemplate = (rowData) => {
    //     return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    // };
// 
    // const actionBodyTemplate = (rowData) => {
    //     return (
    //         <React.Fragment>
    //             <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editPurchase(rowData)} />
    //             <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeletePurchase(rowData)} />
    //         </React.Fragment>
    //     );
    // };

    // const getSeverity = (purchase) => {
    //     switch (purchase.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Purchases</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />

            </IconField>
            {/* <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="number" inputId="integeronly" onInput={(e) => searchByPurchase(e.target.value)} placeholder="Search by number of purchase" />
            </IconField> */}

        </div>
    );
    // const purchaseDialogFooter = (
    //     <React.Fragment>
    //         <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
    //         <Button label="Save" icon="pi pi-check" onClick={savePurchase} />
    //     </React.Fragment>
    // );
    // const deletePurchaseDialogFooter = (
    //     <React.Fragment>
    //         <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePurchaseDialog} />
    //         <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deletePurchase} />
    //     </React.Fragment>
    // );
    // const deletePurchasesDialogFooter = (
    //     <React.Fragment>
    //         <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePurchasesDialog} />
    //         <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedPurchases} />
    //     </React.Fragment>
    // );

    return (
        <div>

            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4"  right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={purchases} 
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} purchases" f globalFilter={globalFilter} header={header}>
                   
                    <Column field="firstName" header="FirstName" sortable style={{ minWidth: '10rem' }}></Column>
                    {/* <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="lastName" header="LastName" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="userName" header="UserName" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="phone" header="Phone" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="mail" header="Mail" sortable style={{ minWidth: '10rem' }}></Column>
                    {/* <Column field="donor.name" header="Donor" body={donorBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column> */}
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
                </DataTable>
            </div>

     

        </div>
    );
}
