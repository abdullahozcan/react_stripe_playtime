import React from 'react';
import { useAsync } from 'react-async';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

var moment = require('moment'); // require



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '28ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const spanStyle = {
  color: 'green',
};


let params = { limit: 20 }
const stripe_auth = { "Authorization": `Bearer ${process.env.REACT_APP_STRIPE_API_KEY}` }
const stripe_url = `https://api.stripe.com/v1/charges?limit=${params.limit}`;


// https://css-tricks.com/fetching-data-in-react-using-react-async/
// https://www.freecodecamp.org/forum/t/fetch-api-with-api-key/317584
const loadCustomers = async () =>
  await fetch(stripe_url, {
    method: "GET",
    headers: stripe_auth
  }).then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());


export default function StripeList() {
  const classes = useStyles();

  const { data: all_customers, error, isLoading } = useAsync({ promiseFn: loadCustomers })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`

  if (all_customers)
    return (

      <List dense className={classes.root}>
        {all_customers.data.map(charge => {
          if (charge.paid)
            return (
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    src={`https://avatars.dicebear.com/api/avataaars/${Math.random()}.svg`}
                  />
                </ListItemAvatar>
                <span style={spanStyle}><ListItemText primary={`🤑
                +$${charge.amount / 100}`}
                  secondary={[`${charge.receipt_email}`, <strong> {String(moment.unix(charge.created).fromNow())}</strong>]}
                /></span>
                <ListItemSecondaryAction>
                  <Checkbox edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
            );
        })}
      </List>
    );
}
