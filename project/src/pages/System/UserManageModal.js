import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Button, Form, Input, Icon } from 'antd';

const FormItem = Form.Item;
@connect(({})=>({
    
}))
@Form.create()
class UserManageModal extends Component {

  state = { visible: false }

  //处理表单
  handleSubmit = (e) => {
    
  }

  //显示对话框
  showModal = () => {
    const { form, record, type } = this.props;
    this.setState({
      visible: true,
    });
    //显示对话框的时候，同时执行填充表单的过程
    if(type==="edit"){
        form.setFieldsValue({
            username:record.username,
            password:record.password,
            authority:record.authority,
        });
    }
    else{
        form.setFieldsValue({
            username:"",
            password:"",
            authority:"",
        });
    }
  }
  
  //隐藏对话框
  hideModal = () => {
    //关闭对话框
    this.setState({
      visible: false,
    });
  }
  //编辑的保存
  handleEdit = () => {
    const { dispatch, type } = this.props;
    this.props.form.validateFields((err, values) => {
        if (!err) {
            dispatch({
                type: 'userManage/editUser',
                payload: values,
            });
        }
    });
    //关闭对话框
    this.setState({
        visible: false,
      });
  }
  //新建的保存
  handleNew = () => {
    const { dispatch, type } = this.props;
    this.props.form.validateFields((err, values) => {
        if (!err) {
            dispatch({
                type: 'userManage/newUser',
                payload: {...values, locked: false},
            });
        }
    });
    //关闭对话框
    this.setState({
        visible: false,
      });
  }

  render() {
    const { text, record, type, form } = this.props;
    const { getFieldDecorator } = this.props.form;
    let modalConfig;
    if(type==="edit"){
        modalConfig = {
            title: '修改用户',
            onOk: this.handleEdit,
        };
    }
    else if(type === "new"){
        modalConfig = {
            title: '新建用户',
            onOk: this.handleNew,
        };
    }
    return (
      <span>
        {
          type==="edit"?(<Button type="primary" onClick={()=>{this.showModal()}}><Icon type="edit" />{text}</Button>):(<Button type="primary" onClick={()=>{this.showModal()}}><Icon type="plus" />{text}</Button>)
        }
        <Modal
          title={modalConfig.title}
          visible={this.state.visible}
          onOk={modalConfig.onOk}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                label="用户名"
                >
                {getFieldDecorator('username', {
                    rules: [{
                    required: true,
                    }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                label="密码"
                >
                {getFieldDecorator('password', {
                    rules: [{
                    required: true,
                    }],
                })(
                    <Input type="text" />
                )}
                </FormItem>
                <FormItem
                label="权限"
                >
                {getFieldDecorator('authority', {
                    rules: [{
                    required: true,
                    }],
                })(
                    <Input type="text" />
                )}
                </FormItem>
            </Form>
        </Modal>
      </span>
    );
  }
}

export default UserManageModal;