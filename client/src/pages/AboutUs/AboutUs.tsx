import Box from "@mui/material/Box";
import './AboutUs.css'
import {Grid, Typography} from "@mui/material";
import {CustomSwiper} from "../../components/CustomSwiper/CustomSwiper";
import {productStyles} from "../../themes";
import {IconContext} from "react-icons";
import {BsTelephone} from "react-icons/bs";
import {AdvantagesSection} from "../../components/AdvantagesSection/AdvantagesSection";
import {CommentsSection} from "../../components/CommentsSection/CommentsSection";

const callUs = {
    display: "flex",
    flexDirection: {
        xs: 'column',
        sm: 'column',
        lg: 'row',
    },
    justifyContent: "center",
    padding: "20px 0",
    backgroundColor: "#e3f1e5"
}

export const AboutUs = () => {

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

        </>

    );
};