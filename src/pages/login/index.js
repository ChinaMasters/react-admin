import React, {Component}  from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../../assets/css/login.less'
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.replace('/')
      }
    });
  };
  
  render (){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
        <h3 className="login-form-title">系统登录</h3>
        <Form.Item>
        {
          getFieldDecorator('username', {
            rules: [
              { required: true, message: 'Please input your username!' },
              { min: 4, message: 'Username min length is four!' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username is composed of letter, number, underline!' }
            ],
            validateTrigger: 'onBlur',
            first: true
          })
          (
            <Input size="large" 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"/>
          )
        }
        </Form.Item>
        <Form.Item>
        {
          getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { min: 6, message: 'Username min length is  six!' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: 'Password is composed of letter, number, underline!' }
            ],
            validateTrigger: 'onBlur',
            first: true
          })
          (
            <Input size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )
        }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)
          }
          <a className="login-form-forgot" href="www.chinamasters.top"> Forgot password</a>
          <Button size="large" type="primary" htmlType="submit" className="login-form-button"> Log in</Button>
          <a href="www.chinamasters.top">register now!</a>
        </Form.Item>
      </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm