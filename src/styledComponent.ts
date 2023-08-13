import { styled } from "styled-components";
interface SpacingProps {
  width?: string;
  height?: string;
}
export const Spacing = styled.div<SpacingProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

interface WrapProps {
  dir: "clumn" | "row";
}

export const Wrap = styled.div<WrapProps>`
  display: flex;
  flex-flow: ${(props) => props.dir};
`;
