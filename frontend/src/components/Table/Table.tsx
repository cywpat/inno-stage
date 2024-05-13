import React from 'react';
import DataTable, { TableColumn, TableProps, createTheme } from 'react-data-table-component';
import { customStyles } from './styles';

interface DataRow {
    id: number;
	so: number;
	status: string;
	dateDrawn: string;
    dateReturned: string;
    noOfCartons: number;
};

const props: TableProps<DataRow>[] = [];

// const Table: React.FC<DataRow> = ({ id, so, status, dateDrawn, dateReturned, noOfCartons }) => {
// 	const data1: DataRow[] = [
//         {
//             id: id,
//             so: so, 
//             status: status,
//             dateDrawn: dateDrawn, 
//             dateReturned: dateReturned, 
//             noOfCartons: noOfCartons
//         },
//     ]
    
//     return (
//         <>
//             {/* <DataTable columns={columns} data={data} /> */}
//             <DataTable columns={columns} data={data1} />
//         </>
//     );
// };

// function TableT<T>: React.FC<TableProps<T>> = () => {
//     return (<div></div>);
// };

createTheme(
    'why', 
    {
        background: {
            default: '#e7d836'
        },
        striped: {
            default: '#b5cef5'
        },
        highlightOnHover: {
            default: '#2325e5'
        }
    }, 
    'default', 
);

function Table<T> (props: TableProps<T>): JSX.Element {
    return (
        <>
            <DataTable 
                pagination 
                highlightOnHover 
                striped 
                theme='why' 
                customStyles={customStyles} 
                {...props} 
            />
        </>
    );
};

export default Table;