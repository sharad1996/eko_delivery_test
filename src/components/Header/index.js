import React, { useState } from 'react';
import { Menu } from 'antd';
import { history } from '../../helpers'

export const Header = () => {
    const [current, setCurrent] = useState('home');

    return (
        <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" onClick={() => history.push('/')}>Home</Menu.Item>
            <Menu.Item key="optimize" onClick={() => history.push('/optimize')}>Optimize</Menu.Item>
        </Menu>
    );
}
