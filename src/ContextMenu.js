import React from "react";
import ReactDOM from "react-dom";
import { Manager, Reference, Popper } from "react-popper";
import PropTypes from "prop-types";

// components
import { Popup } from "./popup-arrow-styles";

class ContextMenu extends React.Component {
  state = {
    isShowing: false,
    selectedIds: []
  };

  renderSubmenu = (options, depthLevel = 0) => {
    const menuOptions = options.map(option => {
      let subMenu;
      if (option.options && this.state.selectedIds[depthLevel] === option.id) {
        subMenu = this.renderSubmenu(option.options, depthLevel + 1);
      }

      return (
        <Manager>
          <Reference>
            {({ ref }) => (
              <li
                ref={ref}
                key={option.id}
                onMouseEnter={this.handleSelectedId(option.id, depthLevel)}
              >
                <span onClick={e => this.handleOptionClick(e, option.func)}>
                  {option.text}
                </span>
                <Popper placement="right">
                  {({ ref, style, placement, arrowProps }) => (
                    <div ref={ref} style={style} data-placement={placement}>
                      {subMenu}
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                    </div>
                  )}
                </Popper>
              </li>
            )}
          </Reference>
        </Manager>
      );
    });

    return <ul>{menuOptions}</ul>;
  };

  handleOptionClick = (e, func) => {
    func();
    this.toggleContextMenu(e);
  };

  toggleContextMenu = (e, toShow = null) => {
    e.preventDefault();
    if (toShow !== null) this.setState({ isShowing: toShow });
    else {
      this.setState({
        isShowing: !this.state.isShowing,
        selectedIds: []
      });
    }
  };

  handleSelectedId = (selected, depthLevel) => {
    return () => {
      const updatedArray = this.state.selectedIds;
      updatedArray[depthLevel] = selected;
      this.setState({
        selectedIds: updatedArray
      });
    };
  };

  onDocumentClick = e => {
    const container = document.querySelector("#context-menu-root");
    let removeListener = false;
    if (e.target !== container && !container.contains(e.target)) {
      this.toggleContextMenu(e, false);
      removeListener = true;
    } else if (e.target === container && container.contains(e.target)) {
      this.toggleContextMenu(e);
      removeListener = true;
    }
    if (removeListener) {
      document.removeEventListener("click", this.onDocumentClick);
      document.removeEventListener("contextmenu", this.onDocumentClick);
    }
  };

  render() {
    const {
      options,
      onRightClick,
      noPadding,
      width,
      margin,
      position,
      children,
      noCarrot,
      customStyle
    } = this.props;
    const { isShowing } = this.state;
    return (
      <div>
        <Manager>
          <Reference>
            {({ ref }) => (
              <div
                ref={ref}
                onClick={!onRightClick ? this.toggleContextMenu : null}
                onContextMenu={onRightClick ? this.toggleContextMenu : null}
              >
                {children}
              </div>
            )}
          </Reference>
          {isShowing
            ? ReactDOM.createPortal(
                <Popper placement={position}>
                  {({ ref, style, placement, arrowProps }) => {
                    const {
                      ref: arrowInnerRef,
                      ...transferArrowProps
                    } = arrowProps;
                    document.addEventListener("click", this.onDocumentClick);
                    document.addEventListener(
                      "contextmenu",
                      this.onDocumentClick
                    );
                    return (
                      <div ref={ref} style={style} data-placement={placement}>
                        {this.renderSubmenu(options)}
                        <div ref={arrowProps.ref} style={arrowProps.style} />
                      </div>
                    );
                  }}
                </Popper>,
                document.querySelector("#context-menu-root")
              )
            : null}
        </Manager>
      </div>
    );
  }
}

ContextMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  position: PropTypes.string.isRequired,
  noPadding: PropTypes.bool,
  width: PropTypes.string,
  margin: PropTypes.string,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  noCarrot: PropTypes.bool
};

ContextMenu.defaultProps = {
  noPadding: false,
  width: "",
  margin: "",
  toggleContextMenu: () => null,
  noCarrot: false,
  customStyle: false
};

export default ContextMenu;
