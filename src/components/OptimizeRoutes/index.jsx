import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button, Card } from 'antd';
import { optimizeRouteCosts } from '../../utils';
import Delete from '../../images/delete.svg';

const OptimizeRoutes = () => {
    const initialValues = [
        { name: 'source', value: '' },
        { name: 'target', value: '' },
    ]
    const [result, setResult] = useState('');
    const [values, setValues] = useState(initialValues);
    let [count, setCount] = useState(0);
    const data = useSelector((state) => state.delivery.data);

    // Optimize routes
    const onSubmit = () => {
        const result = optimizeRouteCosts(values, data);
        setResult(result);
    };

    const handleChange = (key, value) => {
        const newValues = [...values]
        newValues.forEach((item) => {
            if (item.name === key) {
                item.value = value;
            }
        })
        setValues(newValues);
    }

    // Add new input box
    const addInput = () => {
        const newValues = [...values]
        count = count + 1
        newValues.push({ name: `target_${count}`, value: '' })
        setCount(count)
        setValues(newValues)
    }

    // Delete input box
    const deleteInput = (selectedIndex) => {
        const newValues = [...values]
        const updatedValues = newValues.filter((item, index) => index !== selectedIndex)
        setValues(updatedValues)
    }

    return (
        <Card title="Optimize Routes">
            <p className="optimize-routes">
                {values.map((item, index) => {
                    return <span key={`route-${index}`}>
                        {item.value} {index !== (values.length - 1) && item.value !== '' && <span>-</span>}
                    </span>
                })}
            </p>
            {result !== '' && <p className="optimize-routes">Total Cost : {result}</p>}
            {values.map((item, index) => (
                <>
                    <Input key={`input-${index}`} className="optimize-input" placeholder={item.name} name={item.name} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
                    <img className="delete-image" onClick={() => deleteInput(index)} src={Delete} />
                </>
            ))}
            <Button className="optimize-button" block type="primary" onClick={addInput}>Add</Button>
            <Button className="optimize-button" block type="primary" onClick={onSubmit}>Optimize</Button>
        </Card>
    );
};

export default OptimizeRoutes;
