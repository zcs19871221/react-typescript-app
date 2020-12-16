import React, { PureComponent } from "react";
import style from "./index.module.scss";

class Header extends PureComponent<{ userName: string }> {
  handleClickLogOut = async () => {};

  render() {
    const { userName } = this.props;
    return (
      <div className={style.header}>
        <div className={style.leftWrap}>
          <div className={style.logo}>内容监控平台</div>
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
