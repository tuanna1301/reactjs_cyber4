import React from 'react';
import { Button, Layout } from 'antd';
import { Route } from 'react-router';

const { Sider, Content } = Layout


export const UserLoginTemplate = (props) => {
    let { Component, ...restParam } = props
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={window.innerWidth / 2} style={{ height: window.innerHeight, backgroundImage: 'url(https://picsum.photos/2000)', backgroundSize: '100%' }}>

                </Sider>
                <Content>
                    <Component {...propsRoute} />
                </Content>
            </Layout>

        </>
    }} />
}