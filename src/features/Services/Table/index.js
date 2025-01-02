'use client'
import { formatMinutesToHoursAndMinutes } from '@/utils/tools';

//services
import { getServices } from '@/hooks/Services';

//components
import DynamicTable from '@/components/ui/Table';
import WarningModal from '@/components/ui/Modal/Warning';

// react 
import { useState } from 'react';
import EditServices from '../EditServices';
import { PermissionAccess } from '@/middleware/PermissionAccess';
import PaginationFeature from '@/features/Appointments/PaginationFeature/PaginationFeature';

const ServiceTable = () => {
    //block 
    const [warningModal, setwarningModal] = useState(false);
    const [warningTitle, setwarningTitle] = useState('');

    const [editService, setEditService] = useState({
        open: false,
        data: {}
    });

    const { data, res, setPage } = getServices(10);
    let tableFormat = data.map((item) => {

        return {
            "title": {
                bold: true,
                type: "custom",
                value: <span className='text-blue-600 cursor-pointer' style={{ cursor: "pointer" }} onClick={() => setEditService((old) => ({ ...old, open: !old.open, data: item }))} >{item.title}</span>
            },
            "duration": formatMinutesToHoursAndMinutes(item.duration),
            "price": `$ ${item.price}`,
        }
    });

    return <>
        <PermissionAccess requiredPermissions={["view_service"]}>
            <DynamicTable columns={columns} data={tableFormat} />

            {/* pagination */}
            <PaginationFeature totalPage={res.totalPages} setPage={setPage} />
        </PermissionAccess>

        <WarningModal title={warningTitle} open={warningModal} updateOpen={setwarningModal} />

        <PermissionAccess requiredPermissions={["edit_service"]}>
            {editService.open && <EditServices defaultData={editService.data} />}
        </PermissionAccess>
    </>

};

const columns = [
    "Title",
    "duration",
    "Price"
];

export default ServiceTable;