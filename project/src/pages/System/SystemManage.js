import React, { Component } from 'react';
import { Table, Input, message, Modal, Button, Icon } from 'antd';
import { connect } from 'dva';
import UserManageModal from './UserManageModal';
import styles from './SystemManage.less';

@connect(({userManage})=>({
    users: userManage.users,
}))
class SystemManage extends React.Component {
    state={
        columns: [{
            title:'账号',
            key:'username',
            dataIndex:'username',
            width:200,
        },{
            title:'密码',
            key:'password',
            dataIndex:"password",
            width:200,
        },{
            title:'权限',
            key:'authority',
            dataIndex:"authority",
            width:100,
        },
        {
            title:"操作",
            key:'action',
            width:400,
            render:(text, record)=>(
                    <span className={styles.spanStyle}>
                        <UserManageModal text="编辑" record={record} type="edit" />
                        {
                        record.locked?(<Button onClick={()=>{ this.handlerLocked(record) }}> <Icon type="lock" />解除锁定</Button>):(<Button onClick={()=>{this.handlerLocked(record)}}> <Icon type="unlock" />锁定</Button>)
                        }
                        <Button onClick={()=>this.deleteUser(record.username)}>删除</Button>
                    </span>
                )
        }],
    };
    //获取所有用户
    componentDidMount() {
        console.log('mount');
        const { dispatch } = this.props;
        // 获取用户数据
        dispatch({ type: 'userManage/getAllUsers' });
      }
    //删除当前用户
    deleteUser=(username)=>{
        const { dispatch } = this.props;
        Modal.confirm({
            title: '确定要删除当前用户吗',
            content: '点击确定当前用户将会被注销',
            onOk(){
                dispatch({
                    type: 'userManage/deleteUser',
                    payload: username,
                });
            },
            onCancel(){

            },
        });
    }

    //当用户未锁定的时候，执行锁定;锁定的时候解除锁定
    handlerLocked=(record)=>{
        const { dispatch } = this.props;
        if(record.locked){
            Modal.confirm({
                title: '确定要解除当前用户的锁定吗',
                content: '点击确定当前用户将会被解除锁定',
                onOk(){
                    dispatch({
                        type: 'userManage/modifyLock',
                        payload: record,
                    });
                },
                onCancel(){
    
                },
            });
        }
        else{
            Modal.confirm({
                title: '确定要锁定当前用户吗',
                content: '点击确定当前用户将会被锁定',
                onOk(){
                    dispatch({
                        type: 'userManage/modifyLock',
                        payload: record,
                    });
                },
                onCancel(){
    
                },
            });
        }
    }

    render() {
        const { users, loading } = this.props;
        const columns = this.state.columns;
        return (
            <div>
                <UserManageModal text="新建用户" type="new" record={{}} /><br/><br/>
                <Table
                    bordered
                    columns={columns}
                    dataSource={users}
                    rowKey={record => record.username}
                />
            </div>
        );
    }
}

export default SystemManage;