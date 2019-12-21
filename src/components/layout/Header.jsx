import React, { Component } from 'react';
import { formatDate, getParentNodes } from "../../utils/common.js"
import { Menu, Dropdown, Breadcrumb } from 'antd';
import { withRouter } from "react-router-dom"
import menuList from "../../config/menu"
import LinkButton from "../../components/LinkButton/index.jsx"
import "../../assets/css/layout/header.less"
class HeaderBar extends Component {
  state = {
    dateNow: ''
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        dateNow: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      })
    }, 1000)
  }
  Unmounting() {
    clearInterval(this.timer)
  }
  loginOut = () => {
    const pathname = this.props.location.pathname
    // console.log('loginOut', menuList, pathname) // 搜索输入框黄色背景 自动填充
    const nodes = getParentNodes(menuList, pathname, 'path')
    console.log('getParentNodes', nodes)
  }

  render() {
    const { dateNow } = this.state
    const pathname = this.props.location.pathname
    const nodes = getParentNodes(menuList, pathname, 'path')
    const menu = (
      <Menu>
        <Menu.Item>
          <LinkButton target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            个人中心
          </LinkButton>
        </Menu.Item>
        <Menu.Item>
          <LinkButton target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            项目地址
          </LinkButton>
        </Menu.Item>
        <Menu.Item>
          <LinkButton onClick={this.loginOut} >
            退出登录
          </LinkButton>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <div className="header-left">
          <Breadcrumb>
            {
              nodes.map((item, index) => {
                if(index === nodes.length - 1){
                  return (<Breadcrumb.Item key={index}><LinkButton>{item.text}</LinkButton></Breadcrumb.Item>)
                }else{
                  return (<Breadcrumb.Item key={index}>{item.text}</Breadcrumb.Item>) 
                }
              })
            }
          </Breadcrumb>
        </div>
        <div className="header-right">
          <h3 className="header-timer">{dateNow}</h3>
          <Dropdown placement="bottomRight" overlay={menu}>
            <LinkButton href="#">
              <div className="header-dropdown">
                <img className="header-avatar" src={require('../../assets/images/header.jpg')} alt="head" />
                <div className="header-arrow"></div>
              </div>
            </LinkButton>
          </Dropdown>
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderBar)
