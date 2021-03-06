import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
    text: string;
    link?: boolean;
    to?: string;
}

export const NavbarTitle = ({ text, link, to }: Props) => {
    return (
        <Typography
            variant="h6"
            color="inherit"
            component={link ? Link : "h2"}
            to={to}
            style={{ textDecoration: "none" }}
        >
            {text}
        </Typography>
    );
};
