import { useMutation } from "@apollo/client";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form } from "../../molecules/Form";
import { Navbar } from "../../organisms/PublicNavbar";

import { LoginFields } from "../../../types/form-types";
import { LOGIN_MUTATION } from "../../../graphql/mutations/auth";
import { setAccessToken } from "../../../services/auth";

export const Login = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [login] = useMutation(LOGIN_MUTATION, {
        onError: (error) => setErrorMessage(error.message),
    });

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: (values: LoginFields) => {
            const errors: Partial<LoginFields> = {};
            if (!values.email) {
                errors.email = "";
            } else if (!values.password) {
                errors.password = "";
            }

            return errors;
        },
        onSubmit: (values: LoginFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(
        user: LoginFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await login({
            variables: {
                email: user.email,
                password: user.password,
            },
        });

        if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
            history.push("/magic-systems");
        } else {
            setSubmitting(false);
        }
    }

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
                <Navbar color="primary" userLoggedIn={false} />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
                <Card elevation={1}>
                    <CardContent>
                        <Typography variant="h4" component="h1">
                            Login
                        </Typography>
                        <Typography variant="h6" component="h3" color="error">
                            {errorMessage}
                        </Typography>
                        <Form handleSubmit={loginForm.handleSubmit}>
                            <Box marginTop="8px" marginBottom="8px">
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="text"
                                    value={loginForm.values.email}
                                    onChange={loginForm.handleChange}
                                    error={
                                        loginForm.touched.email &&
                                        Boolean(loginForm.errors.email)
                                    }
                                    helperText={
                                        loginForm.touched.email &&
                                        loginForm.errors.email
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    disabled={loginForm.isSubmitting}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />

                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={loginForm.values.password}
                                    onChange={loginForm.handleChange}
                                    error={
                                        loginForm.touched.password &&
                                        Boolean(loginForm.errors.password)
                                    }
                                    helperText={
                                        loginForm.touched.password &&
                                        loginForm.errors.password
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    disabled={loginForm.isSubmitting}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                fullWidth
                                disableElevation
                                disabled={loginForm.isSubmitting}
                            >
                                Login
                            </Button>
                        </Form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
