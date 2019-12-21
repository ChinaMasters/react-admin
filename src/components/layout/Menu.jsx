import React, {Component}  from 'react';
import { Menu, Icon, } from 'antd';
import { Link, withRouter } from "react-router-dom"
import "../../assets/css/layout/menu.less"
import menuList from "../../config/menu"

const { SubMenu } = Menu;


class MenuBar extends Component {
  constructor(props) {
    super(props)
    this.openKeys = ''
    this.pathname = this.props.location.pathname
    this.menuNodes = this.getMenuNode(menuList)
  }
  getMenuNode = (menuList) => {
    return menuList.map(item => {
      if(item.children && item.children.length > 0){
        const findItem = item.children.find(e => e.path === this.pathname)
        if(findItem) this.openKeys = item.path
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.text}</span>
              </span>
            }>
            {this.getMenuNode(item.children)}
          </SubMenu>
        )
      }else{
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.text}</span>
            </Link>
          </Menu.Item>
        )
      }
     
    })
  }

  render() {  
    this.pathname = this.props.location.pathname
    return (
      <Menu theme="dark" selectedKeys={[this.pathname]} defaultOpenKeys={[this.openKeys]} mode="inline">
        {this.menuNodes}
      </Menu>
    );
  }
}

export default withRouter(MenuBar)
