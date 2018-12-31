import styled from "styled-components";

export const Arrows = {};

Arrows.top = styled.div`
  position: absolute;
  overflow: hidden;
  height: 1.3rem;
  width: 2.5rem;
  top: -1.3rem;
  &:after {
    content: "";
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    bottom: 0;
    box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.5);
    transform: rotate(45deg) scale(0.5);
  }
`;

Arrows.bottom = styled.div`
  position: absolute;
  overflow: hidden;
  height: 1.3rem;
  width: 2.5rem;
  top: -1.3rem;
  &:after {
    content: "";
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 0;
    box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.5);
    transform: rotate(45deg) scale(0.5);
  }
`;

Arrows["bottom-start"] = styled.div`
  position: absolute;
  overflow: hidden;
  height: 1.3rem;
  width: 2.5rem;
  top: -1.3rem;
  &:after {
    content: "";
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 0;
    box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.5);
    transform: rotate(45deg) scale(0.5);
  }
`;

Arrows["bottom-end"] = styled.div`
  position: absolute;
  overflow: hidden;
  height: 1.3rem;
  width: 2.5rem;
  top: -1.3rem;
  &:after {
    content: "";
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 0;
    box-shadow: 0.1rem 0.1rem 1rem 0.1rem rgba(0, 0, 0, 0.5);
    transform: rotate(45deg) scale(0.5);
  }
`;

Arrows.left = styled.div`
  position: absolute;
  overflow: hidden;
  width: 1rem;
  height: 2rem;
  right: -1rem;
  &:after {
    content: "";
    position: absolute;
    width: 2rem;
    height: 2rem;
    right: 0;
    box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.5);
    transform: rotate(45deg) scale(0.5);
  }
`;

Arrows.right = styled.div`
  position: absolute;
  overflow: hidden;
  width: 1rem;
  height: 2rem;
  left: -1rem;
  &:after {
    content: "";
    position: absolute;
    width: 2rem;
    height: 2rem;
    left: 0;
    box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.5);
    transform: rotate(45deg) scale(0.5);
  }
`;

export const Popup = styled.div`
  position: absolute;
  min-width: 6rem;
  min-height: 3rem;
  color: #444;
  margin: ${props => {
    if (props.margin) return props.margin;
    if (props.noCarrot && props.position.includes("bottom"))
      return "0.5rem 0 0 0";
    if (props.position.includes("bottom")) return "1.7rem 0 0";
    if (props.position.includes("top")) return "0 0 1.7rem";
    return "0";
  }};
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.5);
  ${props => props.popperStyle};
  padding: ${props => {
    if (props.noPadding) return "0";
    return "4px 16px 16px";
  }};
  width: ${props => {
    if (props.width) return props.width;
    return "190px";
  }};
  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 0;
    li {
      padding: 0 0 11px 0;
      text-align: left;
      position: relative;
      &:last-of-type {
        padding-bottom: 0;
      }
    }
  }
`;
