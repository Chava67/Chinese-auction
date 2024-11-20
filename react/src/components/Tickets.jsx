import { useLocation } from "react-router-dom"
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { get, add, update, remove } from '../axios/httpRequest';
import { Dropdown } from 'primereact/dropdown';



const Tickets=(props)=>{
    const location = useLocation()

    let emptyPurchase = {
            id:"",
            gift: "",
            giftId:" ",
            purchase: {},
            quantity:0
        };
        
        const [globalFilter, setGlobalFilter] = useState(null);
        const toast = useRef(null);
        const dt = useRef(null);
        const [purchases, setPurchases] = useState([])
        {debugger}
        const getAll = async () => {
            const a = await get(`/api/Purchase/GetPurchaseByGift/${location.state.id}`)
            setPurchases(a)
        }
        useEffect(() => {
            getAll()
        }, [setPurchases])
       
        const exportCSV = () => {
            dt.current.exportCSV();
        };
        const rightToolbarTemplate = () => {
            return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
        };
        const header = (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Manage Purchases</h4>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
    
                </IconField>
              
            </div>
        );    
    return (
        <div>

            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4"  right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={purchases} 
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} purchases" f globalFilter={globalFilter} header={header}>
                   
                    <Column field="gift.name" header="gift" sortable style={{ minWidth: '10rem' }}></Column>
                    {/* <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column field="purchase.co" header="LastName" sortable style={{ minWidth: '10rem' }}></Column> */}
                   <Column field="purchase.customer.userName" header="UserName" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="purchase.date" header="Date" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="quantity" header="Quantity" sortable style={{ minWidth: '10rem' }}></Column>
                    
                    {/* <Column field="donor.name" header="Donor" body={donorBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column> */}
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
                </DataTable>
            </div>

     

        </div>
    );

}
export default Tickets

