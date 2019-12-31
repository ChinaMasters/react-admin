import React, {Component}  from 'react';
import { Table, Card, Button } from 'antd';
import AddForm from './AddForm'
import AuthForm from './AuthForm'
import {formatDate} from '../../utils/common'
import LinkButton from "../../components/LinkButton/index.jsx"
export default class Role extends Component {
  state = {
    columns: [],
    data: [],
    isShowAdd: false,
    isShowAuth: false,
    currentRow: {},
    initData:  [
      {
        id: '1',
        roleName: 'John Brown',
        createTime: '2020-03-26',
        authTime: '2020-03-26',
        authName: 'John Brown Auth',
        roles: ["/role", "/menu", "/user", "/permit", "/home"]
      },
      {
        id: '2',
        roleName: 'Jim Green',
        createTime: '2020-03-26',
        authTime: '2020-03-26',
        authName: 'Jim Green Auth',
        roles: ["/role", "/menu", "/user", "/permit"]
      },
      {
        id: '3',
        roleName: 'Joe Black',
        createTime: '2020-03-26',
        authTime: '2020-03-26',
        authName: 'Joe Black Auth',
        roles: ["/role", "/menu", "/user"]
      },
      {
        id: '4',
        roleName: 'Disabled User',
        createTime: '2020-03-26',
        authTime: '2020-03-26',
        authName: 'Disabled User Auth',
        roles: ["/role"]
      }
    ],
  }

  innitTableData(){
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        render: text => {
          return (<span>{text}</span>) 
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime'
      },
      {
        title: '授权时间',
        dataIndex: 'authTime'
      },
      {
        title: '授权人',
        dataIndex: 'authName'
      },
      {
        title: '操作',
        align: 'center',
        render: role => {
          return (<div><LinkButton>修改</LinkButton>&nbsp; &nbsp;<LinkButton>删除</LinkButton></div>)
        }
      }
    ];
    const data = JSON.parse(localStorage.getItem("RolesData"))
    this.setState({
      data,
      columns
    })
  }

  handleAddCancel= () => {
    this.setState({
      isShowAdd: false
    })
  }

  handleAddOk = (values) => {
    let {data} = this.state
    data.push({
      roleName: values.roleName,
      createTime: formatDate( new Date(), 'yyyy-MM-dd'),
      authTime: '2020-05-26',
      authName: 'ChinaMaters Auth',
      id: data.length + 1,
      roles: ['/user', '/permit', '/menu']
    })
    localStorage.setItem("RolesData", JSON.stringify(data));
    this.handleAddCancel()
  }

  handleAuthCancel = () => {
    this.setState({
      isShowAuth: false
    })
  }

  handleAuthOk = (checkedKeys) => {
    this.handleAuthCancel()
    console.log('getcheckedKeys:', checkedKeys)
  }

  clearStorage = () => {
    // this.child.childMethod()
    console.log(this.child.childMethod)
    // const {initData} = this.state
    // localStorage.setItem("RolesData", JSON.stringify(initData));
    // this.setState({data: initData})
  }
  onRef = (ref) => {
    this.child = ref
  }

  componentDidMount(){
    this.innitTableData()
    
    // const arr = [
    //  {name: 'lily', age: 18},
    //  {name: 'jack', age: 20}
    // ]
    // const obj = arr.reduce((pre, item) => {
    //   pre[item.name] = item.age
    //   return pre
    // }, {})
    // console.log('obj', obj)
  }

  render(){
    const {columns, data, currentRow, isShowAdd, isShowAuth} = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: [currentRow.id],
      onSelect: (row) => {
        this.setState({
          currentRow: row
        })
      }
    };
    const onRow =  record => {
      return {
        onClick: event => {
          // this.setState({
          //   currentRow: record
          // })
        }, // 点击行
        onDoubleClick: event => {},
        onContextMenu: event => {},
        onMouseEnter: event => {}, // 鼠标移入行
        onMouseLeave: event => {},
      }
    };
    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})} style={{marginRight: 10}}>创建角色</Button> 
        <Button type='primary' disabled={!currentRow.id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
      </span>
    )
    return (
      <div>
        <Card size="small" title={title} extra={<Button type="primary" icon="delete" onClick={this.clearStorage}>清除缓存</Button>}>
          <Table rowSelection={rowSelection} onRow={onRow} columns={columns} dataSource={data} rowKey='id' bordered />
        </Card>
        {/* 新增提示框 */}
        <AddForm 
          visible={isShowAdd}  
          formData={currentRow} 
          handleCancel={this.handleAddCancel} 
          handleOk={this.handleAddOk}
        />
        {/* 分配角色提示框 */}
        <AuthForm 
          onRef={this.onRef}
          visible={isShowAuth}  
          formData={currentRow} 
          handleCancel={this.handleAuthCancel} 
          handleOk={this.handleAuthOk}
        />
      </div>
    )
  }
}