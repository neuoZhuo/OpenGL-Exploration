import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

import info from "../../package.json";
import { GITHUB, ZHIHU } from "../common";
import github from "./github.png";
import zhihu from "./zhihu.png";

const titleStyle = (theme: Theme) =>
  createStyles({
    card: {
      boxShadow: "none",
    },
    actions: {
      display: "flex",
    },
    icon: {
      width: 18,
      height: 18,
    },
    button: {
      height: 18,
    },
  });

class Title extends React.Component<WithStyles<typeof titleStyle>> {
  public render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title="OpenGL Exploration"
          subheader={"@version " + info.version}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <Tooltip title="View project source on GitHub" placement="top">
            <IconButton href={GITHUB} target="_blank" aria-label="GitHub">
              <Avatar className={classes.icon} alt="GitHub" src={github} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View documents on 知乎" placement="top">
            <Button href={ZHIHU} target="_blank" aria-label="zhihu">
              <img className={classes.button} src={zhihu} />
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(titleStyle)(Title);
