import React  from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types'
// Son.propTypes = {
//   optionalArray: PropTypes.array,//检测数组类型
//   optionalBool: PropTypes.bool,//检测布尔类型
//   optionalFunc: PropTypes.func,//检测函数（Function类型）
//   optionalNumber: PropTypes.number,//检测数字
//   optionalObject: PropTypes.object,//检测对象
//   optionalString: PropTypes.string,//检测字符串
//   optionalSymbol: PropTypes.symbol,//ES6新增的symbol类型
// }
class AddForm extends React.Component {
  state = {
    confirmLoading: false,
  };

  static defaultProps = {
    visible: true
  };

  static propTypes = {
    formData: PropTypes.object,
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func
  }

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleOk(values)
      }
    });
    
  };

  handleCancel = () => {
    this.props.handleCancel()
  };

  render() {
    const { confirmLoading } = this.state;
    const { visible }  = this.props
    const { getFieldDecorator } = this.props.form;
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4, },  // 左侧label的宽度
      wrapperCol: { span: 18, offset: 1 }, // 右侧包裹的宽度
    }
    return (
      <div>
        <Modal
          title="New Role"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}>
            <Form onSubmit={this.handleSubmit} >
              <Form.Item label="roleName" {...formItemLayout}>
                {getFieldDecorator('roleName', {
                  rules: [{ required: true, message: 'Please input role name!' }],
                })(
                  <Input placeholder="Please input role name"/>
                )}
              </Form.Item>
            </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddForm)