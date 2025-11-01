import React from 'react';
import { FaUser } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const ActionNavbar: React.FC = () => {
    const utilities: MenuProps['items'] = [
        {
            label: (
                <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                    1st menu item
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
                    2nd menu item
                </a>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];

    const user: MenuProps['items'] = [
        {
            label: 'username',
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                    Đổi thông tin
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
                    Đổi mật khẩu
                </a>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                    Đổi thông tin
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
                    Đổi mật khẩu
                </a>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    return (
        <nav className="bg-gray-100 text-black py-4 px-6 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
            <ul className="flex space-x-6">
                <li><Link to="/" className="hover:text-gray-300">Trang chủ</Link></li>
                <li><Link to="/" className="hover:text-gray-300">Thêm truyện</Link></li>
                <li>
                    <Dropdown menu={{ items: utilities }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Tiện ích
                                <MdOutlineArrowDropDown className='text-2xl'/>
                            </Space>
                        </a>
                    </Dropdown>
                </li>
            </ul>
            <Dropdown menu={{ items: user }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <FaUser className="text-gray-600" />
                        <MdOutlineArrowDropDown className='text-2xl'/>
                    </Space>
                </a>
            </Dropdown>
        </nav>
    );
};

export default ActionNavbar;