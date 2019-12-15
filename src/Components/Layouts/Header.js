import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";


export default props =>
    <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6">
                Elasticsearch Metadata
            </Typography>
        </Toolbar>
    </AppBar>
