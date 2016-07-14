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
    this.handleNavMenuClick = this.handleNavMenuClick.bind(this);
  }

  handleNavMenuClick(e) {
    this.setState({
      currentNavKey: e.key
    });
  }

  renderNav() {
    return (
      <nav className="layout-nav">
        <Menu
          onClick={this.handleNavMenuClick}
          selectedKeys={[this.state.currentNavKey]}
          mode="horizontal" theme="dark"
        >
          <Menu.Item key="index">
            <Link to="/">首页</Link>
          </Menu.Item>
          <SubMenu key="about" title="关于">
            <Menu.Item key="index1">
              <Link to="/index1">index-1</Link>
            </Menu.Item>
            <Menu.Item key="index2">
              <Link to="/index2">index-2</Link>
            </Menu.Item>
          </SubMenu>

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

Layout.propTypes = {
  children: React.PropTypes.object
};
export default Layout;
