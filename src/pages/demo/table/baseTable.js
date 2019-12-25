import React, {Component}  from 'react';
import { Card, Button, Table, Divider, Tag } from 'antd';
import LinkButton from "../../../components/LinkButton/index.jsx"

export default class BaseTable extends Component {
  state = {
    loading: false,
    columns: [],
    tableData: []
  }

  intiTable = ()=> {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        width: 300,
        render: (text, record) => (
          <span>
            <LinkButton>Invite {record.name}</LinkButton>
            <Divider type="vertical" />
            <LinkButton>Delete</LinkButton>
          </span>
        ),
      },
    ];
    const tableData = Array.from(new Array(6)).map((item,i)=>{
      const n = parseInt(Math.random()*100)
      return {
        key: String(i),
        name: `John Brown ${i} `,
        age: n ,
        address: `New York No. ${n-5} Lake Park`,
        tags: n > 30 ?  ['nice', 'developer'] : ['loser'],
      }
    })
    console.log('tableData', tableData)
    this.setState({
      loading: true
    })
    setTimeout(()=>{
      this.setState({
        columns,
        tableData,
        loading: false
      })
    }, 1000)
  }

  componentDidMount(){
    // 初始化表格数据
    this.intiTable()

  }
  onChange = () => {
    console.log('pagination')
    this.intiTable()
  }

  render(){
    return (
      <div>
        <Card size="small" title="Base Table" extra={<Button type="primary" icon="plus">添加</Button>}>
          <Table 
            bordered 
            loading= {this.state.loading}
            pagination={{defaultCurrent:1 ,defaultPageSize: 6, total: 200, onChange: this.onChange}}
            columns={this.state.columns} 
            dataSource={this.state.tableData} />
        </Card>
      </div>
    )
  }
}