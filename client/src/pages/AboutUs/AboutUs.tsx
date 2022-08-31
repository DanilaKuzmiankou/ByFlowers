import Box from "@mui/material/Box";
import './AboutUs.css'
import {Typography} from "@mui/material";
import {CustomSwiper} from "../../components/CustomSwiper/CustomSwiper";
import {buyButtonHoverStyle, productStyles} from "../../themes";
import {IconContext} from "react-icons";
import {BsTelephone} from "react-icons/bs";
import {AdvantagesSection} from "../../components/AdvantagesSection/AdvantagesSection";
import {CommentsSection} from "../../components/CommentsSection/CommentsSection";
import Button from "@mui/material/Button";

const buttonStyle = {
    width: '250px',
    marginTop: '35px'
}

const callUs = {
    display: "flex",
    flexDirection: {
        xs: 'column',
        sm: 'column',
        lg: 'row',
    },
    justifyContent: "center",
    padding: "20px 0",
    marginBottom: '50px',
    backgroundColor: "#e3f1e5"
}

const startShoppingContainer = {
    backgroundColor: '#f3f3ef',
    height: '820px',
    padding: '160px 90px',
}

const startShoppingPictureContainer = {
    backgroundImage: 'url(' + require("../../assets/images/startShoppingPicture.jpg") + ')',
    height: '100%',
    backgroundSize:'fill',
    backgroundRepeat:'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    padding: '90px 100px',
    fontFamily: "Avenir, serif",
    color: 'white',
}


export const AboutUs = () => {

    const startShopping = () => {

}

    return (
        <>
            <CustomSwiper/>
            <AdvantagesSection/>
            <Box sx={callUs}>
                <Typography
                    sx={{
                        ...productStyles.customBoldFont, ...{
                            mr: 2,
                            whiteSpace: 'word',
                            textAlign: 'center',
                            userSelect: 'text'
                        }
                    }}>
                    Want to speak to us about flower delivery in your area? Call us: +375 29 423 74 65
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <IconContext.Provider value={{color: 'black', size: '27'}}>
                        <BsTelephone/>
                    </IconContext.Provider>
                </Box>
            </Box>
            <CommentsSection />
            <Box sx={startShoppingContainer}>
                <Box sx={startShoppingPictureContainer}>
                    <Typography
                        sx={{ fontSize: "7rem" }}>
                        Ready to start your journey?
                    </Typography>
                    <Typography
                        sx={{ fontSize: "2.5rem", marginTop: '20px'}}>
                    Choose from a variety of options exactly what suits you
                    </Typography>
                    <Button
                        onClick={startShopping}
                        sx={{...buyButtonHoverStyle, ...buttonStyle}}
                    >
                        Start shopping!
                    </Button>
                </Box>
            </Box>
        </>

    );
};