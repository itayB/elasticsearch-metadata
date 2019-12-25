import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';

export default props =>
    <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" style={{flexGrow: 1}}>
                Elasticsearch Metadata
            </Typography>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="https://github.com/itayB/elasticsearch-metadata"
                target="_blank"
            >
                <GitHubIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
