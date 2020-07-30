import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Popconfirm, Form, Button } from 'antd';
import { EditableCell } from './EditableCell';
import { deliveryActions } from '../../actions';

const DeliveryRoutesTable = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const data = useSelector((state) => state.delivery.data);

    const isEditing = record => record.key === editingKey;

    // Edit functionality
    const edit = record => {
        form.setFieldsValue({
            source: '',
            target: '',
            cost: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    // Delete functionality
    const deleteRecord = key => {
        const newData = [...data];
        const updateData = newData.filter(item => key !== item.key);
        dispatch(deliveryActions.setData(updateData))
    }

    // Add new record
    const addRecord = () => {
        const newData = [...data];
        newData.push({
            key: `${newData.length}`,
            source: "",
            target: "",
            cost: null
        });
        dispatch(deliveryActions.setData(newData))
    }

    // Edit cancel
    const cancel = () => {
        setEditingKey('');
    };

    // Edit save
    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                dispatch(deliveryActions.setData(newData))
                setEditingKey('');
            } else {
                newData.push(row);
                dispatch(deliveryActions.setData(newData))
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Source Name',
            dataIndex: 'source',
            width: '20%',
            editable: true,
        },
        {
            title: 'Target Name',
            dataIndex: 'target',
            width: '20%',
            editable: true,
        },
        {
            title: 'Delivery Cost',
            dataIndex: 'cost',
            width: '20%',
            editable: true,
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            width: '20%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </a>
                    );
            },
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            width: '20%',
            render: (_, record) => {
                return (
                    <a disabled={editingKey !== ''} onClick={() => deleteRecord(record.key)}>
                        Delete
                    </a>
                )
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'cost' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                />
            </Form>
            <Button block type="primary" onClick={addRecord}>Add</Button>
        </>
    );
};

export default DeliveryRoutesTable;
