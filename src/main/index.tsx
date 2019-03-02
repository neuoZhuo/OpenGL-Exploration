import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Link from "@material-ui/icons/Link";
import MenuIcon from "@material-ui/icons/Menu";
import Send from "@material-ui/icons/Send";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { GITHUB_PREFIX, SOURCE_PREFIX, ZHIHU_PREFIX } from "../common";
import { docs, DocumentSelector } from "../docs";
import { joinPath, parsePathAndSetTitle, setTitle, toPath } from "../utils";

import Item from "./item";
import Title from "./title";

const drawerWidth = 320;

const mainStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh",
    },
    menuButton: {
      marginRight: 12,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      height: "100%",
      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        paddingTop: 56,
      },
    },
    frame: {
      width: "100%",
      height: "100%",
      border: 0,
    },
    title: {
      flexGrow: 0,
    },
    list: {
      flexGrow: 1,
      overflow: "auto",
    },
    buttons: {
      position: "fixed",
      right: 20,
      bottom: 20,
      display: "flex",
    },
    button: {
      margin: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });

class Main extends React.Component<
  WithStyles<typeof mainStyles> & RouteComponentProps,
  {
    selector: DocumentSelector;
    mobileOpen: boolean;
  }
> {
  public state = {
    selector: parsePathAndSetTitle(this.props.location.pathname),
    mobileOpen: false,
  };

  public handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  public selectDoc = (docNo: number, seqNo: number) => {
    const selector = {
      docNo,
      seqNo,
    };
    this.setState(state => ({
      selector,
    }));
    this.props.history.replace(toPath(selector));
    setTitle(selector);
  };

  public render() {
    const { classes } = this.props;
    const { selector } = this.state;

    let url = "";
    if (selector.docNo >= 0) {
      const { docNo, seqNo } = selector;
      url = joinPath(SOURCE_PREFIX, docs[docNo].sequences[seqNo].url);
    }
    const title = (
      <div className={classes.title}>
        <Title />
      </div>
    );
    const list = (
      <List component="nav" className={classes.list}>
        {docs.map((doc, index) => {
          return (
            <Item
              doc={doc}
              selectSeq={(seqNo: number) => this.selectDoc(index, seqNo)}
              key={index}
            />
          );
        })}
      </List>
    );
    return (
      <div className={classes.root}>
        <Hidden smUp implementation="css">
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                建议 PC 端浏览
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {title}
            <Divider />
            {list}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
            open
          >
            {title}
            <Divider />
            {list}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {url ? <iframe className={classes.frame} src={url} /> : null}
        </main>
        {url ? (
          <div className={classes.buttons}>
            <Button
              href={joinPath(GITHUB_PREFIX, url)}
              target="_blank"
              variant="contained"
              color="primary"
              rel="nofollow"
              className={classes.button}
            >
              source
              <Link className={classes.rightIcon} />
            </Button>
            <Button
              href={joinPath(ZHIHU_PREFIX, docs[selector.docNo].url)}
              target="_blank"
              variant="contained"
              rel="nofollow"
              className={classes.button}
            >
              document
              <Send className={classes.rightIcon} />
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(withStyles(mainStyles)(Main));
