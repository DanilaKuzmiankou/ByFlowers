import React from 'react'
import Box from '@mui/material/Box'
import './BottomBar.css'
import { Typography } from '@mui/material'
import { productStyles } from '../../themes'

export const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <div className="bottom-trademarks">
        <div className="bottom-brand">FlowersMarket</div>
        <div className="bottom-rights">
          The site, as well as all information provided on the site, is solely
          informational nature, and under no circumstances is not a public
          offer.
        </div>
        <div className="bottom-rights">
          Registration is required to use the shopping cart. We never, under any
          circumstances, disclose the personal data of customers. Contact
          information will only be used to place orders.
        </div>
        <div className="bottom-rights">&copy;2021 All rights reserved</div>
      </div>
      <div className="right-panel">
        <div className="call-us">
          <Typography
            sx={{
              ...productStyles.customBoldFont,
              ...{
                whiteSpace: 'nowrap',
                textAlign: 'center',
                userSelect: 'text',
              },
            }}
          >
            +375 29 423 74 65
          </Typography>
        </div>
        <div className="bottom-icons">
          <a
            target="_blank"
            href="https://www.instagram.com/flower-bel/"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              sx={{
                height: 45,
                width: 45,
                marginRight: '7px',
              }}
              src={require('../../assets/images/instagramIcon.png')}
            />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/groups/12688897134534643062353"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              sx={{
                height: 45,
                width: 45,
              }}
              src={require('../../assets/images/facebookIcon.png')}
            />
          </a>
        </div>
      </div>
    </div>
  )
}
