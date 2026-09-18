"use client";

import type { CardHeaderProps } from "@mui/material";
import { CardHeader as MuiCardHeader } from "@mui/material";
import type { ReactNode } from "react";

/**
 * CardHeader component that serves as a container for the header content of the card.
 * @param props - The props for the CardHeader component.
 * @returns A ReactNode representing the CardHeader component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardHeader component.
 */
export function CardHeader(props: CardHeaderProps): ReactNode {
    return (<MuiCardHeader {...props} />);
}
