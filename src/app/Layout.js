import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavKey: ''
    };
  }

  handleNavMenuClick(e) {
    this.setState({
      currentNavKey: e.key
    });
  }

  renderNav() {
    return (
      <nav className="layout-nav">
        <Menu onClick={this.handleNavMenuClick.bind(this)}
              selectedKeys={[this.state.currentNavKey]}
              mode="inline" theme="dark">
          <SubMenu title="首页">
            <Menu.Item key="index1">
              <Link to="/index1">index-1</Link>
            </Menu.Item>
            <Menu.Item key="index2">
              <Link to="/index2">index-2</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="about">
            <Link to="/关于">Lessons</Link>
          </Menu.Item>

          <Menu.Item key="login">
            <Link to="/login">登录</Link>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }

  render() {
    return (
      <div>
        {this.renderNav()}
        <div className="layout-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
