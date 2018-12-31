import React from "react";
import ReactDOM from "react-dom";
import { Manager, Reference, Popper } from "react-popper";
import PropTypes from "prop-types";

// components
import { Popup } from "./popup-arrow-styles";

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

  onDocumentClick = e => {
    const container = document.querySelector("#context-menu-root");
    let removeListener = false;
    if (e.target !== container && !container.contains(e.target)) {
      this.toggleContextMenu(e);
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
                      <Popup
                        ref={ref}
                        style={customStyle || style}
                        data-placement={placement}
                        noPadding={noPadding}
                        width={width}
                        margin={margin}
                        position={position}
                        noCarrot={noCarrot}
                      >
                        {this.renderSubmenu(options)}
                      </Popup>
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
