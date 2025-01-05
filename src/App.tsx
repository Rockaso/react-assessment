import React, { useState } from 'react';
import {
    BookOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Button, ConfigProvider, Flex, Layout, Menu, Space, theme } from 'antd';
import { Itineraries } from './modules/Itineraries';
const { Header, Sider, Content } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Itineraries', '1', <BookOutlined />),
    getItem('Log Out', '2', <LogoutOutlined />),
];


export function App() {





    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [menuIndex, setIndex] = useState<Number>(1)



    return (

        <>

            <ConfigProvider

                theme={{
                    components: {
                        Menu: {
                            itemSelectedBg: '#D3F5E3',
                            iconSize: 24,
                            collapsedIconSize: 24
                        },

                        Statistic: {
                            colorTextDescription: '#333333'
                        }
                    },

                    token: {
                        colorPrimary: '#007BFF', // Changed to blue
                        colorInfo: '#B2D7C1'
                    }
                }}

            >



                <Layout >
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <Space align='center' size="middle">
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{ fontSize: '16px', width: 64, height: 64 }}
                            />
                            <Flex gap="middle" align='center' justify='flex-start'>
                                <img src="Auxo.svg" alt="Logo" style={{ width: '80px', height: '80px' }} />
                            </Flex>

                        </Space>

                    </Header>
                    <Layout hasSider>

                        <Sider style={{ backgroundColor: '#fff' }}
                            breakpoint="xxl"
                            trigger={null} collapsible collapsed={collapsed}>
                            <div />
                            <Menu
                                theme="light"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                items={items}
                                onSelect={(e) => setIndex(Number(e.key))}
                            />
                        </Sider>
                        <Content
                            style={{
                                padding: 24,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {
                                (() => {
                                    switch (menuIndex) {
                                        case 1: return <Itineraries onSelect={(itinerary) => console.log(itinerary)} />;
                                        default:
                                            return <Itineraries onSelect={(itinerary) => console.log(itinerary)} />;
                                    }
                                })()
                            }
                        </Content>
                    </Layout>
                </Layout>

            </ConfigProvider>

        </>
    )

}
