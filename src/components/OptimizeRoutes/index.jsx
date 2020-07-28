import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const OptimizeRoutes = () => {
    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    return (
        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
            <Form.List name="names">
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            <Card title="Optimize Routes" bordered={false}>
                                <p>Routes : Cost</p>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        formItemLayoutWithOutLabel
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: 'Please insert route name!'
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input style={{ width: '60%', textTransform: 'uppercase' }} />
                                        </Form.Item>
                                        {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                        <PlusOutlined /> Add field
                                    </Button>
                                </Form.Item>
                            </Card>
                        </div>
                    );
                }}
            </Form.List>
        </Form>
    );
};

export default OptimizeRoutes;
