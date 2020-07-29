import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const OptimizeRoutes = () => {
    const initialValues = [
        { name: 'source_name', value: '' },
        { name: 'target_name', value: '' },
    ]
    const [values, setValues] = useState(initialValues);
    let [count, setCount] = useState(0);

    const onFinish = () => {
        console.log('Received values of form:', values);
    };

    const handleChange = (key, value) => {
        const newValues = [...values]
        newValues.map((item) => {
            if (item.name === key) {
                item.value = value;
            }
        })
        setValues(newValues);
    }

    const add = () => {
        const newValues = [...values]
        count = count + 1
        newValues.push({ name: `target_name_${count}`, value: '' })
        setCount(count)
        setValues(newValues)
    }

    return (
        <Card title="Optimize Routes">
            {values.map((item) => (
                <Input className="optimize-input" placeholder={item.name} name={item.name} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
            ))}
            <Button className="optimize-button" block type="primary" onClick={add}>Add</Button>
            <Button className="optimize-button" block type="primary" onClick={onFinish}>Optimize</Button>
        </Card>
    );
};

export default OptimizeRoutes;
