"use client";

declare module "@mui/material/styles" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface TypeBackground {
        dark: string;
        light: string;
    }
}

import type { Breakpoint, Palette, SxProps, Theme } from "@node_mui/material";
import Accordion from "@node_mui/material/Accordion";
import AccordionDetails from "@node_mui/material/AccordionDetails";
import AccordionSummary from "@node_mui/material/AccordionSummary";
import Alert from "@node_mui/material/Alert";
import AppBar from "@node_mui/material/AppBar";
import Avatar from "@node_mui/material/Avatar";
import Box from "@node_mui/material/Box";
import Button, { ButtonOwnProps } from "@node_mui/material/Button";
import { ButtonBaseOwnProps } from "@node_mui/material/ButtonBase";
import Card from "@node_mui/material/Card";
import CardActions from "@node_mui/material/CardActions";
import CardContent from "@node_mui/material/CardContent";
import CardMedia from "@node_mui/material/CardMedia";
import CircularProgress from "@node_mui/material/CircularProgress";
import Container from "@node_mui/material/Container";
import CssBaseline from "@node_mui/material/CssBaseline";
import Divider from "@node_mui/material/Divider";
import Fab from "@node_mui/material/Fab";
import FormControl from "@node_mui/material/FormControl";
import FormHelperText from "@node_mui/material/FormHelperText";
import FormLabel from "@node_mui/material/FormLabel";
import Grid from "@node_mui/material/Grid";
import IconButton from "@node_mui/material/IconButton";
import MenuItem from "@node_mui/material/MenuItem";
import Paper from "@node_mui/material/Paper";
import Stack from "@node_mui/material/Stack";
import StyledEngineProvider from "@node_mui/material/StyledEngineProvider";
import TextField from "@node_mui/material/TextField";
import ThemeProvider from "@node_mui/material/styles/ThemeProvider";
import Toolbar from "@node_mui/material/Toolbar";
import Typography from "@node_mui/material/Typography";
import type { Variant } from "@node_mui/material/styles/createTypography";
import Zoom from "@node_mui/material/Zoom";
import createTheme from "@node_mui/material/styles/createTheme";
import responsiveFontSizes from "@node_mui/material/styles/responsiveFontSizes";
import useMediaQuery from "@node_mui/material/useMediaQuery";
import useScrollTrigger from "@node_mui/material/useScrollTrigger";

export {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AppBar,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    CssBaseline,
    Divider,
    Fab,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    StyledEngineProvider,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography,
    Zoom,
    createTheme,
    responsiveFontSizes,
    useMediaQuery,
    useScrollTrigger,
};

export type {
    Breakpoint,
    ButtonOwnProps,
    ButtonBaseOwnProps,
    Palette,
    SxProps,
    Theme,
    Variant,
};
