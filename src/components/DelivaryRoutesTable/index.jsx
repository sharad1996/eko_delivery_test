import React, { useState } from 'react';
import { Table, Popconfirm, Form, Button } from 'antd';
import { EditableCell } from './EditableCell';

const originData = [];

for (let i = 0; i < 10; i++) {
    originData.push({
        key: i.toString(),
        source_name: `A ${i}`,
        target_name: `B ${i}`,
        cost: 10 + i,
    });
}

const DelivaryRoutesTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            source_name: '',
            target_name: '',
            cost: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const deleteRecord = key => {
        const newData = [...data];
        const updateData = newData.filter(item => key !== item.key);
        setData(updateData);
    }

    const addRecord = () => {
        const newData = [...data];
        newData.push({
            key: `${newData.length}`,
            source_name: "",
            target_name: "",
            cost: null
        });
        setData(newData)
    }

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Source Name',
            dataIndex: 'source_name',
            width: '20%',
            editable: true,
        },
        {
            title: 'Target Name',
            dataIndex: 'target_name',
            width: '20%',
            editable: true,
        },
        {
            title: 'Delivary Cost',
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
                            href="javascript:;"
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

export default DelivaryRoutesTable;
