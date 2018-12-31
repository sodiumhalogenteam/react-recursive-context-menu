import React from "react";

class ContextMenu extends React.Component {
  state = {
    isShowing: false
  };

  renderSubmenu = options => {
    const menuOptions = options.map(option => {
      let subMenu;
      if (option.options && option.options.length > 0) {
        subMenu = this.renderSubmenu(option.options);
      }

      return (
        <li key={option.id}>
          <span onClick={e => this.handleOptionClick(e, option.func)}>
            {option.text}
          </span>
          {subMenu}
        </li>
      );
    });

    return <ul>{menuOptions}</ul>;
  };

  handleOptionClick = (e, func) => {
    func();
    this.toggleContextMenu(e);
  };

  toggleContextMenu = e => {
    e.preventDefault();
    this.setState({
      isShowing: !this.state.isShowing
    });
  };

  render() {
    const { options, children, onRightClick } = this.props;
    const { isShowing } = this.state;
    return (
      <div>
        {onRightClick ? (
          <div onContextMenu={this.toggleContextMenu}>{children}</div>
        ) : (
          <div onClick={this.toggleContextMenu}>{children}</div>
        )}
        {isShowing ? <div>{this.renderSubmenu(options)}</div> : null}
      </div>
    );
  }
}

export default ContextMenu;
