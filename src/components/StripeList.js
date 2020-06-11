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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
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
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { data: all_customers, error, isLoading } = useAsync({ promiseFn: loadCustomers })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`


  const skinColors = ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black']
  const topTypes = ["LongHairFrida", "LongHairFro", "WinterHat4", "Hijab", "WinterHat1", "LongHairDreads", "Hat"]
  const hairColors = ["BrownDark", "PastelPink", "BlondeGolden", "Red", "Black"]
  const accessoriesTypes = ["Blank", "Kurt", "Prescription1", "Sunglasses"]


  if (all_customers)


    return (

      <List dense className={classes.root}>
        {all_customers.data.map(charge => {
          // const labelId = `checkbox-list-secondary-label-${value}`;
          const randomSkinColor = skinColors[Math.floor(Math.random() * skinColors.length)]
          const randomTop = topTypes[Math.floor(Math.random() * topTypes.length)]
          const randomHairColor = hairColors[Math.floor(Math.random() * hairColors.length)]
          const randomAccessory = accessoriesTypes[Math.floor(Math.random() * accessoriesTypes.length)]

          if (charge.paid)
            return (
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    // alt={`Avatar n°${value + 1}`}

                    src={`https://avataaars.io/?accessoriesType=${randomAccessory}&avatarStyle=Transparent&clotheType=Hoodie&eyeType=Dizzy&eyebrowType=SadConcerned&facialHairType=BeardLight&hairColor=${randomHairColor}&mouthType=Default&skinColor=${randomSkinColor}&topType=${randomTop}`}
                  />
                </ListItemAvatar>
                <span style={spanStyle}><ListItemText primary={`🤑 +$${charge.amount / 100}`} secondary={charge.receipt_email} /></span>
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                  // onChange={handleToggle(value)}
                  // checked={checked.indexOf(value) !== -1}
                  // inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
        })}
      </List>
    );
}