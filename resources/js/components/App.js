import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from "@material-ui/core";
import Expenses from "./Expenses";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../css/app.css';
const App = () => {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
    return (
        <div>
            <main>
                <ThemeProvider theme={theme}>
                    <Container maxWidth="lg">
                        <Expenses/>
                    </Container>
                </ThemeProvider>
            </main>
        </div>
);
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default App
