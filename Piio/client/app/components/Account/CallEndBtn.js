import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/CallEnd';
import green from '@material-ui/core/colors/red';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';



const styles = theme => ({
     button: {
          margin: theme.spacing.unit,
     },
});

const theme = createMuiTheme({
     palette:{
          primary: green,
     },
});

function FloatingActionButtons(props) {
     const { classes } = props;
     return (
          <div className ="call-end-button">
               <Fade left>
               <Bounce>
                    <MuiThemeProvider theme={theme}>
                         <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
                              <AddIcon />
                         </Button>
                    </MuiThemeProvider>
               </Bounce>
               </Fade>
          </div>
     );
}

FloatingActionButtons.propTypes = {
     classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
