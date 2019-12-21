import React, {Component}  from 'react';
import { Card, Button, Table, Divider, Tag } from 'antd';

export default class BaseTable extends Component {
  state = {
    columns: [],
    tableData: []
  }

  componentDidMount(){
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
        render: (text, record) => (
          <span>
            <span>Invite {record.name}</span>
            <Divider type="vertical" />
            <span>Delete</span>
          </span>
        ),
      },
    ];
    
    const tableData = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];

    setTimeout(()=>{
      this.setState({
        columns,
        tableData
      })
    }, 1000)

  }
 
  render(){
    return (
      <div>
        <Card size="small" title="Small size card" extra={<Button type="primary" icon="plus">添加</Button>}>
          <Table columns={this.state.columns} dataSource={this.state.tableData} />
        </Card>
      </div>
    )
  }
}