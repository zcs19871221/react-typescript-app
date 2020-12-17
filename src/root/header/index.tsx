import React, { PureComponent } from "react";
import style from "./index.module.less";

class Header extends PureComponent<{ userName: string,appName:string }> {
  handleClickLogOut = async () => {};

  render() {
    const { userName,appName } = this.props;
    return (
      <div className={style.header}>
        <div className={style.leftWrap}>
          <div className={style.logo}>{appName}</div>
        </div>
        <div className={style.rightWrap}>
          <div>{userName}</div>
          <div className={style.logOut} onClick={this.handleClickLogOut}>
            退出
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
