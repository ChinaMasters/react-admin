import React  from 'react';
import { Modal, Form, Input, Tree } from 'antd';
import PropTypes from 'prop-types'
import menuList from "../../config/menu"

const { TreeNode } = Tree;

class AuthForm extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      checkedKeys: this.props.formData.roles || []
    }; 
  }

  static defaultProps = {
    visible: false
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
        this.props.handleOk(this.state.checkedKeys)
      }
    });
    
  };

  childMethod(){
    alert("组件之间通信成功");
  }

  handleCancel = () => {
    this.props.handleCancel()
  };

  onCheck = (checkedKeys, info) => {
    this.setState({checkedKeys})
  };

  formatNodes = (nodes) => {
    let nodesList = nodes.map(item => 
      (
        <TreeNode title={item.text} key={item.path}> 
        {
          (item.children && item.children.length > 0)  ?  this.formatNodes(item.children) : null
        }
        </TreeNode>
      )
    )
    return nodesList
  }
   /*
  当组件接收到新的属性时自动调用
   */
  // static getDerivedStateFromProps (props, state) {
  //   if (props.formData.roles !== state.checkedKeys) {
  //     console.log('jin lai')
  //     return {
  //       checkedKeys: props.formData.roles || []
  //     }
  //   }
  //   return null
  // }

  UNSAFE_componentWillReceiveProps(props){
    if (props.formData.roles !== this.state.checkedKeys) {
      this.setState({checkedKeys: props.formData.roles || []})
    }
  }



  componentDidMount(){
    this.props.onRef(this)
  }
  
  render() {
    const { visible, formData }  = this.props
    const { checkedKeys } = this.state
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }
    return (
      <div>
        <Modal
          title="New Auth"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
            <Form onSubmit={this.handleSubmit} >
              <Form.Item label='角色名称' {...formItemLayout}>
                <Input value={formData.roleName} disabled/>
              </Form.Item>
              <Tree
                checkable
                defaultExpandAll
                checkedKeys={checkedKeys}
                onCheck={this.onCheck} >
                <TreeNode title="平台权限" key="all">
                  {this.formatNodes(menuList)}
                </TreeNode>
              </Tree>
            </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AuthForm)