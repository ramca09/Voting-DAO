import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { CardTheme } from "./types";

export interface CardHeaderProps extends SpaceProps {
  variant?: keyof CardTheme["cardHeaderBackground"];
}

const CardHeader = styled.div<CardHeaderProps>`
  background: linear-gradient(270deg, #A6185E 0%, #070097 100%);
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
  ${space}
`;

CardHeader.defaultProps = {
  p: "24px",
};

export default CardHeader;
