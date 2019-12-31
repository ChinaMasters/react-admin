import React  from 'react';
import { Layout} from 'antd';
import { Route, Switch, Redirect} from "react-router-dom"
import MenuBar from "../../components/layout/Menu.jsx"
import HeaderBar from "../../components/layout/Header.jsx"
import imgURL from "../../assets/images/logo.jpg"
import  "../../assets/css/layout/logo.less"
import Menus from "../user/menu"
import Permit from "../user/permit"
import Home from "../home/index"
import Demo from "../demo/index"
import Role from "../role/index"
import Redux from "../redux/index"
import User from "../user/index"
import BaseTable from "../demo/table/baseTable"

const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends React.Component {

  state = {
    collapsed: JSON.parse(localStorage.getItem('collapsed')) || false,
  }

  onCollapse = collapsed => {
    localStorage.setItem('collapsed', collapsed)
    this.setState({ collapsed: JSON.parse(localStorage.getItem('collapsed'))});
    console.log(this.state.collapsed);
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
         <div className="logo">
          <img src={imgURL} alt="logo"/>  
          <h3 style={{display: this.state.collapsed ? 'none' : 'block'}}>React Admin</h3>
         </div>
          <MenuBar/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 , height: 'auto'}}>
            <HeaderBar/>
          </Header>
          <Content style={{ margin: '15px' }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/permit" component={Permit}></Route>
              <Route path="/menu" component={Menus}></Route>
              <Route path="/demo" component={Demo}></Route>
              <Route path="/basetable" component={BaseTable}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/redux" component={Redux}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' , background: '#ccc'}}>React Admin ©2020 Created by Chinamasters</Footer>
        </Layout>
      </Layout>
    );
  }
}
