import React, {Component}  from 'react';
import { Select, Button } from 'antd';
import store from '../../redux/store'
// import {increment, decrement} from '../../redux/actions'
const { Option } = Select;

export default class  Redux extends Component {
  state = {
    count: 0,
    number: 1,
    loading: false,
  }
  handleIncrement = () => {
    this.setState(state => ({count: state.count + state.number}))
    // store.dispatch(increment(this.state.number))
  }
  handleDecrement = () => {
    this.setState(state => ({count: state.count - state.number}))
    // store.dispatch(decrement(this.state.number))
  }
  handleOdd = () => {
    this.setState(state => {
      return state.count % 2 === 1 ? {count: state.count + state.number} : ''
    })
    // store.dispatch({type: 'ODD', data: this.state.number})
  }
  handleAsync = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState(state => ({
        count: Number(state.number + state.count),
        loading: false
      }))
    }, 600)
    // store.dispatch({type: 'ASYNC', data: this.state.number})
  }
  handleChange = (number) => {
    this.setState({number})
  }
  componentDidMount(){
    // store.subscribe(() => {
    //   // 监听store数据变化，重新渲染页面
    //   this.setState({})
    // })
  }
  render(){
    const {number, loading} = this.state
    return (
      <div style={{margin: 20}}>
        <h3>Click {store.getState()} Times</h3>
        <div style={{margin: '20px 0'}}>
          <Select value={number} onChange={this.handleChange} style={{ width: 120 }}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
          </Select>
          <Button type="primary" onClick={this.handleIncrement} style={{margin:'0 10px'}}>increment</Button>
          <Button type="danger" onClick={this.handleDecrement} style={{margin:'0 10px'}}>decrement</Button>
          <Button type="primary" onClick={this.handleOdd} style={{margin:'0 10px'}}>odd</Button>
          <Button type="danger" loading={loading} onClick={this.handleAsync} style={{margin:'0 10px'}}>async</Button>
        </div>
      </div>
    )
  }
}