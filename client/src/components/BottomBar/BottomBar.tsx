import React from 'react'
import Box from '@mui/material/Box'
import './BottomBar.css'

export const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <div className="bottom-trademarks">
        <div className="bottom-brand">FlowersMarket</div>
        <div className="bottom-rights">
          The site, as well as all information provided on the site, is solely{' '}
          <br />
          informational nature, and under no circumstances is not a public
          offer.
        </div>
        <div className="bottom-rights">
          Registration is required to use the shopping cart. We never, under any
          circumstances, disclose the personal data of customers. <br /> Contact
          information will only be used to place orders.
        </div>
        <div className="bottom-rights">&copy;2021 All rights reserved</div>
      </div>
      <div className="bottom-icons">
        <Box
          component="img"
          sx={{
            height: 45,
            width: 45,
            marginRight: '7px',
          }}
          src={require('../../assets/images/instagramIcon.png')}
        />
        <Box
          component="img"
          sx={{
            height: 45,
            width: 45,
          }}
          src={require('../../assets/images/facebookIcon.png')}
        />
      </div>
    </div>
  )
}
