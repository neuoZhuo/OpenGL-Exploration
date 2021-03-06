import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React from "react";

import { IDocument } from "../docs";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    item: {
      paddingTop: 4,
      paddingBottom: 4,
    },
    nested: {
      paddingTop: 4,
      paddingBottom: 4,
    },
    nestedText: {
      padding: 0,
    },
    nestedIcon: {
      marginRight: 8,
    },
  });

class Item extends React.Component<
  WithStyles<typeof styles> & {
    doc: IDocument;
    selectSeq: (seqNo: number) => void;
  },
  {
    open: boolean;
  }
> {
  public state = {
    open: false,
  };

  public handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  public render() {
    const { classes, doc, selectSeq } = this.props;

    return (
      <div>
        <ListItem button onClick={this.handleClick} className={classes.item}>
          <ListItemText
            primary={doc.name}
            primaryTypographyProps={{
              noWrap: true,
              variant: "body2",
            }}
          />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {doc.sequences.map((ele, index) => {
              return (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    selectSeq(index);
                  }}
                  key={index}
                >
                  <ListItemText
                    className={classes.nestedText}
                    secondary={ele.name}
                    secondaryTypographyProps={{
                      noWrap: true,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Item);
