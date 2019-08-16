import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { DATE_FORMAT } from "utilities/date_and_time";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    //maxWidth: 345,
    margin: "0.5rem"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const ShowFullPromptText = ({ text }) => {
  return <Typography>{text}</Typography>;
};

const _PrettyPromptCard = ({ prompt, history }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const truncatedText = prompt.text.slice(0, 500);

  const created = moment(prompt.created);
  const createdSerialized = created.format(DATE_FORMAT);

  const promptURL = `/prompts/${prompt.uuid}`;

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const shareURLClick = () => {
    history.push(promptURL);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {prompt.score}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={prompt.title}
        subheader={createdSerialized}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {truncatedText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={shareURLClick}>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ShowFullPromptText text={prompt.text} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export const PrettyPromptCard = withRouter(_PrettyPromptCard);